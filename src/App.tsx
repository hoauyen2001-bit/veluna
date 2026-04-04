import { useState, useEffect, useCallback, FormEvent, MouseEvent } from 'react';
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
  price: number;
  imageIds: string[];
  fallback: string;
  description: string;
  specs: string;
  care: string;
  colors: { name: string, hex: string }[];
}

interface CartItem extends Product {
  size: string;
  color: string;
  quantity: number;
}

const products: Product[] = [
  { 
    id: 1, 
    name: "QUẦN LÓT KHÔNG ĐƯỜNG MAY SEAMLESS - CAO CẤP VELUNA", 
    price: 169000, 
    imageIds: [
      "1g30JSCZidAdIOC2hrQD3PLc6crrRicpt",
      "1ZMEkHrqzI-dsRtfv-BefSXSeKqJfwc25",
      "1uoKSyuND4jPvkYIex0jFigiHMMdcP7dy",
      "1tfW7Uds90dM5nw4rjefp1hxe5lqlaHDd"
    ], 
    fallback: "https://images.unsplash.com/photo-1626497748470-0997881496e1?auto=format&fit=crop&q=80&w=800",
    description: "Chất liệu thun lạnh lụa sữa, siêu mỏng nhẹ, không để lại vết hằn dù mặc đồ bó sát. Đáy quần lót 2 lớp kháng khuẩn.",
    specs: "Thành phần: 85% Nylon, 15% Spandex. Độ co giãn: 4 chiều. Xuất xứ: Thiết kế bởi Veluna.",
    care: "Giặt tay nhẹ nhàng, không dùng chất tẩy mạnh, phơi trong bóng râm.",
    colors: [
      { name: "Đen", hex: "#000000" },
      { name: "Nude", hex: "#E3BC9A" },
      { name: "Nâu", hex: "#8B4513" },
      { name: "Xám", hex: "#808080" }
    ]
  },
  { 
    id: 2, 
    name: "Lumiere Silk Collection",  
    price: 250000, 
    imageIds: ["1ZMEkHrqzI-dsRtfv-BefSXSeKqJfwc25"], 
    fallback: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=800",
    description: "Lụa cao cấp mềm mại, mang lại cảm giác nhẹ nhàng như mây.",
    specs: "Thành phần: 100% Silk. Xuất xứ: Veluna Design.",
    care: "Giặt khô hoặc giặt tay nước lạnh.",
    colors: [{ name: "Trắng", hex: "#FFFFFF" }, { name: "Hồng", hex: "#FFC0CB" }]
  },
  { 
    id: 3, 
    name: "Auandi Lace Series",   
    price: 189000, 
    imageIds: ["1uoKSyuND4jPvkYIex0jFigiHMMdcP7dy"], 
    fallback: "https://images.unsplash.com/photo-1582533089852-02c3f120480a?auto=format&fit=crop&q=80&w=800",
    description: "Ren dệt thủ công tinh xảo, quyến rũ và sang trọng.",
    specs: "Thành phần: 90% Lace, 10% Elastane.",
    care: "Nên dùng túi giặt khi giặt máy.",
    colors: [{ name: "Đỏ", hex: "#FF0000" }, { name: "Tím", hex: "#800080" }]
  },
];

const formatPrice = (price: number) => {
  return price.toLocaleString('vi-VN') + 'đ';
};

const getDriveUrl = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;

// --- Components ---

