/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Search, Menu, X, Facebook, Instagram, ArrowRight } from "lucide-react";

const getDriveUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

const products = [
  {
    id: 1,
    name: "Seamless",
    price: "169k/ set 6",
    imageIds: [
      "1g30JSCZidAdIOC2hrQD3PLc6crrRicpt",
      "1n1hOGAA7d4w-rvoHCyIkcFfyJZg1UO-F",
      "1Zt5A0CG6176ab7GEifE8gaX-KkqP0ANc"
    ],
    fallback: "https://images.unsplash.com/photo-1594235412411-298881ba326c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Lumiere",
    price: "169k/ set 4",
    imageIds: [
      "1ZMEkHrqzI-dsRtfv-BefSXSeKqJfwc25",
      "1EE_xx9pGqc6GcKAikmockqGnkb3vQ0gq",
      "17kOqjOs5HgdRDkOcFnl-7IdB1UO96DXO"
    ],
    fallback: "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Auandi",
    price: "189k/ set 4",
    imageIds: [
      "1NNLgSpdcelz0SCr0sOfKkk5tt-K8EtXl",
      "1m5ZXuhmI5SjNDlZNgthTur8sj5cL49vb",
      "1uoKSyuND4jPvkYIex0jFigiHMMdcP7dy"
    ],
    fallback: "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=1000&auto=format&fit=crop"
  }
];

