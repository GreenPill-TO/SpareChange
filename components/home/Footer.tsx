import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={`py-6 w-full ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-900 to-black text-white"
          : "bg-gradient-to-r from-gray-100 to-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div>
            <h4 className="text-lg font-bold">SpareChange</h4>
            <p>&copy; {new Date().getFullYear()} SpareChange. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/page_all">
              <div className="hover:underline">
                {theme === "dark" ? "Full Page" : "Full Page"}
              </div>
            </Link>
            <Link href="/privacy">
              <div className="hover:underline">
                {theme === "dark" ? "Privacy Policy" : "Privacy Policy"}
              </div>
            </Link>
            <Link href="/terms">
              <div className="hover:underline">
                {theme === "dark" ? "Terms of Service" : "Terms of Service"}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
