import { useProducts } from "@/hooks/use-products";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductSection } from "@/components/ProductSection";
import { Footer } from "@/components/Footer";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data: products, isLoading } = useProducts();

  const hotDeals = products?.filter(p => p.category === 'Hot Deals') || [];
  const discounts = products?.filter(p => p.category === 'Discounts') || [];
  const newArrivals = products?.filter(p => p.category === 'New Arrivals') || [];
  const blackFriday = products?.filter(p => p.category === 'Black Friday Deals') || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <div className="space-y-8 pb-20">
          <ProductSection title="Hot Deals" products={hotDeals} icon="🔥" />
          <ProductSection title="Discounts" products={discounts} icon="✨" />
          <ProductSection title="New Arrivals" products={newArrivals} />
          <ProductSection title="Black Friday Deals" products={blackFriday} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
