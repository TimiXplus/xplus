import { Link, useLocation } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

interface BreadcrumbProps {
    items: {
        label: string;
        href?: string;
    }[];
}

export function Breadcrumbs({ items }: BreadcrumbProps) {
    return (
        <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm font-medium">
                <li>
                    <Link href="/" className="text-muted-foreground hover:text-white transition-colors flex items-center">
                        <Home className="w-4 h-4 mr-1" />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>

                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-muted-foreground hover:text-white transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-white" aria-current="page">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
