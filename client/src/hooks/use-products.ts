import { useQuery } from "@tanstack/react-query";
import { api, buildUrl, type Product } from "@shared/routes";

export function useProducts(filters?: { category?: string; search?: string }) {
  return useQuery({
    queryKey: [api.products.list.path, filters],
    queryFn: async () => {
      const url = filters 
        ? `${api.products.list.path}?${new URLSearchParams(filters as Record<string, string>).toString()}`
        : api.products.list.path;
        
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      
      // Using the Zod schema from routes for validation
      return api.products.list.responses[200].parse(await res.json());
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: [api.products.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.products.get.path, { id });
      const res = await fetch(url);
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      
      return api.products.get.responses[200].parse(await res.json());
    },
  });
}
