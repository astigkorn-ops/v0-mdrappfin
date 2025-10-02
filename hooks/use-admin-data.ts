"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface UseAdminDataOptions {
  table: string
  select?: string
  orderBy?: { column: string; ascending?: boolean }
  filters?: Record<string, any>
  realtime?: boolean
}

interface UseAdminDataReturn<T> {
  data: T[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  create: (item: Partial<T>) => Promise<T | null>
  update: (id: string | number, updates: Partial<T>) => Promise<T | null>
  delete: (id: string | number) => Promise<boolean>
  bulkUpdate: (ids: (string | number)[], updates: Partial<T>) => Promise<boolean>
  bulkDelete: (ids: (string | number)[]) => Promise<boolean>
}

export function useAdminData<T extends Record<string, any>>(
  options: UseAdminDataOptions
): UseAdminDataReturn<T> {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const supabase = createClient()

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase.from(options.table).select(options.select || "*")

      // Apply filters
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            query = query.eq(key, value)
          }
        })
      }

      // Apply ordering
      if (options.orderBy) {
        query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending ?? false })
      }

      const { data: result, error: fetchError } = await query

      if (fetchError) throw fetchError

      setData(result || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch data"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const create = async (item: Partial<T>): Promise<T | null> => {
    try {
      const { data: result, error } = await supabase
        .from(options.table)
        .insert([item])
        .select()
        .single()

      if (error) throw error

      setData((prev) => [result, ...prev])
      toast({
        title: "Success",
        description: "Item created successfully",
      })
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create item"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      return null
    }
  }

  const update = async (id: string | number, updates: Partial<T>): Promise<T | null> => {
    try {
      const { data: result, error } = await supabase
        .from(options.table)
        .update(updates)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      setData((prev) => prev.map((item) => (item.id === id ? result : item)))
      toast({
        title: "Success",
        description: "Item updated successfully",
      })
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update item"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      return null
    }
  }

  const deleteItem = async (id: string | number): Promise<boolean> => {
    try {
      const { error } = await supabase.from(options.table).delete().eq("id", id)

      if (error) throw error

      setData((prev) => prev.filter((item) => item.id !== id))
      toast({
        title: "Success",
        description: "Item deleted successfully",
      })
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete item"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      return false
    }
  }

  const bulkUpdate = async (ids: (string | number)[], updates: Partial<T>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from(options.table)
        .update(updates)
        .in("id", ids)

      if (error) throw error

      await fetchData() // Refetch to get updated data
      toast({
        title: "Success",
        description: `${ids.length} items updated successfully`,
      })
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update items"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      return false
    }
  }

  const bulkDelete = async (ids: (string | number)[]): Promise<boolean> => {
    try {
      const { error } = await supabase.from(options.table).delete().in("id", ids)

      if (error) throw error

      setData((prev) => prev.filter((item) => !ids.includes(item.id)))
      toast({
        title: "Success",
        description: `${ids.length} items deleted successfully`,
      })
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete items"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      return false
    }
  }

  useEffect(() => {
    fetchData()

    // Set up real-time subscription if enabled
    if (options.realtime) {
      const subscription = supabase
        .channel(`${options.table}_changes`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: options.table,
          },
          () => {
            fetchData()
          }
        )
        .subscribe()

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [options.table, options.filters])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    create,
    update,
    delete: deleteItem,
    bulkUpdate,
    bulkDelete,
  }
}
