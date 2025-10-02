"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartBar as BarChart3, ChartPie as PieChart, TrendingUp, MessageSquare, ThumbsUp, ThumbsDown, Calendar } from "lucide-react"

export default function FeedbackAnalyticsManagement() {
  const [timeRange, setTimeRange] = useState("30")
  const [chartType, setChartType] = useState("bar")

  // Mock analytics data
  const analyticsData = {
    totalFeedback: 156,
    positivePercentage: 68,
    negativePercentage: 22,
    neutralPercentage: 10,
    responseRate: 85,
    averageResponseTime: "2.3 hours",
    topCategories: [
      { name: "Emergency Response", count: 45, percentage: 29 },
      { name: "Infrastructure", count: 32, percentage: 21 },
      { name: "Communication", count: 28, percentage: 18 },
      { name: "Training", count: 25, percentage: 16 },
      { name: "Other", count: 26, percentage: 16 }
    ],
    monthlyTrends: [
      { month: "Oct", positive: 25, negative: 8, neutral: 5 },
      { month: "Nov", positive: 32, negative: 12, neutral: 6 },
      { month: "Dec", positive: 28, negative: 15, neutral: 7 },
      { month: "Jan", positive: 35, negative: 10, neutral: 8 }
    ]
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Feedback Analytics</h1>
          <p className="text-gray-600">Analyze feedback trends and sentiment patterns</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 3 months</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Feedback</p>
                <p className="text-3xl font-bold text-blue-950">{analyticsData.totalFeedback}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Positive Sentiment</p>
                <p className="text-3xl font-bold text-green-600">{analyticsData.positivePercentage}%</p>
              </div>
              <ThumbsUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Response Rate</p>
                <p className="text-3xl font-bold text-blue-950">{analyticsData.responseRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-3xl font-bold text-blue-950">{analyticsData.averageResponseTime}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sentiment Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Sentiment Distribution
            </CardTitle>
            <CardDescription>Breakdown of feedback sentiment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                  <span>Positive</span>
                </div>
                <span className="font-medium">{analyticsData.positivePercentage}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                  <span>Negative</span>
                </div>
                <span className="font-medium">{analyticsData.negativePercentage}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-500 rounded mr-2"></div>
                  <span>Neutral</span>
                </div>
                <span className="font-medium">{analyticsData.neutralPercentage}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top Categories
            </CardTitle>
            <CardDescription>Most common feedback categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{category.name}</span>
                    <span>{category.count} ({category.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-950 h-2 rounded-full" 
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Monthly Trends
          </CardTitle>
          <CardDescription>Feedback volume and sentiment over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Interactive chart will be displayed here</p>
              <p className="text-sm text-gray-500">Showing trends for the last 4 months</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
