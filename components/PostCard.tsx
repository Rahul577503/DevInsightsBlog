import React from "react";
import { FiArrowRight } from 'react-icons/fi';

interface FrontMatter {
  title: string;
  description: string;
  date: string;
  readTime?: number;
}

interface Post {
  frontMatter: FrontMatter;
  slug: string;
}

interface PostProps {
  post: Post;
}

const PostCard =({ post }: PostProps)=> {
  return (
    <div className="rounded-md  transition-all hover:shadow-sm hover-scale:100 cursor-pointer">
      <div className="p-2">
        <h2 className="font-semibold text-xl lg:text-3xl">{post.frontMatter.title}</h2>
        <div className="flex flex-row space-x-4 items-center mt-2">
          <h2 className="text-blue-500">📅 {post.frontMatter.date}</h2>
          {post.frontMatter.readTime !== undefined && (
            <p className="text-blue-500">⏰ {post.frontMatter.readTime} min read</p>
          )}
        </div>
        <div className="flex items-center mt-2">
          <span className="">Read post</span>
          <FiArrowRight className="ml-1 text-green-700 transition-transform transform hover:scale-110" />
        </div>
      </div>
    </div>
  );
}
export default PostCard