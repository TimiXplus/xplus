import { useRoute } from "wouter";
import { useProduct, useReviews, useSubmitReview } from "@/hooks/use-products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Loader2, Star, ShoppingCart, Truck, ShieldCheck, RefreshCw, Check, Send } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useAuth } from "@/contexts/AuthContext";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { slideUpVariants } from "@/lib/animation-variants";

export default function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: product, isLoading, error } = useProduct(id);
  const { data: reviews = [] } = useReviews(id);
  const submitReview = useSubmitReview(id);
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    await submitReview.mutateAsync({ comment: reviewComment, rating: reviewRating });
    setReviewComment("");
    setReviewRating(5);
  };

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
        <h1 className="text-3xl font-display font-bold mb-4 text-white">Product Not Found</h1>
        <Link href="/" className="px-6 py-3 bg-primary text-white rounded-full">Back to Home</Link>
      </div>
    );
  }

  const images = [product.imageUrl, product.imageUrl, product.imageUrl, product.imageUrl];
  const price = formatPrice(product.price);
  const originalPrice = product.originalPrice ? formatPrice(product.originalPrice) : null;
  const discount = product.originalPrice ? Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100) : 0;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            { label: product.category, href: `/products?category=${product.category}` },
            { label: product.name }
          ]}
        />

        <motion.div
          variants={slideUpVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-8"
        >
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-card rounded-3xl overflow-hidden border border-white/5 flex items-center justify-center p-8 relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  src={images[activeImage]}
                  className="w-full h-full object-contain mix-blend-screen"
                />
              </AnimatePresence>
              {discount > 0 && (
                <div className="absolute top-6 left-6 bg-primary text-white px-4 py-1.5 rounded-full font-bold shadow-lg">
                  {discount}% OFF
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square rounded-xl bg-card border-2 p-2 transition-all ${activeImage === index ? "border-primary" : "border-white/5"}`}
                >
                  <img src={img} className="w-full h-full object-contain mix-blend-screen" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-primary font-medium uppercase text-sm mb-2">{product.category}</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h1>

            <div className="flex items-center gap-2 mb-8 text-yellow-500">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="text-muted-foreground text-sm">({reviews.length} reviews)</span>
            </div>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-bold text-white">{price}</span>
              {originalPrice && <span className="text-lg text-muted-foreground line-through decoration-red-500">{originalPrice}</span>}
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-10 border-b border-white/10 pb-10">{product.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center bg-[#262626] rounded-full p-1 border border-white/10 w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 text-white">-</button>
                <span className="w-12 text-center font-bold text-white text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 text-white">+</button>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`flex-1 font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-all ${isAdded ? "bg-green-500" : "bg-primary"} text-white`}
              >
                {isAdded ? <><Check className="w-5 h-5" /> Added</> : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
              </motion.button>
            </div>

            {/* Features Case */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Global" },
                { icon: ShieldCheck, label: "2Y Warranty", sub: "Protected" },
                { icon: RefreshCw, label: "30D Return", sub: "Safe" }
              ].map((f, i) => (
                <div key={i} className="flex flex-col items-center p-3 rounded-2xl bg-card border border-white/5">
                  <f.icon className="w-5 h-5 text-primary mb-1" />
                  <span className="font-bold text-white text-[10px] md:text-xs">{f.label}</span>
                </div>
              ))}
            </div>

            <Tabs.Root defaultValue="specifications" className="w-full">
              <Tabs.List className="flex gap-8 border-b border-white/10 mb-6">
                {["Specifications", "Reviews", "Description"].map(tab => (
                  <Tabs.Trigger key={tab} value={tab.toLowerCase()} className="pb-4 text-muted-foreground hover:text-white data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary font-medium">
                    {tab}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              <Tabs.Content value="specifications">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications?.split(';').map(spec => {
                    const [k, v] = spec.split(':');
                    return (
                      <div key={k} className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                        <span className="text-muted-foreground text-sm">{k}</span>
                        <span className="text-white font-medium text-sm">{v}</span>
                      </div>
                    );
                  })}
                </div>
              </Tabs.Content>

              <Tabs.Content value="reviews">
                <div className="space-y-8">
                  {isAuthenticated ? (
                    <form onSubmit={handleSubmitReview} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h4 className="text-white font-bold mb-4">Write a review</h4>
                      <div className="flex gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map(i => (
                          <button key={i} type="button" onClick={() => setReviewRating(i)}>
                            <Star className={`w-6 h-6 ${i <= reviewRating ? "text-yellow-500 fill-current" : "text-gray-600"}`} />
                          </button>
                        ))}
                      </div>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary/50 min-h-[100px]"
                      />
                      <button type="submit" className="mt-4 px-6 py-2 bg-primary text-white rounded-full flex items-center gap-2 hover:bg-primary/80 transition shadow-lg">
                        <Send className="w-4 h-4" /> Post Review
                      </button>
                    </form>
                  ) : (
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <p className="text-muted-foreground">Please <Link href="/login" className="text-primary font-bold">sign in</Link> to leave a review.</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    {reviews.length > 0 ? reviews.map(r => (
                      <div key={r.id} className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-white">{r.userName}</span>
                          <div className="flex text-yellow-500">
                            {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">{r.comment}</p>
                      </div>
                    )) : (
                      <div className="text-center py-10 text-muted-foreground">No reviews yet.</div>
                    )}
                  </div>
                </div>
              </Tabs.Content>

              <Tabs.Content value="description" className="text-muted-foreground leading-relaxed">
                {product.description}
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
