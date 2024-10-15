import { useAuth } from "@TCoin/api/hooks/useAuth";
import { useModal } from "@TCoin/contexts/ModalContext";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ThemeToggleButton } from "../button";
import SignInModal from "../modal/SignInModal";
import NavLink from "./NavLink";

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
    return (
      <div
        className={classNames(
          "bg-el-3 dark:bg-el-3-dark",
          "hover:bg-el-3/70 hover:dark:bg-el-3-dark/70",
          "px-4 py-2 rounded-lg",
          "text-sm font-semibold text-primary dark:text-primary-dark",
          "cursor-pointer",
          "flex items-center"
        )}
      >
        {isAuthenticated ? (
          <button onClick={() => signOut()} className="focus:outline-none">
            <img src="/images/user-profile.png" alt="User Icon" className="w-6 h-6 rounded-full" />
          </button>
        ) : (
          <button
            onClick={onAuth}
            className={classNames(
              "px-4 py-2 rounded-lg shadow-md focus:outline-none",
              "dark:bg-blue-500 dark:text-white dark:hover:bg-blue-700 bg-blue-500 text-white hover:bg-blue-700"
            )}
          >
            Authenticate
          </button>
        )}
      </div>
    );
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
      className={`shadow w-full z-20 fixed top-0 transition-transform duration-300 dark:bg-gray-900 dark:text-white bg-white text-gray-900 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
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
