import { useState } from "react";
import { 
  Plus, 
  X, 
  Star, 
  DollarSign, 
  Package,
  TrendingUp,
  Users,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice } from "@/utils/formatPrice";
import products from "@/data/products.json";

const Compare = () => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([1, 2]);

  const addProduct = (productId: number) => {
    if (selectedProducts.length < 4 && !selectedProducts.includes(productId)) {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const removeProduct = (productId: number) => {
    setSelectedProducts(selectedProducts.filter(id => id !== productId));
  };

  const selectedProductsData = products.filter(p => selectedProducts.includes(p.id));
  const availableProducts = products.filter(p => !selectedProducts.includes(p.id));

  const comparisonMetrics = [
    {
      label: "Price",
      key: "price",
      format: (value: number) => formatPrice(value),
      icon: DollarSign
    },
    {
      label: "Rating",
      key: "rating",
      format: (value: number) => `${value}/5`,
      icon: Star
    },
    {
      label: "Reviews",
      key: "reviews",
      format: (value: number) => value.toLocaleString(),
      icon: Users
    },
    {
      label: "Stock",
      key: "stock",
      format: (value: number) => `${value} units`,
      icon: Package
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Comparison</h1>
          <p className="text-muted-foreground">
            Compare products side by side to analyze performance and features
          </p>
        </div>
        <Button variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          View Report
        </Button>
      </div>

      {/* Add Product Section */}
      {selectedProducts.length < 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Product to Compare
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Select 
                onValueChange={(value) => addProduct(parseInt(value))}
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select a product to add" />
                </SelectTrigger>
                <SelectContent>
                  {availableProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                You can compare up to 4 products at once
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Table */}
      {selectedProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Product Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 gap-6" style={{
                gridTemplateColumns: `200px repeat(${selectedProductsData.length}, 1fr)`
              }}>
                {/* Header Row */}
                <div className="space-y-4">
                  <div className="h-48 flex items-end">
                    <span className="font-semibold text-lg">Products</span>
                  </div>
                  {comparisonMetrics.map((metric) => (
                    <div key={metric.label} className="h-16 flex items-center">
                      <div className="flex items-center gap-2">
                        <metric.icon className="h-4 w-4" />
                        <span className="font-medium">{metric.label}</span>
                      </div>
                    </div>
                  ))}
                  <div className="h-16 flex items-center">
                    <span className="font-medium">Category</span>
                  </div>
                  <div className="h-16 flex items-center">
                    <span className="font-medium">Status</span>
                  </div>
                  <div className="h-16 flex items-center">
                    <span className="font-medium">Trending</span>
                  </div>
                </div>

                {/* Product Columns */}
                {selectedProductsData.map((product) => (
                  <div key={product.id} className="space-y-4">
                    {/* Product Info */}
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                        onClick={() => removeProduct(product.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <Card className="h-48">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="h-16 w-full bg-muted rounded-lg flex items-center justify-center">
                              <span className="text-2xl font-bold text-muted-foreground">
                                {product.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm line-clamp-2">
                                {product.name}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                ID: #{product.id}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Metrics */}
                    {comparisonMetrics.map((metric) => (
                      <div key={metric.label} className="h-16 flex items-center justify-center">
                        <div className="text-center">
                          <p className="font-semibold">
                            {metric.format(product[metric.key as keyof typeof product] as number)}
                          </p>
                          {metric.key === "price" && product.originalPrice && (
                            <p className="text-xs text-muted-foreground line-through">
                              {formatPrice(product.originalPrice)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Category */}
                    <div className="h-16 flex items-center justify-center">
                      <Badge variant="outline">{product.category}</Badge>
                    </div>

                    {/* Status */}
                    <div className="h-16 flex items-center justify-center">
                      <Badge variant={product.status === "active" ? "default" : "secondary"}>
                        {product.status}
                      </Badge>
                    </div>

                    {/* Trending */}
                    <div className="h-16 flex items-center justify-center">
                      {product.trending ? (
                        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Insights */}
      {selectedProducts.length > 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Price Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedProductsData
                  .sort((a, b) => a.price - b.price)
                  .map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant={index === 0 ? "default" : "outline"}>
                          {index === 0 ? "Lowest" : index === selectedProductsData.length - 1 ? "Highest" : `#${index + 1}`}
                        </Badge>
                        <span className="text-sm font-medium">{product.name}</span>
                      </div>
                      <span className="font-bold">{formatPrice(product.price)}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Ranking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedProductsData
                  .sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews))
                  .map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant={index === 0 ? "default" : "outline"}>
                          #{index + 1}
                        </Badge>
                        <span className="text-sm font-medium">{product.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{product.rating} ({product.reviews})</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {selectedProducts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-6xl font-bold text-muted-foreground/20 mb-4">
              ⚖️
            </div>
            <h3 className="text-lg font-semibold mb-2">No products selected</h3>
            <p className="text-muted-foreground mb-4">
              Add products to start comparing their features and performance
            </p>
            <Button onClick={() => setSelectedProducts([1, 2])}>
              Add Sample Products
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Compare;