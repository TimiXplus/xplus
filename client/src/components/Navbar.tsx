import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, User, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { CurrencySelector } from "@/components/CurrencySelector";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openCart, itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const isActive = (path: string) => location === path;

  const openSearch = () => {
    if ((window as any).openSearchModal) {
      (window as any).openSearchModal();
    }
  };

  const navLinks = [
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 cursor-pointer group">
            <div className="flex items-baseline relative">
              <span className="font-['Outfit'] text-[2.8rem] font-black tracking-tighter text-white leading-none">
                X
              </span>
              <span className="font-['Playfair_Display'] text-3xl font-bold italic text-primary -ml-0.5 relative">
                Plus
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </div>
          </Link>

          {/* Search Bar - Center (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <button
              onClick={openSearch}
              className="w-full flex items-center gap-3 bg-[#262626] text-muted-foreground rounded-full py-3 px-4 border-2 border-transparent hover:border-primary/30 focus:border-primary/50 transition-all duration-300 group"
            >
              <Search className="h-5 w-5 group-hover:text-primary transition-colors" />
              <span>Search gadgets...</span>
              <kbd className="ml-auto text-xs bg-white/10 px-2 py-1 rounded">⌘K</kbd>
            </button>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-white transition-colors ${isActive(link.href) ? 'text-white' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search (Mobile) */}
            <button
              onClick={openSearch}
              className="md:hidden p-2 text-muted-foreground hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCart}
              className="p-2 text-muted-foreground hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full text-xs font-bold flex items-center justify-center text-white"
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </motion.span>
              )}
            </motion.button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span className="max-w-[100px] truncate">{user?.username}</span>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-card border border-white/10 rounded-xl overflow-hidden shadow-xl"
                    >
                      {user?.role === "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-3 hover:bg-white/5 transition-colors text-primary font-bold border-b border-white/5"
                        >
                          <LayoutDashboard className="h-4 w-4" /> Admin Dashboard
                        </Link>
                      )}
                      <Link
                        href="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-white/5 transition-colors text-white"
                      >
                        <User className="h-4 w-4" /> My Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-white/5 transition-colors text-red-500"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:block px-5 py-2 rounded-full bg-white text-black font-semibold hover:bg-primary hover:text-white transition-all duration-300"
              >
                Sign In
              </Link>
            )}

            {/* Currency Selector */}
            <div className="hidden sm:block">
              <CurrencySelector />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/5 bg-background"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl transition-colors ${isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              {!isAuthenticated && (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl bg-primary text-white font-semibold text-center mt-4"
                >
                  Sign In
                </Link>
              )}

              {isAuthenticated && (
                <>
                  {user?.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl text-primary font-bold bg-primary/10 border border-primary/20 transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-white transition-colors"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
