import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import SectionWrapper from '../components/SectionWrapper';
import { AnimatedSection, useScrollToTop } from '../hooks/useAnimations';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  createdAt: string;
}

import { API_BASE_URL } from '../config';

export default function BlogPostPage() {
  useScrollToTop();
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/posts/${slug}`);
        setPost(res.data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchPost();
    } else {
      setError(true);
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 min-h-screen flex justify-center text-text-secondary">
        Loading...
      </div>
    );
  }

  if (error || !post) return <Navigate to="/blog" replace />;

  return (
    <div className="pt-20">
      {post.thumbnail && (
        <div className="relative h-[40vh] w-full min-h-[300px] overflow-hidden bg-primary">
          <div className="absolute inset-0 bg-primary/40 mix-blend-overlay z-10" />
          <img 
            src={post.thumbnail.startsWith('http') ? post.thumbnail : `${API_BASE_URL}${post.thumbnail}`} 
            alt={post.title} 
            className="w-full h-full object-cover" 
          />
        </div>
      )}

      <SectionWrapper background="white">
        <article className="mx-auto max-w-3xl">
          <AnimatedSection>
            <Link
              to="/blog"
              className="group mb-8 inline-flex items-center text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              <svg
                className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </Link>

            <div className="mb-6 flex items-center gap-4 text-sm text-text-muted">
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

            <h1 className="mb-8 text-4xl font-extrabold text-text-primary sm:text-5xl leading-tight">
              {post.title}
            </h1>

            {/* Render HTML content safely since it comes from React Quill */}
            <div 
              className="prose prose-lg prose-slate max-w-none text-text-secondary ql-editor"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </AnimatedSection>
        </article>
      </SectionWrapper>
    </div>
  );
}
