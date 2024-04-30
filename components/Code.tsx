import React from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/themes/prism-okaidia.css";
import DOMPurify from "isomorphic-dompurify";
import { BackgroundGradient } from "@/components/ui/background-gradient";

interface CodeBlockProps {
  code: string;
  language: string;
}

const highlight = (code: string, language = "markup") => {
  if (language === "jsx" || language === "md") {
    const grammar = language === "jsx" ? Prism.languages.jsx : Prism.languages.markup;
    return Prism.highlight(code, grammar, language);
  } else if (language === "css") {
    return Prism.highlight(code, Prism.languages.css, "css");
  } else {
    return Prism.highlight(code, Prism.languages[language], language);
  }
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const highlightedCode = highlight(code, language);

  return (

    <BackgroundGradient className="rounded-[22px] w-full p-4 bg-black ">
      <pre className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-red-300">
        <code
          className="inline-block"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(highlightedCode),
          }}
        ></code>
      </pre>
    </BackgroundGradient>
  );
};

export default CodeBlock