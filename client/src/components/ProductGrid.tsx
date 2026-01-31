import { motion } from "framer-motion";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animation-variants";
import { ProductCard } from "./ProductCard";
import { type Product } from "@shared/routes";

interface ProductGridProps {
    products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
    return (
        <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            {products.map((product) => (
                <motion.div key={product.id} variants={staggerItemVariants}>
                    <ProductCard product={product} />
                </motion.div>
            ))}
        </motion.div>
    );
}
