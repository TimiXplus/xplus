import { useRoute } from "wouter";
import { useProduct } from "@/hooks/use-products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Loader2, ArrowLeft, Star, ShoppingCart, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: product, isLoading, error } = useProduct(id);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-3xl font-display font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you are looking for does not exist or has been moved.</p>
        <Link href="/" className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/80 transition">
          Back to Home
        </Link>
      </div>
    );
  }

  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(product.price));
  const originalPrice = product.originalPrice 
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(product.originalPrice))
    : null;
  const discount = product.originalPrice 
    ? Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-card rounded-3xl overflow-hidden border border-white/5 flex items-center justify-center p-8 relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-screen hover:scale-105 transition-transform duration-500"
              />
              {discount > 0 && (
                <div className="absolute top-6 left-6 bg-primary text-white px-4 py-1.5 rounded-full font-bold shadow-lg">
                  {discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-primary font-medium tracking-wide uppercase text-sm">{product.category}</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current opacity-50" />
              </div>
              <span className="text-muted-foreground text-sm">(128 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-bold text-white">{price}</span>
              {originalPrice && (
                <div className="flex flex-col mb-1">
                  <span className="text-lg text-muted-foreground line-through decoration-red-500 decoration-2">{originalPrice}</span>
                </div>
              )}
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-10 border-b border-white/10 pb-10">
              {product.description}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center bg-[#262626] rounded-full p-1 border border-white/10 w-fit">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors"
                >
                  +
                </button>
              </div>

              <button className="flex-1 bg-primary hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(0,0,238,0.2)] hover:shadow-[0_0_30px_rgba(0,0,238,0.4)] transform hover:-translate-y-0.5">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            {/* Features / Trust */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-card border border-white/5">
                <Truck className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-white text-sm">Free Shipping</h4>
                <p className="text-xs text-muted-foreground mt-1">On orders over $50</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-card border border-white/5">
                <ShieldCheck className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-white text-sm">2 Year Warranty</h4>
                <p className="text-xs text-muted-foreground mt-1">Full coverage</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-card border border-white/5">
                <RefreshCw className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-white text-sm">30 Days Return</h4>
                <p className="text-xs text-muted-foreground mt-1">No questions asked</p>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
