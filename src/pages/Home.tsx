import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  DollarSign,
  Package,
  Eye,
  ArrowUpRight,
  Star
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice } from "@/utils/formatPrice";
import products from "@/data/products.json";

const Home = () => {
  const trendingProducts = products.filter(p => p.trending).slice(0, 4);
  const recommendedProducts = products.slice(0, 6);

  const stats = [
    {
      title: "Total Revenue",
      value: "₹37,54,247",
      change: "+20.1%",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "Orders",
      value: "2,350",
      change: "+180.1%",
      icon: ShoppingCart,
      trend: "up"
    },
    {
      title: "Customers",
      value: "1,234",
      change: "+19%",
      icon: Users,
      trend: "up"
    },
    {
      title: "Products",
      value: "573",
      change: "+201",
      icon: Package,
      trend: "up"
    }
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>
        <Button>
          <Eye className="h-4 w-4 mr-2" />
          View Store
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <Badge 
                  variant={stat.trend === "up" ? "default" : "secondary"}
                  className="mr-2"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trending Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Trending Products
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Your most popular products this week
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All
            <ArrowUpRight className="h-4 w-4 ml-2" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Recommended for You
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Based on your store performance and customer preferences
            </p>
          </div>
          <Button variant="outline" size="sm">
            View Recommendations
            <ArrowUpRight className="h-4 w-4 ml-2" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Analytics Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { event: "New order #12345", time: "2 minutes ago", type: "order" },
                { event: "Product review received", time: "15 minutes ago", type: "review" },
                { event: "Low stock alert: Headphones", time: "1 hour ago", type: "warning" },
                { event: "New customer registered", time: "2 hours ago", type: "customer" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">{activity.event}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="outline">{activity.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: "Electronics", revenue: "₹10,24,637", percentage: 45 },
                { category: "Clothing", revenue: "₹7,38,783", percentage: 32 },
                { category: "Home", revenue: "₹4,50,856", percentage: 20 },
                { category: "Lifestyle", revenue: "₹1,75,047", percentage: 8 },
              ].map((cat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{cat.category}</span>
                    <span className="text-sm font-bold">{cat.revenue}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;