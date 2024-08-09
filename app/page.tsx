// app/home/page.tsx
"use client";
import { useState } from "react";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import Footer from "@/components/Footer";
import CubidStarterHeader from "@/components/home/CubidStarterHeader";
import Modal from "@/components/home/Modal";
import Auth from "@/components/home/Auth";
import { useTheme } from "@/context/ThemeContext"; // Import useTheme from ThemeContext

export default function Home() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const { theme } = useTheme(); // Use theme from context

  const handleAuthClick = () => {
    setAuthModalOpen(true);
  };

  const handleCloseModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
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
