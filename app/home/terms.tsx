// /home/terms.tsx
"use client";
import Navbar from "@/components/home/Navbar";
import MarkdownViewer from "@/components/MarkdownViewer";

const TermsAndConditions = () => {
  // Dummy onAuthClick function
  const onAuthClick = () => {
    console.log("Auth button clicked");
  };

  return (
    <div className="bg-gray-900">
      <Navbar onAuthClick={onAuthClick} />
      <div className="max-w-4xl mx-auto mt-8 p-4 min-h-screen">
        <MarkdownViewer filePath="/TermsAndConditions.md" />
      </div>
    </div>
  );
};

export default TermsAndConditions;
