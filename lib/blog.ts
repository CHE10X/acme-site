import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

export type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
};

export async function getAllPosts(): Promise<Post[]> {
  // Ensure directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        const processedContent = await remark()
          .use(html)
          .process(matterResult.content);
        const content = processedContent.toString();

        return {
          slug,
          title: matterResult.data.title as string,
          date: matterResult.data.date as string,
          author: matterResult.data.author as string,
          excerpt: matterResult.data.excerpt as string,
          content,
        };
      })
  );

  // Sort posts by date
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const content = processedContent.toString();

    return {
      slug,
      title: matterResult.data.title as string,
      date: matterResult.data.date as string,
      author: matterResult.data.author as string,
      excerpt: matterResult.data.excerpt as string,
      content,
    };
  } catch (error) {
    return null;
  }
}
