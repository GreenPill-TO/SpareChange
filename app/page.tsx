"use client";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import Footer from "@/components/home/Footer";
import CubidStarterHeader from "@/components/home/CubidStarterFooter";
import Modal from "@/components/home/Modal";
import { useTheme } from "@/context/ThemeContext";
import { createClient } from "@supabase/supabase-js";

// Dynamic import of the Auth component with SSR disabled
const Auth = dynamic(() => import('@/components/home/Auth'), { ssr: false });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HomeOrDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth().catch(console.error);
  }, []);

  const handleAuthClick = () => {
    setAuthModalOpen(true);
  };

  const handleCloseModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <div className={`w-full min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Navbar onAuthClick={handleAuthClick} />
      <Hero onAuthClick={handleAuthClick} />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CallToAction onAuthClick={handleAuthClick} />
      <Footer />
      <CubidStarterHeader />
      <Modal isOpen={isAuthModalOpen} onClose={handleCloseModal}>
        <Auth />
      </Modal>
    </div>
  );
}
