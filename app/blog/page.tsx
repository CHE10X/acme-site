import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Field Notes — ACME Agent Supply Co.",
  description:
    "Technical insights and operator field notes from building autonomous agent infrastructure.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <SiteHeader />
      <div className={styles.page}>
        <main className={styles.wrap}>
          <div className={styles.classification}>
            Field Notes · Technical Journal
          </div>

          <header className={styles.titleBlock}>
            <h1 className={styles.title}>Field Notes</h1>
            <p className={styles.subtitle}>
              Technical insights from operators building autonomous agent infrastructure.
            </p>
          </header>

          <div className={styles.postList}>
            {posts.length === 0 ? (
              <p className={styles.emptyState}>No posts yet. Check back soon.</p>
            ) : (
              posts.map((post) => (
                <article key={post.slug} className={styles.postCard}>
                  <div className={styles.postMeta}>
                    <time className={styles.postDate}>{post.date}</time>
                    <span className={styles.postAuthor}>{post.author}</span>
                  </div>
                  <h2 className={styles.postTitle}>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                    Read Field Note →
                  </Link>
                </article>
              ))
            )}
          </div>
        </main>
      </div>
      <SiteFooter showRefund={false} />
    </>
  );
}
