"use client";

import CallToAction from "@TCoin/components/home/CallToAction";
import Features from "@TCoin/components/home/Features";
import Hero from "@TCoin/components/home/Hero";
import HowItWorks from "@TCoin/components/home/HowItWorks";
import Testimonials from "@TCoin/components/home/Testimonials";
import SignInModal from "@TCoin/components/modal/SignInModal";
import { useModal } from "@TCoin/contexts/ModalContext";

export default function Home() {
  const { openModal, closeModal } = useModal();

  const handleAuthClick = () => {
    openModal({ content: <SignInModal closeModal={closeModal} extraObject={{ isSignIn: true }} />, size: "large" });
  };

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
