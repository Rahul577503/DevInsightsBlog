import { useState } from 'react';
import {remark} from 'remark';
import remarkHtml from 'remark-html';

const MarkdownConverter: React.FC = () => {
  const [markdownInput, setMarkdownInput] = useState<string>('');
  const [htmlOutput, setHtmlOutput] = useState<string>('');

  const convertToHtml = () => {
    remark()
      .use(remarkHtml as any)
      .process(markdownInput || '', (err, file) => { 
        if (err instanceof Error) {
          console.error('Error converting Markdown to HTML:', err);
          return;
        }
        setHtmlOutput(String(file));
      });
  };

  return (
    <div>
      <textarea
        className="border rounded-md p-2 w-full"
        value={markdownInput}
        onChange={(e) => setMarkdownInput(e.target.value)}
        placeholder="Enter Markdown here..."
      />
      <button
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        onClick={convertToHtml}
      >
        Convert to HTML
      </button>
      <div className="mt-4 min-h-10 border border-gray-200 p-2 rounded-md">
        <h3>HTML Output:</h3>
        <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
      </div>
    </div>
  );
};

export default MarkdownConverter;
