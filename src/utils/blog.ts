import fm from 'front-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt?: string;
  thumbnail?: string;
  body: string;
}

// Load all markdown files from the blog directory
const markdownFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = Object.keys(markdownFiles).map((filepath) => {
    // Extract the slug from the filename (e.g. '../content/blog/2026-04-30-sample-post.md' -> '2026-04-30-sample-post')
    const slug = filepath.replace('../content/blog/', '').replace('.md', '');
    
    // The raw content is the default export
    const rawContent = markdownFiles[filepath] as string;
    
    // Parse frontmatter
    const { attributes, body } = fm<{
      title: string;
      date: string;
      author?: string;
      excerpt?: string;
      thumbnail?: string;
    }>(rawContent);

    return {
      slug,
      title: attributes.title,
      date: attributes.date,
      author: attributes.author || 'Admin',
      excerpt: attributes.excerpt,
      thumbnail: attributes.thumbnail,
      body,
    };
  });

  // Sort posts by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}
