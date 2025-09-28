import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  SortAsc,
  Download,
  MoreHorizontal 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/utils/formatPrice";
import products from "@/data/products.json";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  const { toast } = useToast();

  const categories = ["all", ...new Set(products.map(p => p.category.toLowerCase()))];
  
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || 
                             product.category.toLowerCase() === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "stock":
          return b.stock - a.stock;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleProductClick = (product: any) => {
    toast({
      title: "Product Selected",
      description: `Clicked on ${product.name}`,
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and inventory
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative min-w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : 
                   category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="stock">Stock Level</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredProducts.length} of {products.length} products
        </p>
        <div className="flex items-center gap-2">
          {selectedCategory !== "all" && (
            <Badge 
              variant="secondary" 
              className="cursor-pointer"
              onClick={() => setSelectedCategory("all")}
            >
              {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} ×
            </Badge>
          )}
          {searchTerm && (
            <Badge 
              variant="secondary" 
              className="cursor-pointer"
              onClick={() => setSearchTerm("")}
            >
              "{searchTerm}" ×
            </Badge>
          )}
        </div>
      </div>

      {/* Products Grid/List */}
      {filteredProducts.length > 0 ? (
        <div className={
          viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }>
          {filteredProducts.map((product) => 
            viewMode === "grid" ? (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={handleProductClick}
              />
            ) : (
              <div key={product.id} className="bg-card border rounded-lg p-4 flex items-center justify-between card-hover">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-muted-foreground">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{formatPrice(product.price)}</span>
                      <Badge variant="outline">Stock: {product.stock}</Badge>
                      <Badge variant={product.status === "active" ? "default" : "secondary"}>
                        {product.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit Product</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>View Analytics</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete Product
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl font-bold text-muted-foreground/20 mb-4">
            📦
          </div>
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Products;