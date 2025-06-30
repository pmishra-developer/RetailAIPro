
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Package, TrendingUp, ShoppingCart, Bot, Sparkles, AlertTriangle, Target, Store } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ProductManager from "@/components/ProductManager";
import AIAssistant from "@/components/AIAssistant";
import SalesAnalytics from "@/components/SalesAnalytics";
import StoreManager from "@/components/StoreManager";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedStore, setSelectedStore] = useState("all");

  // Sample store data for dashboard filtering
  const stores = [
    { id: 'all', name: 'All Stores' },
    { id: '1', name: 'Oxford Street Flagship', revenue: 52000, customers: 1240 },
    { id: '2', name: 'Birmingham Central', revenue: 33600, customers: 890 },
    { id: '3', name: 'Manchester Mall', revenue: 22400, customers: 650 },
    { id: '4', name: 'Edinburgh Royal Mile', revenue: 28000, customers: 420 }
  ];

  // Sample data for dashboard (converted to GBP)
  const inventoryData = [
    { name: 'Electronics', value: 45, stock: 120 },
    { name: 'Clothing', value: 30, stock: 89 },
    { name: 'Home & Garden', value: 25, stock: 76 },
    { name: 'Sports', value: 15, stock: 42 },
    { name: 'Books', value: 10, stock: 28 }
  ];

  const salesTrend = [
    { month: 'Jan', sales: 3200, profit: 1920 },
    { month: 'Feb', sales: 2400, profit: 1118 },
    { month: 'Mar', sales: 1600, profit: 7840 },
    { month: 'Apr', sales: 2224, profit: 3126 },
    { month: 'May', sales: 1512, profit: 3840 },
    { month: 'Jun', sales: 1912, profit: 3040 }
  ];

  // Filter data based on selected store
  const getFilteredData = () => {
    if (selectedStore === 'all') {
      const totalRevenue = stores.slice(1).reduce((sum, store) => sum + store.revenue, 0);
      const totalCustomers = stores.slice(1).reduce((sum, store) => sum + store.customers, 0);
      return { revenue: totalRevenue, customers: totalCustomers };
    } else {
      const store = stores.find(s => s.id === selectedStore);
      return store ? { revenue: store.revenue, customers: store.customers } : { revenue: 0, customers: 0 };
    }
  };

  const { revenue: storeRevenue, customers: storeCustomers } = getFilteredData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  RetailAI Pro
                </h1>
                <p className="text-sm text-gray-600">Intelligent Retail Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Bot className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="stores" className="flex items-center space-x-2">
              <Store className="h-4 w-4" />
              <span>Stores</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Inventory</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>AI Assistant</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Store Filter */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Dashboard Overview</CardTitle>
                  <Select value={selectedStore} onValueChange={setSelectedStore}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {stores.map((store) => (
                        <SelectItem key={store.id} value={store.id}>{store.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
            </Card>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">£{storeRevenue.toLocaleString()}</div>
                  <p className="text-xs text-blue-100">+20.1% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Products Sold</CardTitle>
                  <ShoppingCart className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,350</div>
                  <p className="text-xs text-purple-100">+180 from last week</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Store Customers</CardTitle>
                  <Package className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{storeCustomers.toLocaleString()}</div>
                  <p className="text-xs text-green-100">Monthly visitors</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
                  <Bot className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-orange-100">New recommendations</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Sales Trend</CardTitle>
                  <CardDescription>Monthly sales and profit overview (GBP)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`£${value}`, '']} />
                      <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="profit" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Inventory by Category</CardTitle>
                  <CardDescription>Current stock levels by product category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={inventoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="stock" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* AI Recommendations */}
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-indigo-600" />
                  <span>AI-Powered Recommendations</span>
                </CardTitle>
                <CardDescription>Smart insights to optimize your retail operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Low Stock Alert</p>
                    <p className="text-sm text-gray-600">15 products are running low. Consider restocking Electronics and Clothing categories.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
                  <Target className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Sales Opportunity</p>
                    <p className="text-sm text-gray-600">Bundle wireless headphones with smartphones for 23% higher conversion rate.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Trending Products</p>
                    <p className="text-sm text-gray-600">Smart home devices showing 45% increase in searches. Consider expanding inventory.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Store Management Tab */}
          <TabsContent value="stores">
            <StoreManager />
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <ProductManager />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <SalesAnalytics />
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai-assistant">
            <AIAssistant />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
