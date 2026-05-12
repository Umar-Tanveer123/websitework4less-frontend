import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { AnimatedSection, useScrollToTop } from '../hooks/useAnimations';
import { ArrowRightIcon, CalendarIcon, UserIcon } from '../components/Icons';

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
  useScrollToTop();
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
    <div className="relative">
      {/* Cinematic Background Mesh */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] h-[800px] w-[800px] rounded-full bg-accent/5 blur-[150px] opacity-40" 
        />
        <motion.div 
          animate={{ x: [0, -80, 0], y: [0, -60, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] left-[-10%] h-[900px] w-[900px] rounded-full bg-accent-light/5 blur-[130px] opacity-30" 
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fade-in-up">
            <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent border border-accent/20">
              Our Blog
            </span>
            <h1 className="text-4xl font-extrabold text-text-primary sm:text-5xl lg:text-6xl leading-tight">
              Insights & <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">Digital Mastery</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
              Explore our latest thoughts on web technology, design trends, and 
              strategies to accelerate your digital growth.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <SectionWrapper background="transparent" className="min-h-screen -mt-20">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-[450px] rounded-2xl bg-surface/50 border border-border animate-pulse shadow-sm" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 bg-surface/50 backdrop-blur-md rounded-3xl border border-border">
              <p className="text-lg text-text-secondary">No blog posts found. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post, i) => (
                <AnimatedSection 
                  key={post.slug} 
                  delay={i * 100}
                  animation={i % 2 === 0 ? "slide-in-left" : "slide-in-right"}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface/80 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 hover:border-accent/40"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    
                    {post.thumbnail && (
                      <div className="aspect-video w-full overflow-hidden bg-primary/5">
                        <img
                          src={post.thumbnail.startsWith('http') ? post.thumbnail : `${API_BASE_URL}${post.thumbnail}`}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-1000 ease-[var(--ease-out-premium)] group-hover:scale-110 group-hover:rotate-1"
                        />
                      </div>
                    )}
                    
                    <div className="relative flex flex-1 flex-col p-8 z-10">
                      <div className="mb-6 flex items-center gap-6 text-xs font-semibold uppercase tracking-widest">
                        <span className="flex items-center gap-2 text-accent">
                          <UserIcon className="h-3.5 w-3.5" />
                          Admin
                        </span>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <span className="flex items-center gap-2 text-text-muted">
                          <CalendarIcon className="h-3.5 w-3.5" />
                          {new Intl.DateTimeFormat('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }).format(new Date(post.createdAt))}
                        </span>
                      </div>

                      <h2 className="mb-4 text-2xl font-bold text-text-primary transition-colors group-hover:text-accent leading-tight">
                        {post.title}
                      </h2>
                      
                      {post.excerpt && (
                        <p className="flex-1 text-text-secondary leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="mt-8 flex items-center justify-between pt-6 border-t border-border/50">
                        <span className="text-sm font-bold text-accent group-hover:tracking-wider transition-all duration-300 flex items-center gap-2">
                          READ ARTICLE
                          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                        </span>
                        <span className="text-[10px] font-black text-text-muted/30 group-hover:text-accent/20 transition-colors">
                          WSW4L INSIGHTS
                        </span>
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
