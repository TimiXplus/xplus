import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CurrencyCode = "NGN" | "USD" | "EUR" | "GBP";

interface Currency {
    code: CurrencyCode;
    symbol: string;
    rate: number; // Rate relative to USD (Base currency)
}

const CURRENCIES: Record<CurrencyCode, Currency> = {
    NGN: { code: "NGN", symbol: "₦", rate: 1500 },
    USD: { code: "USD", symbol: "$", rate: 1 },
    EUR: { code: "EUR", symbol: "€", rate: 0.92 },
    GBP: { code: "GBP", symbol: "£", rate: 0.79 },
};

interface CurrencyContextType {
    currentCurrency: Currency;
    setCurrency: (code: CurrencyCode) => void;
    formatPrice: (amount: number | string) => string;
    convertPrice: (amount: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_STORAGE_KEY = "xplus-currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currentCurrency, setCurrentCurrency] = useState<Currency>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(CURRENCY_STORAGE_KEY);
            if (saved && CURRENCIES[saved as CurrencyCode]) {
                return CURRENCIES[saved as CurrencyCode];
            }
        }
        return CURRENCIES["NGN"]; // Default to NGN
    });

    useEffect(() => {
        localStorage.setItem(CURRENCY_STORAGE_KEY, currentCurrency.code);
    }, [currentCurrency]);

    const setCurrency = (code: CurrencyCode) => {
        setCurrentCurrency(CURRENCIES[code]);
    };

    const convertPrice = (amount: number) => {
        return amount * currentCurrency.rate;
    };

    const formatPrice = (amount: number | string) => {
        const numAmount = Number(amount);
        if (isNaN(numAmount)) return "";

        const converted = convertPrice(numAmount);

        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: currentCurrency.code,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(converted);
    };

    return (
        <CurrencyContext.Provider
            value={{
                currentCurrency,
                setCurrency,
                formatPrice,
                convertPrice,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
}
