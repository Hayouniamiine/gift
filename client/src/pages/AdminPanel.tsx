import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  ShoppingCart, 
  DollarSign,
  Users,
  TrendingUp
} from "lucide-react";
import { GiftCardData } from "@/components/GiftCardGrid";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  customerName: string;
  email: string;
  productName: string;
  amount: number;
  quantity: number;
  total: number;
  status: "pending" | "completed" | "cancelled";
  date: string;
}

const AdminPanel = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<GiftCardData[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "John Doe",
      email: "john@example.com",
      productName: "Netflix",
      amount: 25,
      quantity: 1,
      total: 25,
      status: "completed",
      date: "2024-01-15"
    },
    {
      id: "ORD-002",
      customerName: "Jane Smith",
      email: "jane@example.com",
      productName: "Amazon",
      amount: 50,
      quantity: 2,
      total: 100,
      status: "pending",
      date: "2024-01-16"
    },
    {
      id: "ORD-003",
      customerName: "Mike Johnson",
      email: "mike@example.com",
      productName: "Steam",
      amount: 20,
      quantity: 1,
      total: 20,
      status: "completed",
      date: "2024-01-17"
    }
  ]);

  const [newProduct, setNewProduct] = useState<Partial<GiftCardData>>({
    name: "",
    minAmount: 0,
    maxAmount: 0,
    category: "",
    description: "",
    featured: false
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const product: GiftCardData = {
      id: newProduct.name?.toLowerCase().replace(/\s+/g, "-") || "",
      name: newProduct.name || "",
      image: "/placeholder.svg",
      minAmount: newProduct.minAmount || 0,
      maxAmount: newProduct.maxAmount || 0,
      category: newProduct.category || "",
      description: newProduct.description || "",
      featured: newProduct.featured || false
    };

    setProducts([...products, product]);
    setNewProduct({
      name: "",
      minAmount: 0,
      maxAmount: 0,
      category: "",
      description: "",
      featured: false
    });

    toast({
      title: "Success",
      description: "Product added successfully"
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Success",
      description: "Product deleted successfully"
    });
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
    toast({
      title: "Success",
      description: `Order status updated to ${status}`
    });
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
        <p className="text-muted-foreground">Manage your gift card store</p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{products.length + 18}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">
                  ${orders.reduce((sum, order) => sum + order.total, 0)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Customers</p>
                <p className="text-2xl font-bold">
                  {new Set(orders.map(order => order.email)).size}
                </p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Product Management</TabsTrigger>
          <TabsTrigger value="orders">Order Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          {/* Add New Product */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Product
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    placeholder="Enter category"
                  />
                </div>
                <div>
                  <Label htmlFor="minAmount">Min Amount ($)</Label>
                  <Input
                    id="minAmount"
                    type="number"
                    value={newProduct.minAmount}
                    onChange={(e) => setNewProduct({ ...newProduct, minAmount: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="maxAmount">Max Amount ($)</Label>
                  <Input
                    id="maxAmount"
                    type="number"
                    value={newProduct.maxAmount}
                    onChange={(e) => setNewProduct({ ...newProduct, maxAmount: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Enter product description"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newProduct.featured}
                  onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="featured">Featured Product</Label>
              </div>
              <Button onClick={handleAddProduct} className="w-full">
                Add Product
              </Button>
            </CardContent>
          </Card>

          {/* Product List */}
          <Card>
            <CardHeader>
              <CardTitle>Existing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{product.name}</h3>
                        {product.featured && <Badge>Featured</Badge>}
                        <Badge variant="secondary">{product.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                      <p className="text-sm text-muted-foreground">
                        ${product.minAmount} - ${product.maxAmount}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {products.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No custom products added yet. Add your first product above.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{order.id}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Customer: {order.customerName} ({order.email})
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Product: {order.productName} - ${order.amount} x {order.quantity}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Date: {order.date} | Total: ${order.total}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {order.status === "pending" && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUpdateOrderStatus(order.id, "completed")}
                          >
                            Complete
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleUpdateOrderStatus(order.id, "cancelled")}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;