import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <span className="font-display text-3xl font-bold tracking-tighter text-white">
                X<span className="text-primary group-hover:text-white transition-colors">plus</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Your one-stop destination for premium tech gadgets. Quality guaranteed, prices matched.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-lg mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Hot Deals</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Laptops</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/warranty" className="hover:text-primary transition-colors">Warranty</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white text-lg mb-6">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">Subscribe for latest deals and drops.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="bg-[#1E1E1E] text-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-primary border border-white/5"
              />
              <button className="bg-primary text-white p-2 rounded-full hover:bg-white hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © 2024 Xplus Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
