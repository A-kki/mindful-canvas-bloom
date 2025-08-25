import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Assess from "./pages/Assess";
import Journal from "./pages/Journal";

const queryClient = new QueryClient();

// ✅ Flat Navbar Component
const Navbar = () => {
  const location = useLocation();
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/auth", label: "Auth" },
    { path: "/admin", label: "Admin" },
    { path: "/assess", label: "Assess" },
    { path: "/journal", label: "Journal" },
  ];

  return (
    <nav className="bg-gray-100 px-6 py-3 shadow-sm flex gap-6">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`${
            location.pathname === item.path ? "text-blue-600 font-semibold" : "text-gray-700"
          } hover:text-blue-500`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar /> {/* ✅ Navbar Added Here */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />

            {/* New routes */}
            <Route path="/assess" element={<Assess />} />
            <Route path="/journal" element={<Journal />} />

            {/* Keep this last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
