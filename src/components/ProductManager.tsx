import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  Sparkles,
  Search,
  Filter,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  aiGenerated?: boolean;
}

const ProductManager = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: 299.99,
      stock: 45,
      description:
        "High-quality wireless headphones with noise cancellation and premium sound quality.",
      status: "In Stock",
    },
    {
      id: "2",
      name: "Smart Fitness Tracker",
      category: "Electronics",
      price: 199.99,
      stock: 8,
      description:
        "Advanced fitness tracker with heart rate monitoring and GPS capabilities.",
      status: "Low Stock",
    },
    {
      id: "3",
      name: "Organic Cotton T-Shirt",
      category: "Clothing",
      price: 39.99,
      stock: 0,
      description:
        "Comfortable organic cotton t-shirt in various colors and sizes.",
      status: "Out of Stock",
    },
    {
      id: "4",
      name: "Smart Home Security Camera",
      category: "Electronics",
      price: 149.99,
      stock: 23,
      description:
        "WiFi-enabled security camera with night vision and mobile app integration.",
      status: "In Stock",
    },
  ]);

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
  });

  const generateAIDescription = async () => {
    if (!newProduct.name || !newProduct.category) {
      toast({
        title: "Missing Information",
        description: "Please enter product name and category first.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingDescription(true);

    // Simulate AI API call
    setTimeout(() => {
      const aiDescriptions = {
        Electronics: `Advanced ${newProduct.name.toLowerCase()} featuring cutting-edge technology, premium build quality, and innovative design. Perfect for tech enthusiasts seeking reliable performance and modern functionality.`,
        Clothing: `Stylish ${newProduct.name.toLowerCase()} crafted from high-quality materials with attention to comfort and durability. Available in multiple sizes and colors to suit various preferences.`,
        "Home & Garden": `Premium ${newProduct.name.toLowerCase()} designed to enhance your living space with functionality and aesthetic appeal. Built to last with weather-resistant materials.`,
        Sports: `Professional-grade ${newProduct.name.toLowerCase()} engineered for performance and comfort. Ideal for athletes and fitness enthusiasts of all levels.`,
        Books: `Engaging ${newProduct.name.toLowerCase()} offering valuable insights and knowledge. A must-read for anyone interested in expanding their understanding of the subject.`,
      };

      const description =
        aiDescriptions[newProduct.category as keyof typeof aiDescriptions] ||
        `High-quality ${newProduct.name.toLowerCase()} designed with attention to detail and customer satisfaction in mind.`;

      setNewProduct((prev) => ({
        ...prev,
        description,
      }));

      setIsGeneratingDescription(false);
      toast({
        title: "AI Description Generated",
        description:
          "Product description has been automatically generated using AI.",
      });
    }, 2000);
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
      toast({
        title: "Invalid Product Data",
        description: "Please fill in all required fields with valid data.",
        variant: "destructive",
      });
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      ...newProduct,
      status:
        newProduct.stock > 10
          ? "In Stock"
          : newProduct.stock > 0
          ? "Low Stock"
          : "Out of Stock",
      aiGenerated:
        newProduct.description.includes("Advanced") ||
        newProduct.description.includes("Premium"),
    };

    setProducts((prev) => [...prev, product]);
    setNewProduct({
      name: "",
      category: "",
      price: 0,
      stock: 0,
      description: "",
    });
    setIsAddingProduct(false);

    toast({
      title: "Product Added",
      description: `${product.name} has been added to inventory.`,
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast({
      title: "Product Deleted",
      description: "Product has been removed from inventory.",
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    const colors = {
      "In Stock": "bg-green-100 text-green-800",
      "Low Stock": "bg-yellow-100 text-yellow-800",
      "Out of Stock": "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Product Inventory</span>
              </CardTitle>
              <CardDescription>
                Manage your product catalog with AI-powered features
              </CardDescription>
            </div>
            <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Enter product details below. Use AI to generate compelling
                    descriptions.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Enter product name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newProduct.category}
                        onValueChange={(value) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            category: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Electronics">
                            Electronics
                          </SelectItem>
                          <SelectItem value="Clothing">Clothing</SelectItem>
                          <SelectItem value="Home & Garden">
                            Home & Garden
                          </SelectItem>
                          <SelectItem value="Sports">Sports</SelectItem>
                          <SelectItem value="Books">Books</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (£)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            price: parseFloat(e.target.value) || 0,
                          }))
                        }
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            stock: parseInt(e.target.value) || 0,
                          }))
                        }
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="description">Description</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={generateAIDescription}
                        disabled={isGeneratingDescription}
                        className="text-xs"
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        {isGeneratingDescription
                          ? "Generating..."
                          : "AI Generate"}
                      </Button>
                    </div>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Enter product description or use AI to generate one"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingProduct(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={addProduct}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Add Product
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
                <SelectItem value="Books">Books</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Table */}
          <div className="rounded-md border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <span>{product.name}</span>
                        {product.aiGenerated && (
                          <Badge variant="secondary" className="text-xs">
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>£{product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(product.status)}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManager;
