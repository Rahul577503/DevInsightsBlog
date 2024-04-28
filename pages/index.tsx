import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import PostCard from "../components/PostCard";
import { Spotlight } from "@/components/ui/Spotlight";
import { TypewriterEffect } from "@/components/ui/typewrite-effect";

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
    className: "text-blue-500 text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-center my-20",
  },
];

export default function Home(props: HomeProps): JSX.Element {
  return (
    <div className="min-h-screen w-full py-10 px-4 rounded-md flex md:items-center md:justify-center flex-col  relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <TypewriterEffect words={words} />

      {props.posts.length > 0 ? (
        <div className="md:grid md:grid-cols-3 lg:gap-8 gap-2 px-8">
          {props.posts.map((post, index) => (
            <Link href={`/posts/${post.slug}`} key={index}>
              <PostCard post={post} />
            </Link>
          ))}
        </div>
      ) : (
        <h2 className="font-sans text-3xl">No posts yet</h2>
      )}
      
      <Spotlight />
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
      frontMatter: { title, description, thumbnail, date, readTime: readTime || 0 }, 
      slug: file.split(".")[0],
    };
  });

  return {
    props: {
      posts,
    },
  };
}
