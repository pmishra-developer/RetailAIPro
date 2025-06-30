import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Store,
  MapPin,
  Users,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  PoundSterling,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StoreManager = () => {
  const { toast } = useToast();
  const [selectedStore, setSelectedStore] = useState("all");
  const [newStore, setNewStore] = useState({
    name: "",
    location: "",
    manager: "",
    type: "flagship",
  });

  // Sample store data
  const stores = [
    {
      id: "1",
      name: "Oxford Street Flagship",
      location: "London, UK",
      manager: "Sarah Johnson",
      type: "flagship",
      revenue: 65000,
      customers: 1240,
      performance: 95,
      status: "active",
    },
    {
      id: "2",
      name: "Birmingham Central",
      location: "Birmingham, UK",
      manager: "Michael Chen",
      type: "standard",
      revenue: 42000,
      customers: 890,
      performance: 88,
      status: "active",
    },
    {
      id: "3",
      name: "Manchester Mall",
      location: "Manchester, UK",
      manager: "Emma Wilson",
      type: "outlet",
      revenue: 28000,
      customers: 650,
      performance: 82,
      status: "active",
    },
    {
      id: "4",
      name: "Edinburgh Royal Mile",
      location: "Edinburgh, UK",
      manager: "James Morrison",
      type: "boutique",
      revenue: 35000,
      customers: 420,
      performance: 91,
      status: "active",
    },
  ];

  const handleAddStore = () => {
    if (!newStore.name || !newStore.location || !newStore.manager) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Store Added",
      description: `${newStore.name} has been added successfully`,
    });

    setNewStore({ name: "", location: "", manager: "", type: "flagship" });
  };

  const getStoreTypeColor = (type: string) => {
    switch (type) {
      case "flagship":
        return "bg-purple-100 text-purple-800";
      case "standard":
        return "bg-blue-100 text-blue-800";
      case "outlet":
        return "bg-green-100 text-green-800";
      case "boutique":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredStores =
    selectedStore === "all"
      ? stores
      : stores.filter((store) => store.id === selectedStore);
  const totalRevenue = filteredStores.reduce(
    (sum, store) => sum + store.revenue,
    0
  );
  const totalCustomers = filteredStores.reduce(
    (sum, store) => sum + store.customers,
    0
  );
  const avgPerformance =
    filteredStores.reduce((sum, store) => sum + store.performance, 0) /
    filteredStores.length;

  return (
    <div className="space-y-6">
      {/* Store Selection and Summary */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Store className="h-5 w-5" />
                <span>Store Management</span>
              </CardTitle>
              <CardDescription>
                Manage your retail locations and performance
              </CardDescription>
            </div>
            <Select value={selectedStore} onValueChange={setSelectedStore}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                {stores.map((store) => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Store KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <PoundSterling className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              £{totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-green-100">
              {selectedStore === "all"
                ? `Across ${stores.length} stores`
                : "Selected store"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCustomers.toLocaleString()}
            </div>
            <p className="text-xs text-blue-100">Monthly visitors</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Performance
            </CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {avgPerformance.toFixed(1)}%
            </div>
            <p className="text-xs text-purple-100">Performance score</p>
          </CardContent>
        </Card>
      </div>

      {/* Store Management Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="overview">Store Overview</TabsTrigger>
          <TabsTrigger value="add-store">Add New Store</TabsTrigger>
        </TabsList>

        {/* Store Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStores.map((store) => (
              <Card key={store.id} className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Store className="h-4 w-4" />
                        <span>{store.name}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="h-3 w-3 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {store.location}
                        </span>
                      </div>
                    </div>
                    <Badge className={getStoreTypeColor(store.type)}>
                      {store.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Manager:</span>
                    <span className="font-medium">{store.manager}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Monthly Revenue:
                    </span>
                    <span className="font-bold text-green-600">
                      £{store.revenue.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Monthly Customers:
                    </span>
                    <span className="font-medium">
                      {store.customers.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Performance Score:
                      </span>
                      <span className="font-medium">{store.performance}%</span>
                    </div>
                    <Progress value={store.performance} className="h-2" />
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Add New Store */}
        <TabsContent value="add-store">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add New Store</span>
              </CardTitle>
              <CardDescription>Create a new retail location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name *</Label>
                  <Input
                    id="store-name"
                    placeholder="Oxford Street Flagship"
                    value={newStore.name}
                    onChange={(e) =>
                      setNewStore({ ...newStore, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store-location">Location *</Label>
                  <Input
                    id="store-location"
                    placeholder="London, UK"
                    value={newStore.location}
                    onChange={(e) =>
                      setNewStore({ ...newStore, location: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store-manager">Store Manager *</Label>
                  <Input
                    id="store-manager"
                    placeholder="Sarah Johnson"
                    value={newStore.manager}
                    onChange={(e) =>
                      setNewStore({ ...newStore, manager: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store-type">Store Type</Label>
                  <Select
                    value={newStore.type}
                    onValueChange={(value) =>
                      setNewStore({ ...newStore, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flagship">Flagship</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="outlet">Outlet</SelectItem>
                      <SelectItem value="boutique">Boutique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleAddStore} className="w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Store
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoreManager;