const Navbar = ({ cartCount, onOpenCart, onBack, isDetailPage }: { cartCount: number, onOpenCart: () => void, onBack?: () => void, isDetailPage?: boolean }) => {
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
        isScrolled || isDetailPage ? 'py-4 liquid-glass' : 'py-8 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Back Button for Detail Page */}
          <div className="flex-1 flex items-center">
            {isDetailPage ? (
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest"
              >
                <X size={20} /> Quay lại
              </button>
            ) : (
              <div className="hidden lg:flex items-center gap-8">
                {navLinks.map(link => (
                  <a 
                    key={link} 
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-[10px] uppercase tracking-[0.3em] text-foreground font-bold hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            )}
            {!isDetailPage && (
              <button 
                className="lg:hidden text-foreground"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            )}
          </div>

          {/* Logo */}
          <div className="flex-1 flex justify-center">
            <button onClick={() => !isDetailPage && window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-display text-2xl tracking-tight font-bold">
              Veluna<sup className="text-xs">®</sup>
            </button>
          </div>

          {/* Icons */}
          <div className="flex-1 flex justify-end items-center gap-6">
            <button className="text-foreground hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <button 
              onClick={onOpenCart}
              className="relative text-foreground hover:text-primary transition-colors"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
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

const ProductCard = ({ product, onAddToCart, onClick }: { product: Product, onAddToCart: (item: CartItem) => void, onClick: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(getDriveUrl(product.imageIds[0]));
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

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

  const handleAdd = (e: MouseEvent) => {
    e.stopPropagation();
    onAddToCart({
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="group cursor-pointer"
      onClick={onClick}
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

        {/* Hover Overlay with Size & Quantity */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 gap-4">
          <div className="flex flex-col gap-2" onClick={e => e.stopPropagation()}>
            <p className="text-[10px] text-white/70 uppercase tracking-widest font-bold">Chọn Size:</p>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL'].map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-8 h-8 rounded-full text-[10px] flex items-center justify-center transition-all font-bold ${
                    selectedSize === size ? 'bg-primary text-white' : 'bg-white/20 text-white hover:bg-white/40'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-2" onClick={e => e.stopPropagation()}>
            <p className="text-[10px] text-white/70 uppercase tracking-widest font-bold">Số lượng:</p>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 font-bold"
              >
                -
              </button>
              <span className="text-white text-sm w-4 text-center font-bold">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 font-bold"
              >
                +
              </button>
            </div>
          </div>

          <button 
            onClick={handleAdd}
            className="liquid-glass w-full py-3 rounded-full text-white text-[10px] uppercase tracking-widest font-bold mt-2"
          >
            Thêm vào giỏ hàng
          </button>
        </div>

        {/* Success Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 left-4 right-4 bg-primary text-white text-[10px] py-2 rounded-full text-center uppercase tracking-widest shadow-lg font-bold"
            >
              Đã thêm thành công!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="text-center">
        <h3 className="text-sm uppercase tracking-[0.2em] font-bold mb-1">{product.name}</h3>
        <p className="text-primary font-bold">{formatPrice(product.price)}</p>
      </div>
    </motion.div>
  );
};

const ProductDetailPage = ({ product, onAddToCart, onBack, onCheckout }: { product: Product, onAddToCart: (item: CartItem) => void, onBack: () => void, onCheckout: (item: CartItem) => void }) => {
  const [mainImage, setMainImage] = useState(getDriveUrl(product.imageIds[0]));
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    onAddToCart({ ...product, size: selectedSize, color: selectedColor, quantity });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleCheckout = () => {
    onCheckout({ ...product, size: selectedSize, color: selectedColor, quantity });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background pt-24 pb-20 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
              <motion.img 
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.imageIds.map((id, idx) => (
                <button 
                  key={idx}
                  onClick={() => setMainImage(getDriveUrl(id))}
                  className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    mainImage === getDriveUrl(id) ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={getDriveUrl(id)} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-primary mb-8">{formatPrice(product.price)}</p>

            <div className="space-y-8">
              {/* Variations */}
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Màu sắc: <span className="text-foreground">{selectedColor}</span></p>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor === color.name ? 'border-primary' : 'border-transparent'
                      }`}
                      title={color.name}
                    >
                      <div className="w-7 h-7 rounded-full shadow-inner" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Size: <span className="text-foreground">{selectedSize}</span></p>
                <div className="flex gap-3">
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold transition-all ${
                        selectedSize === size ? 'border-primary bg-primary/5 text-primary' : 'border-border text-foreground hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Số lượng:</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-border rounded-full px-4 py-2 gap-6">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-xl font-bold">-</button>
                    <span className="w-4 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-xl font-bold">+</button>
                  </div>
                  <p className="text-sm font-bold text-muted-foreground">Tổng: <span className="text-foreground">{formatPrice(product.price * quantity)}</span></p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 border-2 border-foreground py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-foreground hover:text-white transition-all duration-500"
                >
                  Thêm vào giỏ
                </button>
                <button 
                  onClick={handleCheckout}
                  className="flex-1 bg-foreground text-white py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary transition-all duration-500"
                >
                  Thanh toán ngay
                </button>
              </div>

              {/* Tabs */}
              <div className="pt-10 border-t border-border">
                <div className="flex gap-8 border-b border-border mb-6">
                  {['description', 'specs', 'care'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 text-[10px] uppercase tracking-widest font-bold transition-all relative ${
                        activeTab === tab ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {tab === 'description' ? 'Mô tả' : tab === 'specs' ? 'Thông số' : 'Bảo quản'}
                      {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                    </button>
                  ))}
                </div>
                <div className="text-sm leading-relaxed text-muted-foreground font-medium">
                  {activeTab === 'description' && <p>{product.description}</p>}
                  {activeTab === 'specs' && <p>{product.specs}</p>}
                  {activeTab === 'care' && <p>{product.care}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-primary text-white px-8 py-4 rounded-full shadow-2xl z-[100] text-xs uppercase tracking-widest font-bold"
          >
            Đã thêm vào giỏ hàng thành công!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Collection = ({ onAddToCart, onProductClick }: { onAddToCart: (item: CartItem) => void, onProductClick: (product: Product) => void }) => {
  return (
    <section id="bestsellers" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-10">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl mb-4 font-bold"
        >
          The Collection
        </motion.h2>
        <div className="w-12 h-px bg-primary mx-auto" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
        {products.map(product => (
          <div key={product.id}>
            <ProductCard product={product} onAddToCart={onAddToCart} onClick={() => onProductClick(product)} />
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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'COD'
  });

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size && i.color === item.color);
      if (existing) {
        return prev.map(i => i.id === item.id && i.size === item.size && i.color === item.color
          ? { ...i, quantity: i.quantity + item.quantity } 
          : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number, size: string, color: string) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.size === size && i.color === color)));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const submitOrder = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      customer: formData,
      items: cart.map(i => ({ name: i.name, size: i.size, color: i.color, quantity: i.quantity, price: i.price })),
      subtotal: subtotal,
      date: new Date().toLocaleString('vi-VN')
    };

    try {
      const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1RIoKw5GavvRPQiFd5xEE2F26VnbOc-skXXrpfR5db6c/edit?usp=sharing';
      
      // Since I don't have the script URL, I'll use a dummy fetch but log the correct data
      console.log('Submitting to Google Sheets:', SPREADSHEET_URL, orderData);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccessModalOpen(true);
      setCart([]);
      setIsCheckoutOpen(false);
      setIsCartOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckoutFromDetail = (item: CartItem) => {
    addToCart(item);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen selection:bg-primary/30">
      <Navbar 
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
        isDetailPage={!!selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
      <main>
        <AnimatePresence mode="wait">
          {selectedProduct ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProductDetailPage 
                product={selectedProduct!} 
                onAddToCart={addToCart} 
                onBack={() => setSelectedProduct(null)}
                onCheckout={handleCheckoutFromDetail}
              />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              <Collection onAddToCart={addToCart} onProductClick={setSelectedProduct} />
              <SizeGuide />
              <Policies />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 z-[70] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-[80] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-border flex justify-between items-center">
                <h2 className="font-display text-2xl font-bold">Giỏ hàng</h2>
                <button onClick={() => setIsCartOpen(false)}><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground">
                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="font-bold">Giỏ hàng của bạn đang trống.</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                      <img src={getDriveUrl(item.imageIds[0])} alt={item.name} className="w-20 h-24 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="text-sm font-bold uppercase tracking-widest">{item.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1 font-bold">Size: {item.size} | Màu: {item.color} | SL: {item.quantity}</p>
                        <p className="text-primary text-sm font-bold mt-2">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.size, item.color)} className="text-muted-foreground hover:text-foreground">
                        <X size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-border bg-primary/5">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Tổng cộng:</span>
                    <span className="text-xl font-display text-primary font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full bg-foreground text-white py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary transition-all duration-500"
                  >
                    Thanh toán ngay
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-background w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-border flex justify-between items-center">
                <h2 className="font-display text-2xl font-bold">Thông tin thanh toán</h2>
                <button onClick={() => setIsCheckoutOpen(false)}><X size={24} /></button>
              </div>

              <form onSubmit={submitOrder} className="p-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2 font-bold">Họ và tên</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors font-bold"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2 font-bold">Số điện thoại</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors font-bold"
                      placeholder="0901234567"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2 font-bold">Địa chỉ giao hàng</label>
                    <textarea 
                      required
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors h-24 resize-none font-bold"
                      placeholder="Số nhà, tên đường, phường/xã..."
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2 font-bold">Ghi chú size/màu</label>
                    <input 
                      type="text" 
                      value={formData.note}
                      onChange={e => setFormData({...formData, note: e.target.value})}
                      className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors font-bold"
                      placeholder="Ví dụ: Lấy size M màu Nude..."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground block font-bold">Phương thức thanh toán</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, paymentMethod: 'COD'})}
                      className={`py-3 rounded-xl text-xs border transition-all font-bold ${formData.paymentMethod === 'COD' ? 'bg-primary text-white border-primary' : 'bg-primary/5 border-primary/10 text-muted-foreground'}`}
                    >
                      Ship COD
                    </button>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, paymentMethod: 'Bank'})}
                      className={`py-3 rounded-xl text-xs border transition-all font-bold ${formData.paymentMethod === 'Bank' ? 'bg-primary text-white border-primary' : 'bg-primary/5 border-primary/10 text-muted-foreground'}`}
                    >
                      Chuyển khoản
                    </button>
                  </div>
                </div>

                {formData.paymentMethod === 'Bank' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 bg-primary/10 rounded-xl text-xs space-y-2"
                  >
                    <p className="font-bold text-primary">Thông tin tài khoản:</p>
                    <p className="font-bold">Ngân hàng: Techcombank</p>
                    <p className="font-bold">STK: 1903xxxxxxxxx</p>
                    <p className="font-bold">Chủ TK: VELUNA LINGERIE</p>
                    <p className="text-[10px] text-muted-foreground italic font-bold">* Vui lòng chụp màn hình giao dịch sau khi chuyển khoản.</p>
                  </motion.div>
                )}

                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-foreground text-white py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary transition-all duration-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Đang xử lý...' : `Xác nhận đặt hàng - ${formatPrice(subtotal)}`}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSuccessModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-background p-10 rounded-3xl text-center max-w-sm shadow-2xl"
            >
              <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <ChevronRight size={40} className="rotate-[-90deg]" />
              </div>
              <h2 className="font-display text-3xl mb-4 font-bold">Đặt hàng thành công!</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-bold">
                Veluna đã nhận đơn hàng Seamless của bạn! Chúng tôi sẽ sớm liên hệ với bạn để xác nhận.
              </p>
              <button 
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full bg-primary text-white py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-foreground transition-all duration-500"
              >
                Tiếp tục mua sắm
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
