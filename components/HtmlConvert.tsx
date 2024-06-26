import { useState } from 'react';
import {remark} from 'remark';
import remarkHtml from 'remark-html';

const HtmlConverter: React.FC = () => {
  const [htmlInput, setHtmlInput] = useState<string>('');
  const [markdownOutput, setMarkdownOutput] = useState<string>('');

  const convertToMarkdown = () => {
    remark()
      .use(remarkHtml, { sanitize: false })
      .process(htmlInput || '', (err, file) => {
        if (err) {
          console.error('Error converting HTML to Markdown:', err);
          return;
        }
        setMarkdownOutput(String(file));
      });
  };

  return (
    <div>
      <textarea
        className="border rounded-md p-2 w-full"
        value={htmlInput}
        onChange={(e) => setHtmlInput(e.target.value)}
        placeholder="Enter HTML here..."
      />
      <button
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        onClick={convertToMarkdown}
      >
        Convert to Markdown
      </button>
      <div className="mt-4 min-h-10 p-2 border border-gray-200 rounded-md">
        <h3>Markdown Output:</h3>
        <pre>{markdownOutput}</pre>
      </div>
    </div>
  );
};

export default HtmlConverter;
