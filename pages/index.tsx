import React, { useState } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import PostCard from "../components/PostCard";
import { TypewriterEffect } from "@/components/ui/typewrite-effect";
import Newsletter from "@/components/Newsletter";
import { Spotlight } from "@/components/ui/Spotlight";
import Pagination from "@/components/ui/Pagination";

interface FrontMatter {
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  readTime?: number;
}

interface Post {
  frontMatter: FrontMatter;
  slug: string;
}

interface HomeProps {
  posts: Post[];
}

const words = [
  {
    text: "Welcome",
  },
  {
    text: "To",
  },
  {
    text: "DevInsightsBlog",
    className:
      "text-blue-500  sm:text-xl md:text-2xl lg:text-3xl font-bold text-center ",
  },
];

export default function Home(props: HomeProps): JSX.Element {
  const perPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPosts = props.posts.length;
  const totalPages = Math.ceil(totalPosts / perPage);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  const currentPosts = props.posts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const isDarkMode = true;

  return (
    <div className="min-h-screen w-full rounded-md flex flex-col relative top-20 overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-2"
        fill={isDarkMode ? "blue" : "blue"}
      />

      <div className="w-full lg:max-w-[50rem] mx-auto  px-4">
        <div className="">
          <TypewriterEffect words={words} />
          <h1 className="text-2xl text-center">A software Development Blog</h1>
        </div>
        <br />
        <Newsletter />
        <br />
        {currentPosts.length > 0 ? (
          <>
            <div className="flex flex-col lg:gap-8 gap-2">
              {currentPosts.map((post, index) => (
                <Link href={`/posts/${post.slug}`} key={index}>
                  <PostCard post={post} />
                </Link>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <h2 className="font-sans text-3xl">No posts yet</h2>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps(): Promise<{ props: HomeProps }> {
  let files = fs.readdirSync(path.join("posts"));
  files = files.filter((file) => file.split(".")[1] == "mdx");
  const posts: Post[] = files.map((file) => {
    const fileData = fs.readFileSync(path.join("posts", file), "utf-8");
    const { data } = matter(fileData);
    const { title, description, thumbnail, date, readTime } =
      data as FrontMatter;
    return {
      frontMatter: {
        title,
        description,
        thumbnail,
        date,
        readTime: readTime || 0,
      },
      slug: file.split(".")[0],
    };
  });

  return {
    props: {
      posts,
    },
  };
}
