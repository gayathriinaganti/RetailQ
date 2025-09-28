import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";

// Import auth components
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";

// Import layout components
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { ChatWidget } from "@/components/ChatWidget";

// Import pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Compare from "./pages/Compare";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/*" element={
                <ProtectedRoute>
                  <SidebarProvider>
                    <div className="min-h-screen flex w-full bg-background">
                      <AppSidebar />
                      
                      <main className="flex-1 flex flex-col">
                        <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
                        
                        <div className="flex-1 overflow-auto">
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/customers" element={<Customers />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/compare" element={<Compare />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </div>
                      </main>

                      <ChatWidget />
                    </div>
                  </SidebarProvider>
                </ProtectedRoute>
              } />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;