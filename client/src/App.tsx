import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { AnimatePresence, motion } from "framer-motion";
import { pageVariants } from "@/lib/animation-variants";
import { useEffect } from "react";

// Pages
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import Products from "@/pages/Products";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import OrderConfirmation from "@/pages/OrderConfirmation";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import AdminDashboard from "@/pages/AdminDashboard";

// Components
import { CartDrawer } from "@/components/CartDrawer";
import { SearchModal } from "@/components/SearchModal";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function AnimatedRoute({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/">
          <AnimatedRoute><Home /></AnimatedRoute>
        </Route>
        <Route path="/products">
          <AnimatedRoute><Products /></AnimatedRoute>
        </Route>
        <Route path="/product/:id">
          <AnimatedRoute><ProductDetails /></AnimatedRoute>
        </Route>
        <Route path="/cart">
          <AnimatedRoute><Cart /></AnimatedRoute>
        </Route>
        <Route path="/checkout">
          <AnimatedRoute><Checkout /></AnimatedRoute>
        </Route>
        <Route path="/order-confirmation">
          <AnimatedRoute><OrderConfirmation /></AnimatedRoute>
        </Route>
        <Route path="/login">
          <AnimatedRoute><Login /></AnimatedRoute>
        </Route>
        <Route path="/register">
          <AnimatedRoute><Register /></AnimatedRoute>
        </Route>
        <Route path="/profile">
          <AnimatedRoute><Profile /></AnimatedRoute>
        </Route>
        <Route path="/about">
          <AnimatedRoute><About /></AnimatedRoute>
        </Route>
        <Route path="/faq">
          <AnimatedRoute><FAQ /></AnimatedRoute>
        </Route>
        <Route path="/admin">
          <AnimatedRoute><AdminDashboard /></AnimatedRoute>
        </Route>
        <Route>
          <AnimatedRoute><NotFound /></AnimatedRoute>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CurrencyProvider>
          <CartProvider>
            <TooltipProvider>
              <ScrollToTop />
              <Toaster />
              <Router />
              <CartDrawer />
              <SearchModal />
              <FloatingWhatsApp />
            </TooltipProvider>
          </CartProvider>
        </CurrencyProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
