import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import CodeBlock from "../../components/Code";
import { GetStaticPaths, GetStaticProps} from "next";

interface FrontMatter {
  title: string;
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
    <div className="max-w-[50rem] py-10 mx-auto mt-4 sm:mt-[2rem] lg:mt-10  px-4 lg:px-0 ">
      {props.frontMatter && props.mdxSource && (
        <div>
          
          <article className=" px-2 lg:px-0 prose-sm md:prose-base lg:prose-lg  mx-auto max-w-[1280px]">
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
