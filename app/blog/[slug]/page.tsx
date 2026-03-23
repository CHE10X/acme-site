import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import styles from "./post.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} — ACME Agent Supply Co.`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <div className={styles.page}>
        <main className={styles.wrap}>
          <div className={styles.classification}>Field Note · Technical</div>

          <header className={styles.titleBlock}>
            <div className={styles.postMeta}>
              <time className={styles.postDate}>{post.date}</time>
              <span className={styles.postAuthor}>{post.author}</span>
            </div>
            <h1 className={styles.title}>{post.title}</h1>
          </header>

          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className={styles.postFooter}>
            <Link href="/blog" className={styles.backLink}>
              ← Back to Field Notes
            </Link>
          </footer>
        </main>
      </div>
      <SiteFooter showRefund={false} />
    </>
  );
}
