import { Link } from "wouter";
import { type Product } from "@shared/routes";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Format price
  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(product.price));
  
  const originalPrice = product.originalPrice 
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(Number(product.originalPrice))
    : null;

  const discount = product.originalPrice 
    ? Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100)
    : 0;

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
          <button 
            className="absolute bottom-4 right-4 z-20 bg-white text-black p-3 rounded-full translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:bg-primary hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic would go here
            }}
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
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
