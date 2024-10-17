import { MarkdownViewer } from "@/components/markdown-viewer";
import { useModal } from "@/contexts/ModalContext";
import classNames from "classnames";

export function Footer() {
  const { openModal } = useModal();

  const handleOpenModal = (filePath: string) => {
    openModal({ content: <MarkdownViewer filePath={filePath} />, size: "large" });
  };

  return (
    <footer
      className={classNames(
        "py-6 w-full",
        "dark:bg-gradient-to-r dark:from-gray-900 dark:to-black dark:text-white",
        "bg-gradient-to-r from-gray-100 to-white text-black",
        "shadow-top"
      )}
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
    </footer>
  );
}
