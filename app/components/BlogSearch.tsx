"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { BlogPost } from "../blog/posts";

type BlogSearchProps = {
  posts: BlogPost[];
};

const POSTS_PER_PAGE = 9;

type PaginationItem = number | "ellipsis" | "last";

function matchesPost(post: BlogPost, query: string) {
  const haystack = [
    post.title,
    post.excerpt,
    post.category,
    post.intro,
    post.author.name
  ].join(" ").toLowerCase();

  return haystack.includes(query);
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card">
      <Link className="blog-card__image" href={`/blog/${post.slug}`} aria-label={post.title}>
        <img
          src={post.featuredImage}
          alt={post.featuredImageAlt}
          width="1200"
          height="628"
          loading="lazy"
          decoding="async"
        />
      </Link>
      <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
      <p>{post.excerpt}</p>
      <div className="blog-card__footer">
        <span>{post.readTime}</span>
        <Link className="blog-read-link" href={`/blog/${post.slug}`}>Read More</Link>
      </div>
    </article>
  );
}

function paginationItems(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items = new Set<number>([
    1,
    2,
    3,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    totalPages - 2,
    totalPages - 1,
    totalPages
  ]);
  const pages = Array.from(items)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
  const result: PaginationItem[] = [];

  pages.forEach((page, index) => {
    const previousPage = pages[index - 1];

    if (previousPage && page - previousPage > 1) {
      result.push("ellipsis");
    }

    result.push(page);
  });

  return [...result, "ellipsis", "last"];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const latestPosts = useMemo(() => posts.slice(1), [posts]);
  const normalizedQuery = query.trim().toLowerCase();
  const visiblePosts = useMemo(
    () => normalizedQuery ? posts.filter((post) => matchesPost(post, normalizedQuery)) : latestPosts,
    [latestPosts, normalizedQuery, posts]
  );
  const totalPages = Math.ceil(visiblePosts.length / POSTS_PER_PAGE);
  const pageStart = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = visiblePosts.slice(pageStart, pageStart + POSTS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [normalizedQuery]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <>
      <section className="blog-toolbar" aria-label="Blog controls">
        <div className="blog-search">
          <div className="blog-search__field">
            <label className="sr-only" htmlFor="blogSearch">Search blog articles</label>
            <input
              id="blogSearch"
              type="search"
              placeholder="Find articles by topic or keyword"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <span className="blog-search__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
            </span>
          </div>
        </div>
      </section>

      {visiblePosts.length ? (
        <>
          <section
            className="blog-grid"
            id="blog-posts"
            aria-label={normalizedQuery ? "Search results" : "Latest blog posts"}
          >
            {pagePosts.map((post) => (
              <BlogCard post={post} key={post.slug} />
            ))}
          </section>

          {totalPages > 1 ? (
            <nav className="blog-pagination" aria-label="Blog pagination">
              {paginationItems(currentPage, totalPages).map((item, index) => {
                if (item === "ellipsis") {
                  return (
                    <span className="blog-pagination__ellipsis" aria-hidden="true" key={`ellipsis-${index}`}>
                      ...
                    </span>
                  );
                }

                if (item === "last") {
                  return (
                    <a
                      href="#blog-posts"
                      className="blog-pagination__last"
                      aria-label={`Go to last page, page ${totalPages}`}
                      onClick={(event) => {
                        event.preventDefault();
                        setCurrentPage(totalPages);
                      }}
                      key="last"
                    >
                      Last
                    </a>
                  );
                }

                return (
                  <a
                    href="#blog-posts"
                    className={item === currentPage ? "is-active" : undefined}
                    aria-current={item === currentPage ? "page" : undefined}
                    aria-label={`Go to page ${item}`}
                    onClick={(event) => {
                      event.preventDefault();
                      setCurrentPage(item);
                    }}
                    key={item}
                  >
                    {item}
                  </a>
                );
              })}
            </nav>
          ) : null}
        </>
      ) : (
        <section className="blog-empty" aria-live="polite">
          <p className="blog-card__meta">No results</p>
          <h2>No articles found</h2>
          <p>Try a broader SEO topic, tool name, or category.</p>
        </section>
      )}
    </>
  );
}
