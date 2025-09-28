import { Star, ShoppingCart, Eye, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/utils/formatPrice";

// Import product images
import headphones from "@/assets/products/headphones.jpg";
import smartwatch from "@/assets/products/smartwatch.jpg";
import tshirt from "@/assets/products/tshirt.jpg";
import waterbottle from "@/assets/products/waterbottle.jpg";
import keyboard from "@/assets/products/keyboard.jpg";
import desklamp from "@/assets/products/desklamp.jpg";
import charger from "@/assets/products/charger.jpg";
import coffee from "@/assets/products/coffee.jpg";

const productImages: { [key: string]: string } = {
  "headphones.jpg": headphones,
  "smartwatch.jpg": smartwatch,
  "tshirt.jpg": tshirt,
  "waterbottle.jpg": waterbottle,
  "keyboard.jpg": keyboard,
  "desklamp.jpg": desklamp,
  "charger.jpg": charger,
  "coffee.jpg": coffee,
};

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
  status: string;
  trending?: boolean;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card 
      className="group cursor-pointer card-hover bg-card border-border/50"
      onClick={() => onClick?.(product)}
    >
      <CardContent className="p-0">
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
          <img 
            src={productImages[product.image] || productImages["headphones.jpg"]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.trending && (
              <Badge variant="destructive" className="text-xs">
                Trending
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge variant="secondary" className="text-xs">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Quick actions */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex flex-col gap-1">
              <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stock indicator */}
          {product.stock < 10 && (
            <div className="absolute bottom-2 left-2">
              <Badge variant="destructive" className="text-xs">
                Low Stock: {product.stock}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="space-y-2">
            {/* Category */}
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {product.category}
            </p>

            {/* Title */}
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{product.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <Button size="sm" className="flex-1">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}