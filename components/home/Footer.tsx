import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import ModalLayoutNew from "@/components/modals/ModalLayoutNew"; // Adjust the path as necessary
import MarkdownViewer from "@/components/MarkdownViewer";

function Footer() {
  const { theme } = useTheme();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalFilePath, setModalFilePath] = useState("");
  const [modalSize, setModalSize] = useState<"small" | "medium" | "large">("large");

  const handleOpenModal = (filePath: string) => {
    setModalFilePath(filePath);
    setModalSize("large"); // Ensure large size for markdown content
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalFilePath("");
  };

  return (
    <footer
      className={`py-6 w-full ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-900 to-black text-white"
          : "bg-gradient-to-r from-gray-100 to-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-lg font-bold">SpareChange</h4>
            <p>&copy; {new Date().getFullYear()} SpareChange. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 items-center">
            <button onClick={() => handleOpenModal("/privacypolicy.md")} className="hover:underline">
              Privacy Policy
            </button>
            <button onClick={() => handleOpenModal("/TermsAndConditions.md")} className="hover:underline">
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Markdown Files */}
      <ModalLayoutNew
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        size={modalSize} // Ensure large size for markdown
        closeBehavior="closeOnOutsideClickAndX" // Allow closing by clicking outside or on the X
      >
        <MarkdownViewer filePath={modalFilePath} theme={theme} />
      </ModalLayoutNew>
    </footer>
  );
}

export default Footer;
