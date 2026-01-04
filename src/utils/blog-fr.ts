import type { PaginateFunction } from 'astro';
import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '~/types';
import { APP_BLOG } from 'astrowind:config';
import { cleanSlug, trimSlash, POST_PERMALINK_PATTERN } from './permalinks';

const FRENCH_BLOG_BASE = 'fr/blogue';

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

const getNormalizedPost = async (post: CollectionEntry<'post'>): Promise<Post> => {
  const { id, data } = post;
  const { Content, remarkPluginFrontmatter } = await render(post);

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    imageCaption,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
    metadata = {},
  } = data;

  // For French posts, remove the 'fr/' prefix from the slug
  const rawSlug = cleanSlug(id);
  const slug = rawSlug.startsWith('fr/') ? rawSlug.replace('fr/', '') : rawSlug;
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;

  const category = rawCategory
    ? {
        slug: cleanSlug(rawCategory),
        title: rawCategory,
      }
    : undefined;

  const tags = rawTags.map((tag: string) => ({
    slug: cleanSlug(tag),
    title: tag,
  }));

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate, category: category?.slug }),
    publishDate: publishDate,
    updateDate: updateDate,
    title: title,
    excerpt: excerpt,
    image: image,
    imageCaption: imageCaption,
    category: category,
    tags: tags,
    author: author,
    draft: draft,
    metadata,
    Content: Content,
    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const loadFrenchPosts = async function (): Promise<Array<Post>> {
  const allPosts = await getCollection('post');
  const frenchPosts = allPosts.filter((post) => post.id.startsWith('fr/'));
  const normalizedPosts = frenchPosts.map(async (post) => await getNormalizedPost(post));
  const now = new Date();
  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft && post.publishDate <= now);
  return results;
};

let _frenchPosts: Array<Post>;

export const blogPostsPerPage = APP_BLOG?.postsPerPage;

export const fetchFrenchPosts = async (): Promise<Array<Post>> => {
  if (!_frenchPosts) {
    _frenchPosts = await loadFrenchPosts();
  }
  return _frenchPosts;
};

export const getStaticPathsFrenchBlogList = async ({ paginate }: { paginate: PaginateFunction }) => {
  return paginate(await fetchFrenchPosts(), {
    params: { blog: FRENCH_BLOG_BASE || undefined },
    pageSize: blogPostsPerPage,
  });
};

export const findLatestFrenchPosts = async ({ count }: { count?: number }): Promise<Array<Post>> => {
  const _count = count || 4;
  const posts = await fetchFrenchPosts();
  return posts ? posts.slice(0, _count) : [];
};

export async function getRelatedFrenchPosts(originalPost: Post, maxResults: number = 4): Promise<Post[]> {
  const allPosts = await fetchFrenchPosts();
  const originalTagsSet = new Set(originalPost.tags ? originalPost.tags.map((tag) => tag.slug) : []);

  const postsWithScores = allPosts.reduce((acc: { post: Post; score: number }[], iteratedPost: Post) => {
    if (iteratedPost.slug === originalPost.slug) return acc;
    let score = 0;
    if (iteratedPost.category && originalPost.category && iteratedPost.category.slug === originalPost.category.slug) {
      score += 5;
    }
    if (iteratedPost.tags) {
      iteratedPost.tags.forEach((tag) => {
        if (originalTagsSet.has(tag.slug)) score += 1;
      });
    }
    acc.push({ post: iteratedPost, score });
    return acc;
  }, []);

  postsWithScores.sort((a, b) => b.score - a.score);
  return postsWithScores.slice(0, maxResults).map((p) => p.post);
}

export const findFrenchPostsByIds = async (ids: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(ids)) return [];
  const posts = await fetchFrenchPosts();
  return ids.reduce(function (r: Array<Post>, id: string) {
    posts.some(function (post: Post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

/** Get static paths for French tag pages */
export const getStaticPathsFrenchBlogTag = async ({ paginate }: { paginate: PaginateFunction }) => {
  const posts = await fetchFrenchPosts();

  // Collect all unique tags from French posts
  const tags = new Map<string, { slug: string; title: string }>();
  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (!tags.has(tag.slug)) {
          tags.set(tag.slug, tag);
        }
      });
    }
  });

  // Generate paginated paths for each tag
  return Array.from(tags.values()).flatMap((tag) => {
    const filteredPosts = posts.filter((post) => post.tags && post.tags.some((t) => t.slug === tag.slug));
    return paginate(filteredPosts, {
      params: { tag: tag.slug },
      props: { tag },
      pageSize: blogPostsPerPage,
    });
  });
};

/** Get static paths for French category pages */
export const getStaticPathsFrenchBlogCategory = async ({ paginate }: { paginate: PaginateFunction }) => {
  const posts = await fetchFrenchPosts();

  // Collect all unique categories from French posts
  const categories = new Map<string, { slug: string; title: string }>();
  posts.forEach((post) => {
    if (post.category) {
      if (!categories.has(post.category.slug)) {
        categories.set(post.category.slug, post.category);
      }
    }
  });

  // Generate paginated paths for each category
  return Array.from(categories.values()).flatMap((category) => {
    const filteredPosts = posts.filter((post) => post.category && post.category.slug === category.slug);
    return paginate(filteredPosts, {
      params: { category: category.slug },
      props: { category },
      pageSize: blogPostsPerPage,
    });
  });
};
