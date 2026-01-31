import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/use-products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import {
    Plus,
    Pencil,
    Trash2,
    Loader2,
    Package,
    LayoutDashboard,
    ExternalLink,
    AlertCircle,
    Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { type Product } from "@shared/routes";

const CATEGORIES = ["Hot Deals", "Discounts", "New Arrivals", "Black Friday Deals"];

export default function AdminDashboard() {
    const { user, isLoading: authLoading } = useAuth();
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const { data: products, isLoading: productsLoading } = useProducts();
    const createMutation = useCreateProduct();
    const updateMutation = useUpdateProduct();
    const deleteMutation = useDeleteProduct();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        imageUrl: "",
        category: CATEGORIES[0],
        specifications: ""
    });

    useEffect(() => {
        if (!authLoading && (!user || user.role !== "admin")) {
            setLocation("/");
        }
    }, [user, authLoading, setLocation]);

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            originalPrice: product.originalPrice || "",
            imageUrl: product.imageUrl,
            category: product.category,
            specifications: product.specifications || ""
        });
        setIsDialogOpen(true);
    };

    const handleAdd = () => {
        setEditingProduct(null);
        setFormData({
            name: "",
            description: "",
            price: "",
            originalPrice: "",
            imageUrl: "",
            category: CATEGORIES[0],
            specifications: ""
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteMutation.mutateAsync(id);
                toast({
                    title: "Success",
                    description: "Product deleted successfully",
                });
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to delete product",
                });
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = {
                ...formData,
                price: formData.price,
                originalPrice: formData.originalPrice || null,
                specifications: formData.specifications || null,
            };

            if (editingProduct) {
                await updateMutation.mutateAsync({ id: editingProduct.id, data });
                toast({
                    title: "Success",
                    description: "Product updated successfully",
                });
            } else {
                await createMutation.mutateAsync(data);
                toast({
                    title: "Success",
                    description: "Product created successfully",
                });
            }
            setIsDialogOpen(false);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to save product",
            });
        }
    };

    if (authLoading || (user && user.role !== "admin")) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-2 text-primary font-medium mb-2">
                                <LayoutDashboard className="w-4 h-4" />
                                <span className="uppercase tracking-widest text-xs">Admin Console</span>
                            </div>
                            <h1 className="font-display text-4xl font-bold text-white">Product Management</h1>
                            <p className="text-muted-foreground mt-2">Manage your inventory, prices, and product details.</p>
                        </div>
                        <Button
                            onClick={handleAdd}
                            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 h-auto text-lg font-bold group shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                        >
                            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                            Add New Product
                        </Button>
                    </div>

                    {/* Stats Card (Optional visual flair) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                                    <Package className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground uppercase tracking-wider">Total Products</p>
                                    <h3 className="text-2xl font-bold text-white">{products?.length || 0}</h3>
                                </div>
                            </div>
                        </div>
                        {/* More stats if needed */}
                    </div>

                    {/* Products Table */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
                        {productsLoading ? (
                            <div className="py-20 flex justify-center">
                                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                            </div>
                        ) : (
                            <Table>
                                <TableHeader className="bg-white/5">
                                    <TableRow className="border-white/10 hover:bg-transparent">
                                        <TableHead className="text-white font-bold py-6 px-6">Product</TableHead>
                                        <TableHead className="text-white font-bold">Category</TableHead>
                                        <TableHead className="text-white font-bold">Price</TableHead>
                                        <TableHead className="text-white font-bold text-right px-6">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products?.map((product) => (
                                        <TableRow key={product.id} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                                            <TableCell className="py-6 px-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl border border-white/10 overflow-hidden bg-black/40 flex-shrink-0">
                                                        <img
                                                            src={product.imageUrl}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = "https://placehold.co/400x400/000000/FFFFFF?text=No+Image";
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white text-lg">{product.name}</div>
                                                        <div className="text-sm text-muted-foreground line-clamp-1 max-w-md">{product.description}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium">
                                                    {product.category}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-bold text-white">${product.price}</div>
                                                {product.originalPrice && (
                                                    <div className="text-xs text-muted-foreground line-through">${product.originalPrice}</div>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right px-6">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleEdit(product)}
                                                        className="h-10 w-10 rounded-xl hover:bg-primary/20 hover:text-primary"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(product.id)}
                                                        className="h-10 w-10 rounded-xl hover:bg-red-500/20 hover:text-red-500"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                </div>
            </main>

            {/* Product Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-2xl border-white/10 rounded-[2rem] p-0 overflow-hidden">
                    <form onSubmit={handleSubmit}>
                        <div className="p-8">
                            <DialogHeader className="mb-8">
                                <DialogTitle className="text-3xl font-display font-bold text-white">
                                    {editingProduct ? "Edit Product" : "Add New Product"}
                                </DialogTitle>
                                <DialogDescription className="text-muted-foreground">
                                    {editingProduct ? "Update the details of your product below." : "Fill in the details to add a new product to your inventory."}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-white/80">Product Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g. Premium Smart Watch"
                                            className="bg-white/5 border-white/10 rounded-2xl h-12 focus:ring-primary h-14"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category" className="text-white/80">Category</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                                        >
                                            <SelectTrigger className="bg-white/5 border-white/10 rounded-2xl h-14 focus:ring-primary text-white">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-900 border-white/10 rounded-2xl text-white">
                                                {CATEGORIES.map((cat) => (
                                                    <SelectItem key={cat} value={cat} className="focus:bg-primary focus:text-white rounded-xl">
                                                        {cat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="price" className="text-white/80">Sale Price ($)</Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                step="0.01"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                placeholder="49.99"
                                                className="bg-white/5 border-white/10 rounded-2xl h-14 focus:ring-primary"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="originalPrice" className="text-white/80">Original Price ($)</Label>
                                            <Input
                                                id="originalPrice"
                                                type="number"
                                                step="0.01"
                                                value={formData.originalPrice}
                                                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                                placeholder="79.99"
                                                className="bg-white/5 border-white/10 rounded-2xl h-14 focus:ring-primary"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="imageUrl" className="text-white/80">Image URL</Label>
                                        <Input
                                            id="imageUrl"
                                            value={formData.imageUrl}
                                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                            placeholder="https://images.unsplash.com/..."
                                            className="bg-white/5 border-white/10 rounded-2xl h-14 focus:ring-primary"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="specifications" className="text-white/80">Specifications (Semicolon separated)</Label>
                                        <Input
                                            id="specifications"
                                            value={formData.specifications}
                                            onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                                            placeholder="Display: 1.43 inch; Battery: 450mAh; ..."
                                            className="bg-white/5 border-white/10 rounded-2xl h-14 focus:ring-primary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-white/80">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Detailed product overview..."
                                            className="bg-white/5 border-white/10 rounded-2xl min-h-[140px] focus:ring-primary resize-none p-4"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border-t border-white/10 flex justify-end gap-4 bg-white/[0.02]">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setIsDialogOpen(false)}
                                className="rounded-full px-6 transition-colors hover:bg-white/10"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={createMutation.isPending || updateMutation.isPending}
                                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 shadow-lg shadow-primary/20"
                            >
                                {createMutation.isPending || updateMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Check className="w-4 h-4 mr-2" />
                                        {editingProduct ? "Update Product" : "Create Product"}
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
}
