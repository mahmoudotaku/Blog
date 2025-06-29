import { Link, useLocation } from "wouter";
import { Home, Bot, ArrowLeft } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  // Hide navigation on home page for clean card design
  if (location === "/") return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] bg-clip-text text-transparent">
              mahmoudotaku24
            </h1>
          </div>
          <div className="flex space-x-4">
            <Link href="/">
              <button className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                location === "/" 
                  ? "bg-[var(--accent-blue)] text-white" 
                  : "hover:bg-[var(--accent-blue)] hover:text-white text-gray-300"
              }`}>
                <ArrowLeft className="w-4 h-4" />
                <span>العودة للرئيسية</span>
              </button>
            </Link>
            {location !== "/ai-chat" && (
              <Link href="/ai-chat">
                <button className="px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 hover:bg-[var(--accent-purple)] hover:text-white text-gray-300">
                  <Bot className="w-4 h-4" />
                  <span>الذكاء الاصطناعي</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
