import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { createPageUrl } from "@/lib/urls";
import { Sun, Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function Layout({ children, currentPageName }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navigationItems = [
    { name: "Home", url: createPageUrl("home") },
    { name: "Services", url: createPageUrl("services") },
    { name: "Projects", url: createPageUrl("projects") },
    { name: "Blog", url: createPageUrl("blog") },
    { name: "Faq", url: createPageUrl("faq") },
    { name: "About", url: createPageUrl("about") },
    { name: "Contact", url: createPageUrl("contact") },
  ];

  const isActive = (url) => router.pathname === url;

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }

        .gradient-text {
          background: linear-gradient(135deg, #f97316 0%, #fbbf24 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gradient-text-green {
          background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .solar-gradient { background: linear-gradient(135deg, #f97316 0%, #fbbf24 100%); }
        .hero-gradient { background: linear-gradient(135deg, #0f172a 0%, #1a2f5a 50%, #0f172a 100%); }
        .impact-gradient { background: linear-gradient(135deg, #064e3b 0%, #065f46 50%, #064e3b 100%); }
        .cta-gradient { background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%); }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.08); }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #f97316; border-radius: 3px; }

        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }
      `}</style>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={createPageUrl("home")} className="flex items-center space-x-2">
              <div className="flex items-center justify-center">
                <Image className="w-32 h-12" src={'/logo2.png'} alt={'sses logo'} width={100} height={100} />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(item.url)
                      ? "text-orange-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                Free Quote
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-6 py-4 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.url}
                  className={`block text-sm font-medium ${
                    isActive(item.url)
                      ? "text-orange-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm" className="border-orange-200 text-orange-600">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  Free Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>
      <footer className="bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
                  <Sun className="w-6 h-6 text-slate-900" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">SolarEdge</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                Premium solar energy solutions for homes and businesses.
                Powering a sustainable future, one rooftop at a time.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm tracking-wider uppercase">Services</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><Link href={createPageUrl("Services")} className="hover:text-amber-400 transition-colors">Residential Solar</Link></li>
                <li><Link href={createPageUrl("Services")} className="hover:text-amber-400 transition-colors">Commercial Solar</Link></li>
                <li><Link href={createPageUrl("Services")} className="hover:text-amber-400 transition-colors">Battery Storage</Link></li>
                <li><Link href={createPageUrl("Services")} className="hover:text-amber-400 transition-colors">Maintenance</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm tracking-wider uppercase">Contact</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>(555) 123-4567</li>
                <li>info@solaredge.com</li>
                <li>123 Solar Way<br />Austin, TX 78701</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2026 SolarEdge. All rights reserved.</p>
            <div className="flex gap-6 text-slate-500 text-sm">
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Sitemap</span>
            </div>
          </div>
        </div>
      </footer>
      {/* Floating WhatsApp Button */}
      {/*<div className="fixed bottom-6 right-6 z-40">*/}
      {/*  <Button*/}
      {/*    size="lg"*/}
      {/*    className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300"*/}
      {/*  >*/}
      {/*    <MessageCircle className="w-6 h-6" />*/}
      {/*  </Button>*/}
      {/*</div>*/}
      
      {/*/!* Sticky CTA Bar *!/*/}
      {/*<div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-600 to-yellow-500 p-4 md:hidden z-30">*/}
      {/*  <div className="flex items-center justify-between">*/}
      {/*    <div>*/}
      {/*      <p className="text-white text-sm font-medium">Ready for Solar?</p>*/}
      {/*      <p className="text-orange-100 text-xs">Get free consultation today</p>*/}
      {/*    </div>*/}
      {/*    <Button size="sm" className="bg-white text-orange-600 hover:bg-gray-100">*/}
      {/*      Get Quote*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}