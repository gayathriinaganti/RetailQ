import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MoreHorizontal,
  UserPlus,
  Mail,
  Phone,
  MapPin
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

// Sample customers data
const customers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    totalOrders: 12,
    totalSpent: 236537,
    status: "active",
    joinDate: "2023-08-15",
    lastOrder: "2024-01-15"
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+91 87654 32109",
    location: "Delhi, Delhi",
    totalOrders: 8,
    totalSpent: 107899,
    status: "active",
    joinDate: "2023-09-22",
    lastOrder: "2024-01-14"
  },
  {
    id: "CUST-003",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+91 76543 21098",
    location: "Bangalore, Karnataka",
    totalOrders: 15,
    totalSpent: 269751,
    status: "vip",
    joinDate: "2023-06-10",
    lastOrder: "2024-01-13"
  },
  {
    id: "CUST-004",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+91 65432 10987",
    location: "Chennai, Tamil Nadu",
    totalOrders: 3,
    totalSpent: 45649,
    status: "inactive",
    joinDate: "2023-12-01",
    lastOrder: "2023-12-15"
  },
  {
    id: "CUST-005",
    name: "Tom Brown",
    email: "tom@example.com",
    phone: "+91 54321 09876",
    location: "Pune, Maharashtra",
    totalOrders: 24,
    totalSpent: 439917,
    status: "vip",
    joinDate: "2023-03-08",
    lastOrder: "2024-01-11"
  }
];

const statusConfig = {
  active: { label: "Active", variant: "default" as const },
  inactive: { label: "Inactive", variant: "secondary" as const },
  vip: { label: "VIP", variant: "default" as const }
};

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const customerStats = [
    {
      title: "Total Customers",
      value: customers.length.toString(),
      description: "All registered customers"
    },
    {
      title: "Active Customers",
      value: customers.filter(c => c.status === "active").length.toString(),
      description: "Customers with recent activity"
    },
    {
      title: "VIP Customers",
      value: customers.filter(c => c.status === "vip").length.toString(),
      description: "High-value customers"
    },
    {
      title: "Avg. Order Value",
      value: "₹" + Math.round(customers.reduce((acc, c) => acc + c.totalSpent, 0) / customers.reduce((acc, c) => acc + c.totalOrders, 0)).toLocaleString('en-IN'),
      description: "Average across all orders"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer relationships and data
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {customerStats.map((stat, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
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
            placeholder="Search customers..."
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
            <SelectItem value="all">All Customers</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3" />
                      {customer.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{customer.totalOrders}</p>
                      <p className="text-sm text-muted-foreground">
                        Last: {new Date(customer.lastOrder).toLocaleDateString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">
                    {formatPrice(customer.totalSpent)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[customer.status as keyof typeof statusConfig].variant}>
                      {statusConfig[customer.status as keyof typeof statusConfig].label}
                    </Badge>
                  </TableCell>
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
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Order History</DropdownMenuItem>
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
                          <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl font-bold text-muted-foreground/20 mb-4">
                👥
              </div>
              <h3 className="text-lg font-semibold mb-2">No customers found</h3>
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

export default Customers;