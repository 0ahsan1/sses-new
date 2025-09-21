import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { createPageUrl } from "@/lib/urls";
import { Sun, Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navigationItems = [
    { name: "Home", url: createPageUrl("home") },
    { name: "Services", url: createPageUrl("services") },
    { name: "Projects", url: createPageUrl("projects") },
    { name: "Blog", url: createPageUrl("blog") },
    { name: "FAQ", url: createPageUrl("fAQ") },
    { name: "Contact", url: createPageUrl("contact") },
  ];

  const isActive = (url) => router.pathname === url;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={createPageUrl("home")} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                SolarPak
              </span>
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

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-600 to-yellow-500 p-4 md:hidden z-30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm font-medium">Ready for Solar?</p>
            <p className="text-orange-100 text-xs">Get free consultation today</p>
          </div>
          <Button size="sm" className="bg-white text-orange-600 hover:bg-gray-100">
            Get Quote
          </Button>
        </div>
      </div>
    </div>
  );
}