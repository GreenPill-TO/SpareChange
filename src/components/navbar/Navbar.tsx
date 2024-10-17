import { useAuth } from "@/api/hooks/useAuth";
import { useModal } from "@/contexts/ModalContext";
import { cn } from "@/lib/classnames";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import SignInModal from "../modal/SignInModal";
import { Avatar, AvatarImage } from "../ui/Avatar";
import { Button } from "../ui/Button";
import NavLink from "./NavLink";
import { ThemeToggleButton } from "./ThemeToggleButton";

export default function Navbar() {
  const { openModal, closeModal } = useModal();
  const { isAuthenticated, signOut } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const pathname = usePathname();

  const onAuth = () => {
    openModal({ content: <SignInModal closeModal={closeModal} extraObject={{ isSignIn: true }} />, size: "large" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY <= lastScrollY.current || scrollY <= 50);
      lastScrollY.current = scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinksProtected = useMemo(() => {
    if (!isAuthenticated) return null;

    return (
      <>
        <NavLink link="/dashboard" title="Dashboard" optionalClass="hover:text-blue-500" />
      </>
    );
  }, [isAuthenticated]);

  const Account = () => {
    if (isAuthenticated)
      return (
        <Avatar onClick={() => signOut()}>
          <AvatarImage src={"https://github.com/shadcn.png"} />
        </Avatar>
      );
    return <Button onClick={onAuth}>Authenticate</Button>;
  };

  const homePageLinks = useMemo(() => {
    if (pathname === "/")
      return (
        <>
          <a href="#features" onClick={(e) => handleSmoothScroll(e, "features")} className="hover:text-blue-500">
            Features
          </a>
          <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, "how-it-works")} className="hover:text-blue-500">
            How It Works
          </a>
          <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, "testimonials")} className="hover:text-blue-500">
            Testimonials
          </a>
        </>
      );
    return null;
  }, [pathname]);

  return (
    <nav
      className={cn(
        "shadow w-full z-20 fixed top-0",
        "bg-background",
        "transition-transform duration-300",
        { "translate-y-0": isVisible },
        { "-translate-y-full": !isVisible }
      )}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center max-w-7xl mx-auto">
          <NavLink link="/" title="SpareChange" optionalClass="text-2xl font-bold" />
          <div className="hidden sm:flex sm:items-center sm:space-x-8 mx-auto">
            {homePageLinks}
            {isAuthenticated && navLinksProtected}
          </div>
          <div className="flex items-center">
            <ThemeToggleButton />
            <div className="relative">
              <Account />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
