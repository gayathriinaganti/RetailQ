import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Download
} from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";

const Analytics = () => {
  // Sample analytics data
  const metrics = [
    {
      title: "Revenue",
      value: "₹37,54,247",
      change: "+20.1%",
      trend: "up",
      period: "vs last month"
    },
    {
      title: "Orders",
      value: "2,350",
      change: "+180.1%",
      trend: "up",
      period: "vs last month"
    },
    {
      title: "Customers",
      value: "1,234",
      change: "+19%",
      trend: "up",
      period: "vs last month"
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "-0.5%",
      trend: "down",
      period: "vs last month"
    }
  ];

  const topProducts = [
    { name: "Wireless Headphones", sales: 145, revenue: "₹23,98,700" },
    { name: "Smart Watch", sales: 89, revenue: "₹22,16,100" },
    { name: "Gaming Keyboard", sales: 67, revenue: "₹8,34,083" },
    { name: "Coffee Beans", sales: 234, revenue: "₹4,85,316" },
    { name: "Desk Lamp", sales: 45, revenue: "₹3,36,105" }
  ];

  const salesData = [
    { period: "Jan", revenue: 26560, orders: 156 },
    { period: "Feb", revenue: 23240, orders: 142 },
    { period: "Mar", revenue: 29050, orders: 178 },
    { period: "Apr", revenue: 34860, orders: 198 },
    { period: "May", revenue: 31540, orders: 187 },
    { period: "Jun", revenue: 37350, orders: 223 }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your store's performance and key metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={metric.trend === "up" ? "default" : "destructive"}
                      className="flex items-center gap-1"
                    >
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {metric.change}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {metric.period}
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  {index === 0 && <DollarSign className="h-6 w-6 text-primary" />}
                  {index === 1 && <ShoppingCart className="h-6 w-6 text-primary" />}
                  {index === 2 && <Users className="h-6 w-6 text-primary" />}
                  {index === 3 && <Package className="h-6 w-6 text-primary" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <p className="text-sm text-muted-foreground">
              Monthly revenue over the last 6 months
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium w-8">{item.period}</span>
                    <div className="flex-1">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(item.revenue / 37350) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-bold">₹{item.revenue.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <p className="text-sm text-muted-foreground">
              Best performing products this month
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                    </div>
                  </div>
                  <span className="font-bold">{product.revenue}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">New Customers</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div className="w-3/4 bg-primary h-2 rounded-full" />
                  </div>
                  <span className="text-sm font-medium">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Returning Customers</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div className="w-1/2 bg-primary h-2 rounded-full" />
                  </div>
                  <span className="text-sm font-medium">50%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">VIP Customers</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-muted rounded-full h-2">
                    <div className="w-1/4 bg-primary h-2 rounded-full" />
                  </div>
                  <span className="text-sm font-medium">25%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { source: "Organic Search", percentage: 45, visits: "1,234" },
                { source: "Direct", percentage: 30, visits: "823" },
                { source: "Social Media", percentage: 15, visits: "412" },
                { source: "Email", percentage: 10, visits: "275" }
              ].map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{source.source}</span>
                    <span className="text-sm text-muted-foreground">{source.visits} visits</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { activity: "New order placed", time: "2 min ago", type: "order" },
                { activity: "Product review added", time: "15 min ago", type: "review" },
                { activity: "Customer registered", time: "1 hour ago", type: "customer" },
                { activity: "Payment received", time: "2 hours ago", type: "payment" },
                { activity: "Inventory updated", time: "3 hours ago", type: "inventory" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.activity}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;