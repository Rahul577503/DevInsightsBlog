import { useState } from 'react';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { VFile } from 'vfile';

const MarkdownConverter: React.FC = () => {
  const [markdownInput, setMarkdownInput] = useState<string>('');
  const [htmlOutput, setHtmlOutput] = useState<string>('');

  const convertToHtml = () => {
    remark()
      .use(remarkHtml as any) // Use remarkHtml as any
      .process(markdownInput || '', (error: Error | null, file: VFile) => { // Adjust callback parameters
        if (error) {
          console.error(error);
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
      <div className="mt-4  min-h-8 border border-gray-200 rounded-md p-2">{htmlOutput}</div>
    </div>
  );
};

export default MarkdownConverter;
