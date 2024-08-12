"use client";
import { useEffect, useState } from "react";
import { NavbarUnauthenticated } from "@/components/home/Navbar";
import { NavbarAuthenticated } from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import Footer from "@/components/home/Footer";
import ModalLayoutNew from "@/components/modals/ModalLayoutNew";
import SignInModal from "@/components/modals/SignInModal";
import { useTheme } from "@/context/ThemeContext";
import { getSupabaseClient } from "@/utils/supabase/client"; // Use the getSupabaseClient function

const supabase = getSupabaseClient(); // Get the Supabase client

export default function HomePage() {
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

  const handleLogoutClick = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return (
    <div className={`w-full min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {isAuthenticated ? (
        <NavbarAuthenticated onLogoutClick={handleLogoutClick} onAuthClick={function (): void {
          throw new Error("Function not implemented.");
        } } />
      ) : (
        <NavbarUnauthenticated onAuthClick={handleAuthClick} onLogoutClick={function (): void {
            throw new Error("Function not implemented.");
          } } />
      )}
      <Hero onAuthClick={handleAuthClick} isAuthenticated={isAuthenticated} />
      <Features />
      <HowItWorks onAuthClick={handleAuthClick} isAuthenticated={isAuthenticated} />
      <Testimonials />
      <CallToAction onAuthClick={handleAuthClick} isAuthenticated={isAuthenticated} />
      <Footer />
      <ModalLayoutNew isOpen={isAuthModalOpen} onClose={handleCloseModal} size="large">
        <SignInModal closeModal={handleCloseModal} extraObject={{ isSignIn: true }} />
      </ModalLayoutNew>
    </div>
  );
}
