import { createClient } from "@/lib/supabase/client"

export interface AdminUser {
  id: string
  email: string
  full_name: string
  role: string
  last_login: string
  is_active: boolean
}

export interface AuditLog {
  id: string
  admin_id: string
  action: string
  table_name: string
  record_id: string
  old_values: any
  new_values: any
  created_at: string
  admin_name: string
}

export class AdminService {
  private supabase = createClient()

  async getCurrentUser(): Promise<AdminUser | null> {
    try {
      const { data: { user }, error } = await this.supabase.auth.getUser()
      
      if (error || !user) return null

      const { data: profile } = await this.supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (!profile) return null

      return {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        role: "admin", // You can enhance this with proper role management
        last_login: user.last_sign_in_at || "",
        is_active: true,
      }
    } catch (error) {
      console.error("Error fetching current user:", error)
      return null
    }
  }

  async getAuditLogs(limit = 50): Promise<AuditLog[]> {
    try {
      const { data, error } = await this.supabase
        .from("admin_audit_logs")
        .select(`
          *,
          profiles!admin_id (
            full_name
          )
        `)
        .order("created_at", { ascending: false })
        .limit(limit)

      if (error) throw error

      return data.map((log) => ({
        id: log.id,
        admin_id: log.admin_id,
        action: log.action,
        table_name: log.table_name,
        record_id: log.record_id,
        old_values: log.old_values,
        new_values: log.new_values,
        created_at: log.created_at,
        admin_name: log.profiles?.full_name || "Unknown",
      }))
    } catch (error) {
      console.error("Error fetching audit logs:", error)
      return []
    }
  }

  async getSystemSettings(): Promise<Record<string, any>> {
    try {
      const { data, error } = await this.supabase
        .from("system_settings")
        .select("setting_key, setting_value, setting_type")

      if (error) throw error

      const settings: Record<string, any> = {}
      data.forEach((setting) => {
        let value = setting.setting_value
        
        // Parse JSON values based on type
        if (setting.setting_type === "boolean") {
          value = value === "true" || value === true
        } else if (setting.setting_type === "number") {
          value = Number(value)
        } else if (setting.setting_type === "json" || setting.setting_type === "array") {
          value = typeof value === "string" ? JSON.parse(value) : value
        }
        
        settings[setting.setting_key] = value
      })

      return settings
    } catch (error) {
      console.error("Error fetching system settings:", error)
      return {}
    }
  }

  async updateSystemSetting(key: string, value: any): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from("system_settings")
        .update({
          setting_value: typeof value === "object" ? JSON.stringify(value) : value,
          updated_by: (await this.getCurrentUser())?.id,
          updated_at: new Date().toISOString(),
        })
        .eq("setting_key", key)

      if (error) throw error
      return true
    } catch (error) {
      console.error("Error updating system setting:", error)
      return false
    }
  }

  async getDashboardStats(): Promise<{
    totalIncidents: number
    activeIncidents: number
    totalUsers: number
    totalFeedback: number
    recentActivity: Array<{
      id: string
      title: string
      type: string
      timestamp: string
    }>
  }> {
    try {
      const [incidents, users, feedback, activity] = await Promise.all([
        this.supabase.from("incident_reports").select("id, status", { count: "exact" }),
        this.supabase.from("profiles").select("id", { count: "exact" }),
        this.supabase.from("contact_messages").select("id", { count: "exact" }),
        this.supabase
          .from("admin_audit_logs")
          .select("id, action, table_name, created_at")
          .order("created_at", { ascending: false })
          .limit(10),
      ])

      const activeIncidents = incidents.data?.filter((i) => i.status === "pending" || i.status === "in_progress").length || 0

      const recentActivity = activity.data?.map((log) => ({
        id: log.id,
        title: `${log.action} ${log.table_name.replace("_", " ")}`,
        type: log.action.toLowerCase(),
        timestamp: log.created_at,
      })) || []

      return {
        totalIncidents: incidents.count || 0,
        activeIncidents,
        totalUsers: users.count || 0,
        totalFeedback: feedback.count || 0,
        recentActivity,
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
      return {
        totalIncidents: 0,
        activeIncidents: 0,
        totalUsers: 0,
        totalFeedback: 0,
        recentActivity: [],
      }
    }
  }

  async exportData(table: string, format: "csv" | "json" = "csv"): Promise<string | null> {
    try {
      const { data, error } = await this.supabase.from(table).select("*")

      if (error) throw error

      if (format === "json") {
        return JSON.stringify(data, null, 2)
      }

      // Convert to CSV
      if (!data || data.length === 0) return ""

      const headers = Object.keys(data[0])
      const csvContent = [
        headers.join(","),
        ...data.map((row) =>
          headers.map((header) => {
            const value = row[header]
            return typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value
          }).join(",")
        ),
      ].join("\n")

      return csvContent
    } catch (error) {
      console.error("Error exporting data:", error)
      return null
    }
  }

  async validateAdminAccess(userId: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from("profiles")
        .select("email")
        .eq("id", userId)
        .single()

      if (error || !data) return false

      // Check if user has admin email domain
      return data.email.endsWith("@mdrrmo.gov.ph") || data.email.endsWith("@admin.local")
    } catch (error) {
      console.error("Error validating admin access:", error)
      return false
    }
  }

  async logAdminAction(
    action: string,
    tableName: string,
    recordId?: string,
    oldValues?: any,
    newValues?: any
  ): Promise<void> {
    try {
      const user = await this.getCurrentUser()
      if (!user) return

      await this.supabase.from("admin_audit_logs").insert({
        admin_id: user.id,
        action,
        table_name: tableName,
        record_id: recordId,
        old_values: oldValues,
        new_values: newValues,
      })
    } catch (error) {
      console.error("Error logging admin action:", error)
    }
  }
}

export const adminService = new AdminService()
