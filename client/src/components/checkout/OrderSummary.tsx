import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Truck } from "lucide-react";

export function OrderSummary() {
    const { items, subtotal, shipping, total } = useCart();

    const { formatPrice } = useCurrency();

    return (
        <div className="bg-card rounded-2xl border border-white/5 p-6 sticky top-24">
            <h2 className="font-display text-xl font-bold text-white mb-6">
                Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                        <div className="w-14 h-14 bg-[#1A1A1A] rounded-lg overflow-hidden flex-shrink-0">
                            <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="w-full h-full object-contain mix-blend-screen"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                                {item.product.name}
                            </p>
                            <p className="text-muted-foreground text-xs">
                                Qty: {item.quantity}
                            </p>
                        </div>
                        <p className="text-white font-medium text-sm">
                            {formatPrice(Number(item.product.price) * item.quantity)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                        <Truck className="w-4 h-4" /> Shipping
                    </span>
                    <span className="text-white">
                        {shipping === 0 ? (
                            <span className="text-green-500">Free</span>
                        ) : (
                            formatPrice(shipping)
                        )}
                    </span>
                </div>
                <div className="flex justify-between text-lg pt-3 border-t border-white/10">
                    <span className="font-bold text-white">Total</span>
                    <span className="font-bold text-primary">{formatPrice(total)}</span>
                </div>
            </div>

            {/* Guarantee */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl text-center">
                <p className="text-sm text-muted-foreground">
                    🔒 Secure 256-bit SSL encryption
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                    30-day money-back guarantee
                </p>
            </div>
        </div>
    );
}
