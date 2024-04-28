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
  if (language === "jsx" || language === "mdx") {
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
    <div className="min-w-[50rem] mx-auto ">
      <BackgroundGradient className="rounded-[22px] p-4 bg-black">
        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(highlightedCode),
            }}
          ></code>
        </pre>
      </BackgroundGradient>
    </div>
  );
};

export default CodeBlock;