function ProductCard({ product, idx }: any) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.imageIds.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [product.imageIds.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.2 }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-background">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImageIndex}
            src={getDriveUrl(product.imageIds[currentImageIndex])}
            alt={product.name}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            onError={(e) => {
              (e.target as HTMLImageElement).src = product.fallback;
            }}
          />
        </AnimatePresence>
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 flex items-end justify-center bg-black/20 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button className="liquid-glass w-full rounded-full py-3 text-[10px] uppercase tracking-widest text-white hover:bg-white/10">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-sm font-light uppercase tracking-widest">{product.name}</h3>
        <p className="mt-2 text-primary font-medium">{product.price}</p>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white">
      {/* NAVIGATION */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? "py-4 liquid-glass" : "py-8 bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          <button
            className="text-foreground md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <div className="hidden gap-8 md:flex">
            {["Bestsellers", "Lookbook", "Our Story", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] font-light uppercase tracking-[0.3em] transition-colors hover:text-primary"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 transform">
            <h1 className="font-display text-2xl tracking-[0.15em] text-foreground md:text-3xl">
              Veluna<sup className="text-[10px] ml-0.5">®</sup>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="transition-colors hover:text-primary">
              <Search className="h-5 w-5 stroke-[1.5px]" />
            </button>
            <button className="relative transition-colors hover:text-primary">
              <ShoppingBag className="h-5 w-5 stroke-[1.5px]" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary text-[8px] text-background">
                0
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-[90] flex flex-col bg-background/95 p-10 pt-32 backdrop-blur-xl md:hidden"
          >
            {["Bestsellers", "Lookbook", "Our Story", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="mb-8 font-display text-4xl text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO */}
      <section className="relative flex h-screen w-full items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={getDriveUrl("1tfW7Uds90dM5nw4rjefp1hxe5lqlaHDd")}
            alt="Hero"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 px-6 md:px-20 lg:px-32 text-left">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-display text-5xl leading-tight tracking-tight text-white sm:text-7xl md:text-8xl"
          >
            Vẻ đẹp thăng hoa <br /> từ sự tĩnh lặng.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-8 max-w-2xl text-sm font-light leading-relaxed tracking-wide text-white/80 sm:text-base"
          >
            Không cần phô trương để được chú ý. Veluna vỗ về những đường nét nguyên bản bằng lụa mềm và ren dệt thủ công.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12"
          >
            <button className="liquid-glass group relative overflow-hidden rounded-full px-12 py-4 text-xs uppercase tracking-[0.3em] text-white transition-all hover:scale-105 border border-white">
              <span className="relative z-10">Chạm vào sự tinh khiết</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: COLLECTION GRID */}
      <section className="px-6 py-32 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl"
            >
              The Collection
            </motion.h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, idx) => (
              <ProductCard key={product.id} product={product} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: SIZE GUIDE */}
      <section className="px-6 py-32 md:px-10 bg-charcoal/30">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl"
            >
              Hướng dẫn chọn size Veluna
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-sm font-light text-muted-foreground"
            >
              Dựa trên số đo hình thể chuẩn của phụ nữ Việt Nam.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="overflow-x-auto rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm"
          >
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-primary/20 bg-primary/5">
                  <th className="px-6 py-4 font-display text-primary uppercase tracking-widest">Size</th>
                  <th className="px-6 py-4 font-display text-primary uppercase tracking-widest">Vòng ngực (cm)</th>
                  <th className="px-6 py-4 font-display text-primary uppercase tracking-widest">Vòng chân ngực (cm)</th>
                  <th className="px-6 py-4 font-display text-primary uppercase tracking-widest">Vòng mông (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {[
                  { size: "S", bust: "78 - 82", underbust: "68 - 72", hips: "84 - 88" },
                  { size: "M", bust: "83 - 87", underbust: "73 - 77", hips: "89 - 93" },
                  { size: "L", bust: "88 - 92", underbust: "78 - 82", hips: "94 - 98" },
                  { size: "XL", bust: "93 - 97", underbust: "83 - 87", hips: "99 - 103" },
                ].map((row) => (
                  <tr key={row.size} className="transition-colors hover:bg-white/5">
                    <td className="px-6 py-4 font-medium text-primary">{row.size}</td>
                    <td className="px-6 py-4 font-light">{row.bust}</td>
                    <td className="px-6 py-4 font-light">{row.underbust}</td>
                    <td className="px-6 py-4 font-light">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: FOOTER */}
      <footer className="bg-charcoal px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 md:grid-cols-3 md:items-start">
            {/* Left: Logo */}
            <div className="text-center md:text-left">
              <h2 className="font-display text-4xl tracking-wide">Veluna<sup className="text-xs ml-0.5">®</sup></h2>
              <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground italic">
                "Veluna® — Đánh thức vẻ đẹp nội tại."
              </p>
              <div className="mt-8 space-y-2 text-xs font-light text-muted-foreground">
                <p>Miễn phí vận chuyển cho đơn hàng từ 1.000.000đ.</p>
                <p>Đổi trả dễ dàng trong vòng 7 ngày.</p>
                <p>Sản phẩm may thủ công tỉ mỉ từng chi tiết.</p>
              </div>
            </div>

            {/* Center: Quick Links */}
            <div className="flex flex-col items-center gap-4 text-center">
              <h3 className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Policies</h3>
              {["Chính sách đổi trả (7 ngày)", "Chính sách vận chuyển"].map((link) => (
                <a key={link} href="#" className="text-sm font-light text-muted-foreground transition-colors hover:text-primary">
                  {link}
                </a>
              ))}
            </div>

            {/* Right: Social */}
            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex gap-6">
                <a href="#" className="transition-colors hover:text-primary">
                  <Instagram className="h-6 w-6 stroke-[1.5px]" />
                </a>
                <a href="#" className="transition-colors hover:text-primary">
                  <Facebook className="h-6 w-6 stroke-[1.5px]" />
                </a>
              </div>
              <a
                href="https://www.facebook.com/profile.php?id=61574465485432"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass flex items-center justify-center gap-3 rounded-full px-10 py-4 text-[10px] uppercase tracking-widest text-white transition-all hover:bg-white/10 border border-white/20"
              >
                Theo dõi chúng tôi trên Facebook
              </a>
            </div>
          </div>

          <div className="mt-24 border-t border-white/5 pt-10 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
            <p>© 2026 Veluna Lingerie. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
