import Link from "next/link";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import NavProfileLinks from "../NavProfileLinks";
import ModalLayout from "../ModalLayout";
import { useTheme } from "@/context/ThemeContext";

function CubidStarterFooter() {
  const { theme } = useTheme();

  return (
    <div
      className={`w-full flex justify-center shadow-lg ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="navbar py-2 max-w-6xl w-full">
        <div className="navbar-start">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <Bars3Icon className="h-5 inline-block w-5" />
            </label>
          </div>

          <div className="md:flex-1 flex-none px-2">
            <Link href="/">
              <span className="font-bold text-xl">Cubid Micro App</span>
            </Link>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal custom-menu">
            {/* Additional navigation links can go here */}
          </ul>
        </div>

        <div className="navbar-end hidden lg:flex">
          <NavProfileLinks />
        </div>
      </div>
      <ModalLayout />
    </div>
  );
}

export default CubidStarterFooter;
