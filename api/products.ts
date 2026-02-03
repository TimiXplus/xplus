import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory product data for Vercel serverless
const PRODUCTS = [
    {
        id: 1,
        name: "X-Plus Smart Watch Pro",
        description: "Premium Titanium Smart Watch with Heart Rate Monitoring, advanced sleep tracking, and up to 14-day battery life.",
        price: "50.99",
        imageUrl: "https://framerusercontent.com/images/xbiHeFVsvZXuJkr6gD9G8l4BVlQ.jpg",
        category: "Hot Deals",
        specifications: "Display:1.43\" AMOLED;Battery:450mAh (14 Days);Sensors:SpO2, Heart Rate, ECG;Water Resistance:5ATM;Case:Titanium Alloy",
        originalPrice: null
    },
    {
        id: 2,
        name: "Apex Pro Game Pad",
        description: "Precision Wireless Gaming Controller featuring haptic feedback and adaptive triggers.",
        price: "45.00",
        imageUrl: "https://framerusercontent.com/images/6ZEeWmqH9cS37oJjcqtJy1wio.jpg",
        category: "Hot Deals",
        specifications: "Connectivity:Wireless/USB-C;Battery:12 Hours;Feedback:DualSense Haptics;Compatibility:PC, PS5, Android;Weight:280g",
        originalPrice: null
    },
    {
        id: 3,
        name: "Mechanical Gaming Keyboard",
        description: "Pro-Grade RGB Mechanical Keyboard with programmable keys.",
        price: "89.99",
        imageUrl: "https://framerusercontent.com/images/G26NR3vaDPniJpjcXXAMXPfd3Lw.jpg",
        category: "Hot Deals",
        specifications: "Switches:Cherry MX Blue;Lighting:Per-key RGB;Keys:104 Anti-ghosting;Frame:Aluminum;Cable:Braided USB-C",
        originalPrice: null
    },
    {
        id: 4,
        name: "Classic Heritage Analog",
        description: "Timeless Minimalist Quartz Business Watch featuring a premium Italian leather strap.",
        price: "86.00",
        originalPrice: "120.00",
        imageUrl: "https://framerusercontent.com/images/EFxcYveZp0Wwusii7P0jbzhTw.jpg",
        category: "Discounts",
        specifications: "Movement:Swiss Quartz;Strap:Grain Leather;Glass:Sapphire Crystal;Diameter:40mm;Thickness:8mm"
    },
    {
        id: 5,
        name: "X-Plus Smart Watch Gen 2",
        description: "Next-generation wearable with integrated GPS and blood oxygen sensor.",
        price: "120.00",
        originalPrice: "180.00",
        imageUrl: "https://framerusercontent.com/images/XU6DGRvG0p3HIg3UwQqeJcTTcUU.jpg",
        category: "Discounts",
        specifications: "GPS:Built-in Glonass;Display:Retina LTPO;OS:WearOS Optimized;App Sync:iOS/Android;NFC:Contactless Pay"
    },
    {
        id: 6,
        name: "SonicPro Surround Speaker",
        description: "High-Fidelity Bluetooth Surround Sound Speaker with deep bass technology.",
        price: "65.99",
        originalPrice: "89.99",
        imageUrl: "https://framerusercontent.com/images/DKUPStf71s3Z11LvdJwf9YKY3NY.jpg",
        category: "Discounts",
        specifications: "Range:30m;Power:40W Peak;Driver:Dual 50mm;Battery:5200mAh;Bluetooth:5.3"
    },
    {
        id: 7,
        name: "Titan 2TB NVMe SSD",
        description: "Blazing fast Internal NVMe M.2 Solid State Drive with up to 7000MB/s Read/Write speeds.",
        price: "149.99",
        imageUrl: "https://framerusercontent.com/images/Eg8u27Mfu42nThZj8svky8rirGg.jpg",
        category: "Black Friday Deals",
        specifications: "Interface:PCIe Gen4 x4;Capacity:2TB;Read Speed:7450MB/s;Write Speed:6900MB/s;Form Factor:M.2 2280",
        originalPrice: null
    },
    {
        id: 8,
        name: "OmniHub 10-in-1 Dock",
        description: "Ultimate USB-C docking station with 4K HDMI, Gigabit Ethernet, and 100W Power Delivery.",
        price: "75.00",
        imageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80",
        category: "New Arrivals",
        specifications: "Ports:3x USB 3.0, 1x HDMI, 1x RJ45, 1x SD, 1x MicroSD, 1x USB-C PD, 1x 3.5mm;HDMI:4K@60Hz;Power:100W PD;Material:Aluminum",
        originalPrice: null
    },
    {
        id: 9,
        name: "ZenCapture 4K Webcam",
        description: "Professional grade 4K resolution webcam with auto-focus and dual noise-canceling microphones.",
        price: "99.00",
        imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83dadc?w=800&q=80",
        category: "New Arrivals",
        specifications: "Resolution:4K Ultra HD;Frame Rate:30fps/60fps;Field of View:90°;Microphone:Dual Stereo;Privacy:Built-in Shutter",
        originalPrice: null
    },
    {
        id: 10,
        name: "Lumina RGB Desk Lamp",
        description: "Smart LED desk lamp with adjustable color temperature, brightness, and built-in wireless charger.",
        price: "42.50",
        imageUrl: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&q=80",
        category: "New Arrivals",
        specifications: "Modes:5 Color Temps;Brightness:10 Levels;Wireless Charge:10W Qi;USB Port:5V/2A;Timer:45 Mins",
        originalPrice: null
    },
    {
        id: 11,
        name: "AeroPod Pro Earbuds",
        description: "True wireless earbuds with Active Noise Cancellation and spatial audio experience.",
        price: "129.99",
        imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
        category: "Hot Deals",
        specifications: "Drivers:10mm Dynamic;ANC:Up to 35dB;Battery:6H (Earbuds) + 24H (Case);Latency:60ms;Bluetooth:5.2",
        originalPrice: null
    },
    {
        id: 12,
        name: "Nimbus Wireless Mouse",
        description: "Ergonomic vertical wireless mouse designed to reduce wrist strain during long work hours.",
        price: "35.00",
        imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
        category: "Discounts",
        specifications: "DPI:800/1200/1600;Battery:Rechargeable 500mAh;Buttons:6 Keys;Connectivity:2.4GHz + BT 5.0;Weight:110g",
        originalPrice: null
    }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { method } = req;
    const path = req.url || '';

    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Products list: GET /api/products
        if (method === 'GET' && (path === '/api/products' || path.startsWith('/api/products?'))) {
            const category = req.query.category as string | undefined;
            const search = req.query.search as string | undefined;

            let filtered = [...PRODUCTS];
            if (category) {
                filtered = filtered.filter(p => p.category === category);
            }
            if (search) {
                filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
            }

            return res.status(200).json(filtered);
        }

        // Single product: GET /api/products/:id
        const productMatch = path.match(/\/api\/products\/(\d+)/);
        if (method === 'GET' && productMatch) {
            const id = parseInt(productMatch[1]);
            const product = PRODUCTS.find(p => p.id === id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json(product);
        }

        return res.status(404).json({ message: 'API route not found' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
