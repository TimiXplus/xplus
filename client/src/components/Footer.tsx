import { Link } from "wouter";
import { motion } from "framer-motion";
import { Facebook, Instagram, Mail } from "lucide-react";

const FOOTER_LINKS = {
  Shop: [
    { label: "All Products", href: "/products" },
    { label: "Hot Deals", href: "/products" },
    { label: "New Arrivals", href: "/products" },
    { label: "Black Friday", href: "/products" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping", href: "/faq" },
    { label: "Returns", href: "/faq" },
    { label: "Contact", href: "/about" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Instagram, href: "https://www.instagram.com/xplus.com.ng/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61581963536937", label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Stay Updated
            </h3>
            <p className="text-muted-foreground">
              Subscribe for exclusive deals and new arrivals.
            </p>
          </div>
          <form className="flex w-full md:w-auto gap-3">
            <div className="relative flex-1 md:w-80">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/80 transition-colors"
            >
              Subscribe
            </motion.button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img src="/logo.png" alt="Xplus" className="h-20 w-auto object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Your one-stop shop for premium tech products and gadgets.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Xplus. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
