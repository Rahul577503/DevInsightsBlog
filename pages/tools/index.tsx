import { FiArrowRightCircle } from 'react-icons/fi';
import HtmlConverter from "@/components/HtmlConvert";
import MarkdownConverter from "@/components/MarkdownConvert";

const Home: React.FC = () => {
  return (
    <div className="container  py-20 px-4 mx-auto mt-8 flex flex-col lg:flex-row items-center justify-center">
      <div className="lg:w-1/2 lg:pr-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Markdown to HTML Converter</h1>
        <MarkdownConverter />
      </div>
      <hr className="my-8 lg:hidden" />
      <div className="lg:w-1/2 ">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">HTML to Markdown Converter</h1>
        <HtmlConverter />
      </div>
    </div>
  );
};

export default Home;
