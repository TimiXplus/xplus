import { useProducts } from "@/hooks/use-products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Loader2, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { slideUpVariants } from "@/lib/animation-variants";

const CATEGORIES = ["All", "Hot Deals", "Discounts", "New Arrivals", "Black Friday Deals"];
const SORT_OPTIONS = [
    { value: "default", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
];

export default function Products() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");
    const [showFilters, setShowFilters] = useState(false);

    const categoryFilter = selectedCategory === "All" ? undefined : selectedCategory;
    const { data: products, isLoading } = useProducts({ category: categoryFilter });

    // Sort products
    const sortedProducts = products ? [...products].sort((a, b) => {
        switch (sortBy) {
            case "price-asc":
                return Number(a.price) - Number(b.price);
            case "price-desc":
                return Number(b.price) - Number(a.price);
            case "name-asc":
                return a.name.localeCompare(b.name);
            case "name-desc":
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    }) : [];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow">
                {/* Header */}
                <motion.section
                    variants={slideUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="py-12 md:py-16 border-b border-white/5"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Breadcrumbs items={[{ label: "Products" }]} />
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            All Products
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Discover our complete collection of premium tech products, gadgets, and accessories.
                        </p>
                    </div>
                </motion.section>

                {/* Filters & Sort */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((category) => (
                                <motion.button
                                    key={category}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                        ? "bg-primary text-white"
                                        : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    {category}
                                </motion.button>
                            ))}
                        </div>

                        {/* Sort & Filter Toggle */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="md:hidden flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-muted-foreground hover:bg-white/10 transition-colors"
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </button>

                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none px-4 py-2 pr-10 rounded-full bg-white/5 text-white border border-white/10 focus:border-primary/50 focus:outline-none cursor-pointer"
                                >
                                    {SORT_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value} className="bg-background">
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        </div>
                    ) : sortedProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground text-lg">No products found in this category.</p>
                        </div>
                    ) : (
                        <ProductGrid products={sortedProducts} />
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
