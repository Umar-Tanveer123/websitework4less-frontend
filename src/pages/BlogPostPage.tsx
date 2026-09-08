import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion, useScroll, useSpring } from 'framer-motion';
import Button from '../components/Button';
import FooterContactForm from '../components/FooterContactForm';
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, ClockIcon, MagnifyingGlassIcon } from '../components/Icons';
import { useScrollToTop } from '../hooks/useAnimations';
import { API_BASE_URL } from '../config';
import { previewPosts } from '../data/previewPosts';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
}

const SITE = 'https://websitework4less.com';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function resolveImage(path: string) {
  if (!path || path.startsWith('http')) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

function readingTime(html: string) {
  const words = html.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export default function BlogPostPage() {
  useScrollToTop();
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const fetchPost = async () => {
      const local = previewPosts.find((candidate) => candidate.slug === slug);
      if (local) {
        setPost(local);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/posts/${slug}`);
        setPost(response.data);
      } catch (caught) {
        console.error('Error fetching post:', caught);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  const minutes = useMemo(() => readingTime(post?.content ?? ''), [post]);
  const relatedPosts = useMemo(
    () => previewPosts.filter((candidate) => candidate.slug !== post?.slug).slice(0, 3),
    [post],
  );
  const localPostIndex = previewPosts.findIndex((candidate) => candidate.slug === post?.slug);
  const newerPost = localPostIndex > 0 ? previewPosts[localPostIndex - 1] : null;
  const olderPost = localPostIndex >= 0 ? previewPosts[localPostIndex + 1] : null;

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? `/blog?search=${encodeURIComponent(query)}` : '/blog');
  };

  useEffect(() => {
    if (!post) return;

    const defaultTitle = 'Digital Marketing Lakewood - Digital Marketing Agency';
    const title = post.metaTitle || `${post.title} | Website Work 4 Less`;
    const description = post.metaDescription || post.excerpt || '';
    const canonicalUrl = `${SITE}/blog/${post.slug}/`;
    const imageUrl = resolveImage(post.thumbnail);

    const upsertMeta = (attribute: 'name' | 'property', key: string, value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = value;
    };

    document.title = title;
    if (description) {
      upsertMeta('name', 'description', description);
      upsertMeta('property', 'og:description', description);
      upsertMeta('name', 'twitter:description', description);
    }
    upsertMeta('property', 'og:type', 'article');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    if (imageUrl) {
      upsertMeta('property', 'og:image', imageUrl);
      upsertMeta('name', 'twitter:image', imageUrl);
    }

    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.id = 'blog-post-schema';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}#article`,
      headline: post.title,
      description,
      image: imageUrl || undefined,
      datePublished: post.createdAt,
      dateModified: post.createdAt,
      mainEntityOfPage: canonicalUrl,
      author: { '@type': 'Organization', name: 'Website Work 4 Less', url: `${SITE}/` },
      publisher: { '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'Website Work 4 Less' },
    });
    document.head.appendChild(schema);

    return () => {
      document.title = defaultTitle;
      document.getElementById('blog-post-schema')?.remove();
    };
  }, [post]);

  if (!slug) return <Navigate to="/blog" replace />;

  if (loading) {
    return <div className="flex min-h-screen justify-center pt-40 text-text-secondary">Loading article?</div>;
  }

  if (error || !post) return <Navigate to="/blog" replace />;

  const imageUrl = resolveImage(post.thumbnail);

  return (
    <div className="relative">
      <motion.div className="fixed left-0 right-0 top-0 z-[100] h-1.5 origin-left bg-accent" style={{ scaleX }} />

      <header className="relative flex min-h-[520px] items-center overflow-hidden bg-slate-950 px-4 pb-20 pt-40 sm:px-6 lg:min-h-[600px] lg:pt-48">
        {imageUrl && <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/50 to-black/75" />
        <div className="relative mx-auto max-w-4xl text-center">
          <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to all articles
          </Link>
          <div className="mb-5 flex flex-wrap items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-white/80">
            <span className="inline-flex items-center gap-1.5"><CalendarIcon className="h-4 w-4" />{formatDate(post.createdAt)}</span>
            <span className="h-1 w-1 rounded-full bg-white/60" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5"><ClockIcon className="h-4 w-4" />{minutes} min read</span>
          </div>
          <h1 className="text-4xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">{post.title}</h1>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(300px,0.9fr)] lg:px-8 lg:py-20">
        <article className="min-w-0">
          {imageUrl && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mb-10 aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
              <img src={imageUrl} alt={post.title} className="h-full w-full object-cover" />
            </motion.div>
          )}

          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />

          <aside className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-accent to-accent-hover p-8 text-white shadow-xl sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Ready to grow?</p>
            <h2 className="mt-3 text-3xl font-bold">Turn these ideas into results for your business.</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/85">Tell us about your website or marketing goals and our team will recommend the right next step.</p>
            <Button as="link" to="/contact" variant="secondary" className="mt-7 !bg-white !text-accent hover:!bg-white/90">Start Your Project</Button>
          </aside>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:self-start lg:overflow-y-auto lg:pr-2">
          <section className="rounded-2xl border border-border bg-surface-alt p-6 shadow-sm sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Free consultation</p>
            <h2 className="mt-2 text-2xl font-bold text-text-primary">Let?s discuss your project</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">Share what you need and our team will contact you with practical next steps.</p>
            <FooterContactForm />
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-7">
            <h2 className="text-xl font-bold text-text-primary">Search</h2>
            <form onSubmit={handleSearch} className="mt-4 flex overflow-hidden rounded-xl border border-border bg-surface-alt focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/15">
              <label htmlFor="blog-sidebar-search" className="sr-only">Search blog articles</label>
              <input
                id="blog-sidebar-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search articles"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-text-primary outline-none"
              />
              <button type="submit" aria-label="Search articles" className="flex w-12 items-center justify-center bg-accent text-white hover:bg-accent-hover">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-7">
            <h2 className="text-xl font-bold text-text-primary">Latest articles</h2>
            <div className="mt-5 divide-y divide-border">
              {relatedPosts.map((related) => (
                <Link key={related.slug} to={`/blog/${related.slug}`} className="group block py-4 first:pt-0 last:pb-0">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">{formatDate(related.createdAt)}</span>
                  <span className="mt-1 block font-bold leading-snug text-text-primary group-hover:text-accent">{related.title}</span>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </main>

      {(olderPost || newerPost) && (
        <nav aria-label="Article navigation" className="mx-auto grid max-w-6xl gap-4 border-t border-border px-4 py-12 sm:grid-cols-2 sm:px-6 lg:px-8">
          {olderPost ? (
            <Link to={`/blog/${olderPost.slug}`} className="group rounded-2xl border border-border bg-surface p-6 hover:border-accent/30 hover:shadow-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Previous article</span>
              <span className="mt-2 flex items-center gap-2 font-bold text-text-primary group-hover:text-accent"><ArrowLeftIcon className="h-4 w-4" />{olderPost.title}</span>
            </Link>
          ) : <span />}
          {newerPost && (
            <Link to={`/blog/${newerPost.slug}`} className="group rounded-2xl border border-border bg-surface p-6 text-right hover:border-accent/30 hover:shadow-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Next article</span>
              <span className="mt-2 flex items-center justify-end gap-2 font-bold text-text-primary group-hover:text-accent">{newerPost.title}<ArrowRightIcon className="h-4 w-4" /></span>
            </Link>
          )}
        </nav>
      )}

      {relatedPosts.length > 0 && (
        <section className="border-t border-border bg-surface-alt py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div><p className="text-xs font-bold uppercase tracking-widest text-accent">Keep reading</p><h2 className="mt-2 text-3xl font-bold text-text-primary sm:text-4xl">Related articles</h2></div>
              <Link to="/blog" className="hidden items-center gap-2 text-sm font-bold text-accent sm:inline-flex">View all <ArrowRightIcon className="h-4 w-4" /></Link>
            </div>
            <div className="grid gap-7 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link key={related.slug} to={`/blog/${related.slug}`} className="group overflow-hidden rounded-2xl border border-border bg-surface hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl">
                  {related.thumbnail && <div className="aspect-video overflow-hidden"><img src={resolveImage(related.thumbnail)} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>}
                  <div className="p-6"><p className="text-xs font-bold uppercase tracking-wider text-text-muted">{formatDate(related.createdAt)}</p><h3 className="mt-3 text-xl font-bold leading-snug text-text-primary group-hover:text-accent">{related.title}</h3><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent">Read article <ArrowRightIcon className="h-4 w-4" /></span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
