import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import CodeBlock from "../../components/Code";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Head from 'next/head';

interface FrontMatter {
  [x: string]: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface PostProps {
  frontMatter: FrontMatter;
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>;
  slug: string;
}

const components = {
  CodeBlock,
};

export default function Post(props: PostProps) {
  return (
    <div className="w-full lg:max-w-[50rem] py-10 mx-auto mt-4 sm:mt-[2rem] lg:mt-10 px-4 lg:px-0 ">
      {props.frontMatter && props.mdxSource && (
        <div>
          <Head>
            <title>{props.frontMatter.title}</title>
            <meta name="description" content={props.frontMatter.description} />
            <meta property="og:title" content={props.frontMatter.title} />
            <meta property="og:description" content={props.frontMatter.description} />
            <meta property="og:image" content={props.frontMatter.thumbnail} />
            <meta property="og:type" content="article" />
          </Head>
          <div className="py-4">
            <h1 className="text-3xl">{props.frontMatter.title}</h1>
            <Image
              src={props.frontMatter.thumbnail}
              alt={props.frontMatter.title}
              width={1200}
              height={400}
              placeholder="blur"
              className="rounded-lg py-4"
            />
          </div>

          <article className="px-2 lg:px-0 prose-sm md:prose-base lg:prose-lg mx-auto">
            <MDXRemote {...props.mdxSource} components={components} />
          </article>
        </div>
      )}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((file) => {
    return {
      params: {
        slug: file.replace(".mdx", ""),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PostProps,
  { slug: string }
> = async ({ params }) => {
  if (!params || !params.slug) {
    throw new Error("Missing slug parameter");
  }

  const fileData = fs.readFileSync(
    path.join("posts", `${params.slug}.mdx`),
    "utf-8"
  );
  const { data, content } = matter(fileData);
  const mdxSource = await serialize(content);
  return {
    props: {
      frontMatter: data as FrontMatter,
      slug: params.slug,
      mdxSource,
    },
  };
};
