"use client";

import { useAuth } from "@TCoin/api/hooks/useAuth";
import CallToAction from "@TCoin/components/home/CallToAction";
import Features from "@TCoin/components/home/Features";
import Hero from "@TCoin/components/home/Hero";
import HowItWorks from "@TCoin/components/home/HowItWorks";
import Testimonials from "@TCoin/components/home/Testimonials";
import SignInModal from "@TCoin/components/modal/SignInModal";
import { useModal } from "@TCoin/contexts/ModalContext";

export default function Home() {
  const { isLoading } = useAuth();
  const { openModal, closeModal } = useModal();

  const handleAuthClick = () => {
    openModal({ content: <SignInModal closeModal={closeModal} extraObject={{ isSignIn: true }} />, size: "large" });
  };

  if (isLoading === null) {
    return <div>Loading...</div>; // Optionally show a spinner or placeholder
  }

  return (
    <div>
      <Hero onAuthClick={handleAuthClick} />
      <Features />
      <HowItWorks onAuthClick={handleAuthClick} />
      <Testimonials />
      <CallToAction onAuthClick={handleAuthClick} />
    </div>
  );
}
