import { Link } from "wouter";
import { type Product } from "@shared/routes";
import { motion } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const [isAdded, setIsAdded] = useState(false);

  // Format price
  const price = formatPrice(product.price);

  const originalPrice = product.originalPrice
    ? formatPrice(product.originalPrice)
    : null;

  const discount = product.originalPrice
    ? Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -8 }}
        className="h-full bg-card rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-colors relative flex flex-col"
      >
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-4 left-4 z-10 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-primary/20">
            {discount}% OFF
          </div>
        )}

        {/* Image Container */}
        <div className="aspect-[4/3] w-full bg-[#1A1A1A] relative overflow-hidden flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 ease-out z-0 mix-blend-screen"
          />

          {/* Quick Add Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`absolute bottom-4 right-4 z-20 p-3 rounded-full translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg ${isAdded
              ? "bg-green-500 text-white"
              : "bg-white text-black hover:bg-primary hover:text-white"
              }`}
            onClick={handleAddToCart}
          >
            {isAdded ? (
              <Check className="h-5 w-5" />
            ) : (
              <ShoppingBag className="h-5 w-5" />
            )}
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="text-xs font-medium text-primary mb-2 uppercase tracking-wider">{product.category}</div>
          <h3 className="font-display font-bold text-lg text-white mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <div className="mt-auto flex items-end gap-3">
            <span className="text-xl font-bold text-primary">{price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through mb-1">{originalPrice}</span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
