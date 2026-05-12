import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { motion, useScroll, useSpring } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { AnimatedSection, useScrollToTop } from '../hooks/useAnimations';
import { CalendarIcon, UserIcon, ArrowLeftIcon, ClockIcon } from '../components/Icons';

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

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
    <div className="relative">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Hero Banner */}
      {post.thumbnail && (
        <div className="relative h-[60vh] w-full overflow-hidden bg-primary">
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={post.thumbnail.startsWith('http') ? post.thumbnail : `${API_BASE_URL}${post.thumbnail}`} 
              alt={post.title} 
              className="w-full h-full object-cover opacity-60 scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-primary z-10" />
          </motion.div>

          <div className="relative z-20 flex h-full items-center justify-center pt-20">
            <div className="mx-auto max-w-4xl px-4 text-center">
              <AnimatedSection animation="fade-in-up">
                <div className="mb-6 flex items-center justify-center gap-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent-light/80">
                  <span className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    Admin
                  </span>
                  <span className="h-1 w-1 rounded-full bg-accent-light/30" />
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    }).format(new Date(post.createdAt))}
                  </span>
                </div>
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl leading-tight drop-shadow-2xl">
                  {post.title}
                </h1>
              </AnimatedSection>
            </div>
          </div>
        </div>
      )}

      <SectionWrapper background="transparent" className="-mt-20 relative z-30">
        <article className="mx-auto max-w-4xl rounded-[2.5rem] border border-border bg-surface/90 backdrop-blur-2xl p-8 sm:p-12 md:p-16 shadow-2xl">
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
              <Link
                to="/blog"
                className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent transition-all hover:tracking-[0.15em]"
              >
                <ArrowLeftIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-2" />
                Back to Blog
              </Link>
              
              <div className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest">
                <ClockIcon className="h-4 w-4 text-accent/50" />
                <span>5 MIN READ</span>
              </div>
            </div>

            {/* Render HTML content safely since it comes from React Quill */}
            <div 
              className="prose prose-lg prose-slate max-w-none text-text-secondary ql-editor blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <div className="mt-20 pt-10 border-t border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <UserIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">Written by Admin</p>
                    <p className="text-xs text-text-muted uppercase tracking-wider">Strategy & Design Team</p>
                  </div>
                </div>
                
                {/* Social Share Mock (Static for UI) */}
                <div className="flex gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-8 w-8 rounded-lg bg-surface-alt border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all cursor-pointer">
                      <div className="h-3 w-3 bg-current rounded-sm opacity-50" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </article>

        {/* Cinematic Background Decoration */}
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-accent/5 blur-[120px] opacity-20" />
          <div className="absolute bottom-[10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-accent-light/5 blur-[100px] opacity-10" />
        </div>
      </SectionWrapper>
    </div>
  );
}
