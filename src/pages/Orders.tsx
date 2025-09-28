import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MoreHorizontal,
  Truck,
  Package,
  CheckCircle,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice } from "@/utils/formatPrice";

// Sample orders data
const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    total: 24899,
    status: "delivered",
    date: "2024-01-15",
    items: 3,
    payment: "Credit Card"
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    total: 12449,
    status: "processing",
    date: "2024-01-14",
    items: 1,
    payment: "PayPal"
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    total: 7469,
    status: "shipped",
    date: "2024-01-13",
    items: 2,
    payment: "Credit Card"
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    total: 16599,
    status: "pending",
    date: "2024-01-12",
    items: 1,
    payment: "Bank Transfer"
  },
  {
    id: "ORD-005",
    customer: "Tom Brown",
    email: "tom@example.com",
    total: 29049,
    status: "delivered",
    date: "2024-01-11",
    items: 4,
    payment: "Credit Card"
  }
];

const statusConfig = {
  pending: { label: "Pending", color: "secondary", icon: Clock },
  processing: { label: "Processing", color: "default", icon: Package },
  shipped: { label: "Shipped", color: "default", icon: Truck },
  delivered: { label: "Delivered", color: "default", icon: CheckCircle }
};

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const orderStats = [
    {
      title: "Total Orders",
      value: orders.length.toString(),
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Pending",
      value: orders.filter(o => o.status === "pending").length.toString(),
      icon: Clock,
      color: "text-yellow-600"
    },
    {
      title: "Processing",
      value: orders.filter(o => o.status === "processing").length.toString(),
      icon: Package,
      color: "text-purple-600"
    },
    {
      title: "Delivered",
      value: orders.filter(o => o.status === "delivered").length.toString(),
      icon: CheckCircle,
      color: "text-green-600"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your customer orders
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {orderStats.map((stat) => (
          <Card key={stat.title} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`h-12 w-12 rounded-full bg-muted flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative min-w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders, customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
                return (
                  <TableRow key={order.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold">{formatPrice(order.total)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={statusConfig[order.status as keyof typeof statusConfig].color as any}
                        className="flex items-center gap-1 w-fit"
                      >
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig[order.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>{order.items} items</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuItem>Send Invoice</DropdownMenuItem>
                            <DropdownMenuItem>Print Order</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl font-bold text-muted-foreground/20 mb-4">
                📋
              </div>
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;