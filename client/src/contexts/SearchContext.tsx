import { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
    isSearchOpen: boolean;
    openSearch: () => void;
    closeSearch: () => void;
    toggleSearch: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const openSearch = () => setIsSearchOpen(true);
    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery("");
    };
    const toggleSearch = () => setIsSearchOpen((prev) => !prev);

    return (
        <SearchContext.Provider
            value={{
                isSearchOpen,
                openSearch,
                closeSearch,
                toggleSearch,
                searchQuery,
                setSearchQuery,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
}

// Standalone hook for components that need search functionality without context
export function useSearchState() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    return {
        isOpen,
        query,
        open: () => setIsOpen(true),
        close: () => {
            setIsOpen(false);
            setQuery("");
        },
        setQuery,
    };
}
