import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, User } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 cursor-pointer group">
            <span className="font-display text-2xl font-bold tracking-tighter text-white">
              X<span className="text-primary group-hover:text-white transition-colors duration-300">plus</span>
            </span>
          </Link>

          {/* Search Bar - Center */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search gadgets..."
              className="w-full bg-[#262626] text-white placeholder-muted-foreground rounded-full py-3 pl-12 pr-4 border-2 border-transparent focus:border-primary/50 focus:bg-[#1E1E1E] focus:outline-none transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <Link href="/" className={`hover:text-white transition-colors ${isActive('/') ? 'text-white' : ''}`}>Category</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-muted-foreground hover:text-white hover:bg-white/10 rounded-full transition-colors relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full animate-pulse"></span>
              </button>
              <button className="hidden sm:block px-5 py-2 rounded-full bg-white text-black font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                Sign In
              </button>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Mobile Search - Visible only on small screens */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#262626] text-white text-sm rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
      </div>
    </nav>
  );
}
