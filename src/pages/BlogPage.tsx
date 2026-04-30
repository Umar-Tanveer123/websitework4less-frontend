import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import { AnimatedSection } from '../hooks/useAnimations';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: string;
  createdAt: string;
}

import { API_BASE_URL } from '../config';

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/posts`);
        // Only show published posts if we added that filter, or all posts for now
        setPosts(res.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="pt-20">
      <SectionWrapper background="light" className="min-h-screen">
        <AnimatedSection>
          <SectionHeading
            label="Our Blog"
            title="Insights & Updates"
            description="Read the latest news, tips, and insights from our team of digital experts."
          />
        </AnimatedSection>

        <div className="mx-auto mt-16 max-w-5xl">
          {loading ? (
            <div className="text-center text-text-secondary py-12">Loading posts...</div>
          ) : posts.length === 0 ? (
            <p className="text-center text-text-secondary py-12">No blog posts found.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post, i) => (
                <AnimatedSection key={post.slug} delay={i * 100}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30"
                  >
                    {post.thumbnail && (
                      <div className="aspect-video w-full overflow-hidden bg-primary/5">
                        <img
                          src={post.thumbnail.startsWith('http') ? post.thumbnail : `${API_BASE_URL}${post.thumbnail}`}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-premium)] group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-8">
                      <div className="mb-4 flex items-center gap-4 text-sm text-text-muted">
                        <span className="font-medium text-accent">Admin</span>
                        <span>&bull;</span>
                        <time dateTime={new Date(post.createdAt).toISOString()}>
                          {new Intl.DateTimeFormat('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          }).format(new Date(post.createdAt))}
                        </time>
                      </div>
                      <h2 className="mb-3 text-2xl font-bold text-text-primary transition-colors group-hover:text-accent">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="flex-1 text-text-secondary leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-6 font-semibold text-accent flex items-center">
                        Read Article
                        <svg
                          className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </SectionWrapper>
    </div>
  );
}
