// components/MarkdownViewer.tsx
import "highlight.js/styles/github.css";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

type MarkdownViewerProps = {
  filePath: string;
};

export const MarkdownViewer = ({ filePath }: MarkdownViewerProps) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      const response = await fetch(filePath);
      const text = await response.text();
      setContent(text);
    };

    fetchMarkdown();
  }, [filePath]);

  return (
    <div className={`prose mx-auto p-4 rounded dark:bg-black dark:text-white bg-white text-black`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          h1: (props) => <h1 {...props} className={`dark:text-white dark:font-bold text-black`} />,
          h2: (props) => <h2 {...props} className={`dark:text-white dark:font-semibold text-black`} />,
          h3: (props) => <h3 {...props} className={`dark:text-white dark:font-semibold text-black`} />,
          // Add similar customizations for other heading levels if needed
          a: (props) => <a {...props} className={`dark:text-blue-400 dark:underline text-blue-600`} />,
          strong: (props) => <strong {...props} className={`dark:text-white dark:font-bold font-bold`} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
