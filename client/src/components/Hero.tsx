import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[#A0A0A0] mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Endorsed by Plaiter 💚
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              All tech products. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">
                One place.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg">
              Shop all gadgets related to making your work life easy. 
              We guarantee 70% cash back if you find a better price elsewhere.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,0,238,0.3)] hover:-translate-y-1">
                Start Shopping
              </button>
              <button className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-medium hover:bg-white/5 transition-all flex items-center justify-center gap-2 group">
                View Deals <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-12 flex items-center gap-6 text-sm text-muted-foreground/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Free Shipping
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> 30-Day Returns
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Secure Payment
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Abstract Tech Representation */}
            <div className="relative z-10 animate-float">
               {/* Unsplash image for tech/abstract hero */}
               <img 
                 src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80" 
                 alt="Future Tech"
                 className="w-full h-auto rounded-3xl shadow-2xl border border-white/5 mix-blend-lighten opacity-90"
               />
               
               {/* Floating elements */}
               <div className="absolute -bottom-10 -left-10 bg-[#262626] p-6 rounded-2xl border border-white/10 shadow-xl">
                 <div className="flex items-center gap-4">
                   <div className="bg-primary/20 p-3 rounded-full text-primary">
                     <ShoppingBag className="w-6 h-6" />
                   </div>
                   <div>
                     <p className="text-white font-bold text-lg">New Arrival</p>
                     <p className="text-muted-foreground text-sm">AirPods Max</p>
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
