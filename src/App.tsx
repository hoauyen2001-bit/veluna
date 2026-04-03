import { useState, useEffect, useCallback } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  ShoppingBag, 
  Truck, 
  RefreshCw, 
  Facebook, 
  Instagram,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types & Data ---

interface Product {
  id: number;
  name: string;
  price: string;
  imageIds: string[];
  fallback: string;
}

const products: Product[] = [
  { 
    id: 1, 
    name: "Seamless", 
    price: "169k/ set 6", 
    imageIds: ["1g30JSCZidAdIOC2hrQD3PLc6crrRicpt"], 
    fallback: "https://images.unsplash.com/photo-1626497748470-0997881496e1?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    id: 2, 
    name: "Lumiere",  
    price: "169k/ set 4", 
    imageIds: ["1ZMEkHrqzI-dsRtfv-BefSXSeKqJfwc25"], 
    fallback: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    id: 3, 
    name: "Auandi",   
    price: "189k/ set 4", 
    imageIds: ["1uoKSyuND4jPvkYIex0jFigiHMMdcP7dy"], 
    fallback: "https://images.unsplash.com/photo-1582533089852-02c3f120480a?auto=format&fit=crop&q=80&w=800" 
  },
];

const getDriveUrl = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ["Bestsellers", "Lookbook", "Our Story", "Contact"];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-4 liquid-glass' : 'py-8 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 flex-1">
            {navLinks.map(link => (
              <a 
                key={link} 
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-[10px] uppercase tracking-[0.3em] text-foreground/80 hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="flex-1 flex justify-center">
            <a href="/" className="font-display text-2xl tracking-tight">
              Veluna<sup className="text-xs">®</sup>
            </a>
          </div>

          {/* Icons */}
          <div className="flex-1 flex justify-end items-center gap-6">
            <button className="text-foreground/80 hover:text-foreground transition-colors">
              <Search size={20} />
            </button>
            <button className="relative text-foreground/80 hover:text-foreground transition-colors">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="font-display text-2xl">Veluna®</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={32} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-4xl font-light hover:text-primary transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto pt-10 border-t border-border">
              <p className="text-sm text-muted-foreground italic mb-4">"Đánh thức vẻ đẹp nội tại."</p>
              <div className="flex gap-6">
                <Facebook size={20} />
                <Instagram size={20} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(160deg, rgba(245, 237, 230, 0.4) 0%, rgba(237, 224, 212, 0.4) 100%), url('${getDriveUrl('1tfW7Uds90dM5nw4rjefp1hxe5lqlaHDd')}')` 
        }}
      />
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-display text-5xl md:text-8xl font-light tracking-tight leading-tight mb-8"
        >
          Vẻ đẹp thăng hoa <br/> từ sự tĩnh lặng.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="font-body text-sm md:text-base text-foreground/80 max-w-lg mx-auto mb-12 leading-relaxed"
        >
          Không cần phô trương để được chú ý. Veluna vỗ về những đường nét nguyên bản bằng lụa mềm và ren dệt thủ công.
        </motion.p>

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
          className="liquid-glass px-10 py-4 rounded-full text-foreground border border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-500 uppercase text-[10px] tracking-[0.3em]"
        >
          Khám phá bộ sưu tập
        </motion.button>
      </div>
    </section>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(getDriveUrl(product.imageIds[0]));

  useEffect(() => {
    if (product.imageIds.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % product.imageIds.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [product.imageIds]);

  useEffect(() => {
    setImgSrc(getDriveUrl(product.imageIds[currentImageIndex]));
  }, [currentImageIndex, product.imageIds]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="group"
    >
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted mb-4">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={imgSrc}
            alt={product.name}
            onError={() => setImgSrc(product.fallback)}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <button className="liquid-glass w-full py-3 rounded-full text-white text-[10px] uppercase tracking-widest font-medium">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-sm uppercase tracking-[0.2em] font-medium mb-1">{product.name}</h3>
        <p className="text-primary font-medium">{product.price}</p>
      </div>
    </motion.div>
  );
};

const Collection = () => {
  return (
    <section id="bestsellers" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-10">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl mb-4"
        >
          The Collection
        </motion.h2>
        <div className="w-12 h-px bg-primary mx-auto" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
        {products.map(product => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

const SizeGuide = () => {
  const sizes = [
    { size: "S", chest: "78 - 82", underChest: "68 - 72", hip: "84 - 88" },
    { size: "M", chest: "83 - 87", underChest: "73 - 77", hip: "89 - 93" },
    { size: "L", chest: "88 - 92", underChest: "78 - 82", hip: "94 - 98" },
    { size: "XL", chest: "93 - 97", underChest: "83 - 87", hip: "99 - 103" },
  ];

  return (
    <section className="py-24 md:py-32 bg-primary/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl mb-4"
          >
            Hướng dẫn chọn size Veluna
          </motion.h2>
          <p className="text-muted-foreground text-sm">Dựa trên số đo hình thể chuẩn của phụ nữ Việt Nam.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto rounded-xl border border-primary/10 liquid-glass"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/10 text-primary uppercase tracking-widest text-[10px] font-display">
                <th className="px-6 py-6 font-medium">Size</th>
                <th className="px-6 py-6 font-medium">Vòng ngực (cm)</th>
                <th className="px-6 py-6 font-medium">Vòng chân ngực (cm)</th>
                <th className="px-6 py-6 font-medium">Vòng mông (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {sizes.map((row) => (
                <tr key={row.size} className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-6 font-display text-lg">{row.size}</td>
                  <td className="px-6 py-6 text-sm text-muted-foreground">{row.chest}</td>
                  <td className="px-6 py-6 text-sm text-muted-foreground">{row.underChest}</td>
                  <td className="px-6 py-6 text-sm text-muted-foreground">{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

const Policies = () => {
  return (
    <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-primary/20 bg-background p-10 text-center flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Truck size={32} strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-2xl mb-3">Miễn phí vận chuyển</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Cho đơn hàng từ 200.000đ trên toàn quốc. Veluna cam kết giao hàng nhanh chóng và bảo mật.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-primary/20 bg-background p-10 text-center flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
            <RefreshCw size={32} strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-2xl mb-3">Đổi trả 7 ngày</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Sản phẩm lỗi hoặc không vừa size — hoàn trả dễ dàng trong vòng 7 ngày kể từ khi nhận hàng.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white/90 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
          {/* Brand Info */}
          <div>
            <h2 className="font-display text-4xl mb-6">Veluna®</h2>
            <p className="italic text-white/60 mb-8 font-display text-lg">"Đánh thức vẻ đẹp nội tại."</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-widest text-white/40">
              <span>Miễn phí ship</span>
              <span>Đổi trả 7 ngày</span>
              <span>May thủ công</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6 font-bold">Shop</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Bestsellers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Gift Cards</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6 font-bold">About</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6 font-bold">Connect</h4>
            <div className="flex gap-4 mb-8">
              <a href="https://www.facebook.com/profile.php?id=61574465485432" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
            <a 
              href="https://www.facebook.com/profile.php?id=61574465485432" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-white text-charcoal px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-primary hover:text-white transition-all duration-500"
            >
              Ghé thăm Facebook <ChevronRight size={14} />
            </a>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-white/30">
          <p>© 2026 Veluna Lingerie. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <Collection />
        <SizeGuide />
        <Policies />
      </main>
      <Footer />
    </div>
  );
}
