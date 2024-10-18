"use client";

import CallToAction from "@/app/home/CallToAction";
import Features from "@/app/home/Features";
import Hero from "@/app/home/Hero";
import HowItWorks from "@/app/home/HowItWorks";
import Testimonials from "@/app/home/Testimonials";
import SignInModal from "@/components/modal/SignInModal";
import { useModal } from "@/contexts/ModalContext";

export default function Home() {
  const { openModal, closeModal } = useModal();

  const handleAuthClick = () => {
    openModal({ content: <SignInModal closeModal={closeModal} extraObject={{ isSignIn: true }} /> });
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
