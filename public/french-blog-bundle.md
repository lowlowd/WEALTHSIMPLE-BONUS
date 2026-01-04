# French Blog Components Bundle

All French blog components and pages. Copy each section into the corresponding file path.

---

## FILE 1: src/utils/permalinks-fr.ts

```typescript
import { SITE } from 'astrowind:config';
import { cleanSlug, trimSlash } from './permalinks';

const FRENCH_BLOG_BASE = 'fr/blogue';
const FRENCH_CATEGORY_BASE = 'fr/categorie';
const FRENCH_TAG_BASE = 'fr/etiquette';

const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
  return '/' + paths + (SITE.trailingSlash && paths ? '/' : '');
};

export const getPermalinkFr = (slug = '', type = 'page'): string => {
  let permalink: string;

  if (
    slug.startsWith('https://') ||
    slug.startsWith('http://') ||
    slug.startsWith('://') ||
    slug.startsWith('#') ||
    slug.startsWith('javascript:')
  ) {
    return slug;
  }

  switch (type) {
    case 'home':
      permalink = '/fr';
      break;
    case 'blog':
      permalink = createPath(FRENCH_BLOG_BASE);
      break;
    case 'category':
      permalink = createPath(FRENCH_CATEGORY_BASE, cleanSlug(slug));
      break;
    case 'tag':
      permalink = createPath(FRENCH_TAG_BASE, cleanSlug(slug));
      break;
    case 'post': {
      const cleanedSlug = trimSlash(slug).replace(/^blog\//, '');
      permalink = createPath(FRENCH_BLOG_BASE, cleanedSlug);
      break;
    }
    case 'page':
    default:
      permalink = createPath('fr', slug);
      break;
  }

  return permalink;
};

export const getBlogPermalinkFr = (): string => getPermalinkFr(FRENCH_BLOG_BASE);
```

---

## FILE 2: src/components/blog/SinglePostFr.astro

```astro
---
import { Icon } from 'astro-icon/components';
import Image from '~/components/common/Image.astro';
import PostTagsFr from '~/components/blog/TagsFr.astro';
import FAQSchema from '~/components/blog/FAQSchema.astro';
import ArticleSchema from '~/components/common/ArticleSchema.astro';
import { getPermalinkFr } from '~/utils/permalinks-fr';
import { getFormattedDate } from '~/utils/utils';
import type { Post } from '~/types';

export interface Props {
  post: Post;
}

const { post } = Astro.props;

const getSimplifiedTitle = (title: string, maxLength: number = 40) => {
  if (title.length <= maxLength) return title;
  return title.substring(0, maxLength - 3) + '...';
};

const categorySlug = post.category?.slug ? getPermalinkFr(post.category.slug, 'category') : '#';
---

<ArticleSchema
  title={post.title}
  description={post.excerpt || ''}
  publishDate={post.publishDate}
  updateDate={post.updateDate}
  author={post.author}
  url={`/fr/blogue/${post.slug}`}
  language="fr-CA"
/>

{post.faqs && post.faqs.length > 0 && <FAQSchema faqs={post.faqs} />}

<section class="py-8 sm:py-16 lg:py-20 mx-auto">
  <article>
    <header class="max-w-3xl mx-auto px-4 sm:px-6">
      <!-- Breadcrumbs -->
      <nav aria-label="Breadcrumb" class="mb-6 text-sm text-gray-500 dark:text-gray-400">
        <ol itemscope itemtype="https://schema.org/BreadcrumbList" class="flex flex-wrap items-center">
          <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="flex items-center">
            <a href="/fr" itemprop="item" class="hover:text-primary dark:hover:text-blue-400 transition-colors">
              <span itemprop="name">Accueil</span>
            </a>
            <meta itemprop="position" content="1" />
            <span class="mx-2">/</span>
          </li>
          <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="flex items-center">
            <a href="/fr/blogue" itemprop="item" class="hover:text-primary dark:hover:text-blue-400 transition-colors">
              <span itemprop="name">Blogue</span>
            </a>
            <meta itemprop="position" content="2" />
            <span class="mx-2">/</span>
          </li>
          <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            {
              post.category ? (
                <a
                  href={categorySlug}
                  itemprop="item"
                  class="hover:text-primary dark:hover:text-blue-400 transition-colors"
                >
                  <span itemprop="name">{post.category.title}</span>
                </a>
              ) : (
                <span itemprop="name" class="text-gray-700 dark:text-gray-300">
                  {getSimplifiedTitle(post.title)}
                </span>
              )
            }
            <meta itemprop="position" content="3" />
          </li>
        </ol>
      </nav>

      <h1 class="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4 text-gray-900 dark:text-gray-100">
        {post.title}
      </h1>

      <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        {post.excerpt}
      </p>

      <hr class="border-t border-gray-200 dark:border-gray-700 my-6" />

      <!-- Metadata -->
      <div class="flex items-center flex-wrap text-sm text-gray-600 dark:text-gray-400 mb-8 gap-y-2">
        <div class="flex items-center">
          <Icon name="tabler:clock" class="w-4 h-4 mr-1.5 text-gray-500 dark:text-gray-400" />
          <time datetime={String(post.publishDate)}>{getFormattedDate(post.publishDate)}</time>
        </div>

        {
          post.author && (
            <>
              <span class="mx-3 text-gray-400">|</span>
              <div class="flex items-center">
                <Icon name="tabler:user" class="w-4 h-4 mr-1.5 text-gray-500 dark:text-gray-400" />
                <span>{post.author}</span>
              </div>
            </>
          )
        }

        {
          post.category && (
            <>
              <span class="mx-3 text-gray-400">|</span>
              <div class="flex items-center">
                <Icon name="tabler:bookmark" class="w-4 h-4 mr-1.5 text-gray-500 dark:text-gray-400" />
                <a href={categorySlug} class="hover:text-primary dark:hover:text-blue-400 transition-colors">
                  {post.category.title}
                </a>
              </div>
            </>
          )
        }

        {
          post.readingTime && (
            <>
              <span class="mx-3 text-gray-400">|</span>
              <div class="flex items-center">
                <Icon name="tabler:book" class="w-4 h-4 mr-1.5 text-gray-500 dark:text-gray-400" />
                <span>{post.readingTime} min de lecture</span>
              </div>
            </>
          )
        }
      </div>
    </header>

    {
      post.image && (
        <div class="max-w-3xl mx-auto px-4 sm:px-6 mb-8 overflow-hidden">
          <Image
            src={post.image}
            class="w-full h-auto rounded-lg shadow-md"
            widths={[400, 900]}
            sizes="(max-width: 900px) 400px, 900px"
            alt={post?.title || 'Image article'}
            width={900}
            loading="eager"
            decoding="async"
          />
        </div>
      )
    }

    <div
      class="mx-auto px-6 sm:px-6 max-w-3xl prose prose-md lg:prose-xl dark:prose-invert dark:prose-headings:text-slate-300 prose-headings:font-heading prose-headings:leading-tighter prose-headings:tracking-tighter prose-headings:font-bold prose-a:text-primary dark:prose-a:text-blue-400 prose-img:rounded-md prose-img:shadow-lg mt-8 prose-headings:scroll-mt-[80px] prose-li:my-0"
    >
      <slot />
    </div>

    <div class="mx-auto px-6 sm:px-6 max-w-3xl mt-8">
      <PostTagsFr tags={post.tags} />
    </div>

    <!-- About the Author -->
    <div class="mx-auto px-6 sm:px-6 max-w-3xl mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-start gap-4">
        <Image
          src="~/assets/images/author.jpg"
          alt="Author Name"
          class="w-16 h-16 rounded-full object-cover flex-shrink-0"
          width={64}
          height={64}
        />
        <div>
          <h4 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">À propos de l'auteur</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Description de l'auteur ici.</p>
        </div>
      </div>
    </div>
  </article>
</section>
```

---

## FILE 3: src/components/blog/ListFr.astro

```astro
---
import ItemFr from '~/components/blog/ListItemFr.astro';
import type { Post } from '~/types';

export interface Props {
  posts: Array<Post>;
}

const { posts } = Astro.props;
---

<ul>
  {
    posts.map((post) => (
      <li class="mb-12 md:mb-20">
        <ItemFr post={post} />
      </li>
    ))
  }
</ul>
```

---

## FILE 4: src/components/blog/ListItemFr.astro

```astro
---
import type { ImageMetadata } from 'astro';
import { Icon } from 'astro-icon/components';
import Image from '~/components/common/Image.astro';
import PostTagsFr from '~/components/blog/TagsFr.astro';
import { APP_BLOG } from 'astrowind:config';
import type { Post } from '~/types';
import { getPermalinkFr } from '~/utils/permalinks-fr';
import { findImage } from '~/utils/images';
import { getFormattedDate } from '~/utils/utils';

export interface Props {
  post: Post;
}

const { post } = Astro.props;
const image = (await findImage(post.image)) as ImageMetadata | undefined;
const link = APP_BLOG?.post?.isEnabled ? getPermalinkFr(post.permalink, 'post') : '';
---

<article class={`max-w-md mx-auto md:max-w-none grid gap-6 md:gap-8 ${image ? 'md:grid-cols-2' : ''}`}>
  {
    image &&
      (link ? (
        <a class="relative block group" href={link ?? 'javascript:void(0)'}>
          <div class="relative h-0 pb-[56.25%] md:pb-[75%] md:h-72 lg:pb-[56.25%] overflow-hidden bg-gray-400 dark:bg-slate-700 rounded shadow-lg">
            {image && (
              <Image
                src={image}
                class="absolute inset-0 object-cover w-full h-full mb-6 rounded shadow-lg bg-gray-400 dark:bg-slate-700"
                widths={[400, 900]}
                width={900}
                sizes="(max-width: 900px) 400px, 900px"
                alt={post.title}
                aspectRatio="16:9"
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
        </a>
      ) : (
        <div class="relative h-0 pb-[56.25%] md:pb-[75%] md:h-72 lg:pb-[56.25%] overflow-hidden bg-gray-400 dark:bg-slate-700 rounded shadow-lg">
          {image && (
            <Image
              src={image}
              class="absolute inset-0 object-cover w-full h-full mb-6 rounded shadow-lg bg-gray-400 dark:bg-slate-700"
              widths={[400, 900]}
              width={900}
              sizes="(max-width: 900px) 400px, 900px"
              alt={post.title}
              aspectRatio="16:9"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      ))
  }

  <div class="mt-2">
    <header>
      <div class="mb-1">
        <span class="text-sm">
          <Icon name="tabler:clock" class="w-3.5 h-3.5 inline-block -mt-0.5 dark:text-gray-400" />
          <time datetime={String(post.publishDate)} class="inline-block">{getFormattedDate(post.publishDate)}</time>
          {
            post.author && (
              <>
                {' '}
                · <Icon name="tabler:user" class="w-3.5 h-3.5 inline-block -mt-0.5 dark:text-gray-400" />
                <span>{post.author.replaceAll('-', ' ')}</span>
              </>
            )
          }
          {
            post.category && (
              <>
                {' '}
                ·{' '}
                <a class="hover:underline" href={getPermalinkFr(post.category.slug, 'category')}>
                  {post.category.title}
                </a>
              </>
            )
          }
        </span>
      </div>
      <h2 class="text-xl sm:text-2xl font-bold leading-tight mb-2 font-heading dark:text-slate-300">
        {
          link ? (
            <a
              class="inline-block hover:text-primary dark:hover:text-blue-700 transition ease-in duration-200"
              href={link}
            >
              {post.title}
            </a>
          ) : (
            post.title
          )
        }
      </h2>
    </header>

    {post.excerpt && <p class="flex-grow text-muted dark:text-slate-400 text-lg">{post.excerpt}</p>}
    {
      post.tags && Array.isArray(post.tags) ? (
        <footer class="mt-5">
          <PostTagsFr tags={post.tags} />
        </footer>
      ) : (
        <Fragment />
      )
    }
  </div>
</article>
```

---

## FILE 5: src/components/blog/TagsFr.astro

```astro
---
import { getPermalinkFr } from '~/utils/permalinks-fr';
import { APP_BLOG } from 'astrowind:config';
import type { Post } from '~/types';

export interface Props {
  tags: Post['tags'];
  class?: string;
  title?: string | undefined;
  isCategory?: boolean;
}

const { tags, class: className = 'text-sm', title = undefined, isCategory = false } = Astro.props;
---

{
  tags && Array.isArray(tags) && (
    <>
      {title !== undefined && (
        <span class="align-super font-normal underline underline-offset-4 decoration-2 dark:text-slate-400">
          {title}
        </span>
      )}
      <ul class={className}>
        {tags.map((tag) => (
          <li class="bg-gray-100 dark:bg-slate-700 inline-block mr-2 rtl:mr-0 rtl:ml-2 mb-2 py-0.5 px-2 lowercase font-medium">
            {!APP_BLOG?.tag?.isEnabled ? (
              tag.title
            ) : (
              <a
                href={getPermalinkFr(tag.slug, isCategory ? 'category' : 'tag')}
                class="text-muted dark:text-slate-300 hover:text-primary dark:hover:text-gray-200"
              >
                {tag.title}
              </a>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
```

---

## FILE 6: src/components/blog/RelatedPostsFr.astro

```astro
---
import { APP_BLOG } from 'astrowind:config';
import { getRelatedFrenchPosts } from '~/utils/blog-fr';
import BlogHighlightedPostsFr from '../widgets/BlogHighlightedPostsFr.astro';
import type { Post } from '~/types';

export interface Props {
  post: Post;
}

const { post } = Astro.props;
const relatedPosts = post.tags ? await getRelatedFrenchPosts(post, 4) : [];
---

{
  APP_BLOG.isRelatedPostsEnabled ? (
    <BlogHighlightedPostsFr
      classes={{
        container: 'pt-0 lg:pt-0 md:pt-0',
      }}
      title="Articles connexes"
      linkText="Voir tous les articles"
      linkUrl="/fr/blogue"
      postIds={relatedPosts.map((post) => post.id)}
    />
  ) : null
}
```

---

## FILE 7: src/components/blog/ToBlogLinkFr.astro

```astro
---
import { Icon } from 'astro-icon/components';
import { I18N } from 'astrowind:config';
import Button from '~/components/ui/Button.astro';

const { textDirection } = I18N;
---

<div class="mx-auto px-6 sm:px-6 max-w-3xl pt-8 md:pt-4 pb-12 md:pb-20">
  <Button variant="tertiary" class="px-3 md:px-3" href="/fr/blogue">
    {
      textDirection === 'rtl' ? (
        <Icon name="tabler:chevron-right" class="w-5 h-5 mr-1 -ml-1.5 rtl:-mr-1.5 rtl:ml-1" />
      ) : (
        <Icon name="tabler:chevron-left" class="w-5 h-5 mr-1 -ml-1.5 rtl:-mr-1.5 rtl:ml-1" />
      )
    } Retour au blogue
  </Button>
</div>
```

---

## FILE 8: src/pages/fr/blogue/index.astro

```astro
---
import Layout from '~/layouts/Layout.astro';
import Header from '~/components/widgets/Header.astro';
import Footer from '~/components/widgets/Footer.astro';
import BlogListFr from '~/components/blog/ListFr.astro';
import Headline from '~/components/blog/Headline.astro';
import Pagination from '~/components/blog/Pagination.astro';

import { headerDataFr, footerDataFr } from '~/navigation-fr';
import { fetchFrenchPosts, blogPostsPerPage } from '~/utils/blog-fr';

export const prerender = true;

const allPosts = await fetchFrenchPosts();
const postsPerPage = blogPostsPerPage || 6;
const posts = allPosts.slice(0, postsPerPage);
const hasNextPage = allPosts.length > postsPerPage;

const metadata = {
  title: 'Blogue - Guides et Articles',
  description: 'Guides, comparaisons et astuces.',
  robots: { index: true, follow: true },
  openGraph: { type: 'blog' },
};
---

<Layout metadata={metadata}>
  <Header {...headerDataFr} />

  <section class="px-6 sm:px-6 py-12 sm:py-16 lg:py-20 mx-auto max-w-4xl">
    <Headline subtitle="Conseils, guides et astuces!"> Blogue </Headline>
    <BlogListFr posts={posts} />
    <Pagination prevUrl={undefined} nextUrl={hasNextPage ? '/fr/blogue/2' : undefined} />
  </section>

  <Footer {...footerDataFr} />
</Layout>
```

---

## FILE 9: src/pages/fr/blogue/[...page].astro

```astro
---
import type { InferGetStaticPropsType, GetStaticPaths } from 'astro';

import Layout from '~/layouts/Layout.astro';
import Header from '~/components/widgets/Header.astro';
import Footer from '~/components/widgets/Footer.astro';
import BlogListFr from '~/components/blog/ListFr.astro';
import Headline from '~/components/blog/Headline.astro';
import Pagination from '~/components/blog/Pagination.astro';

import { headerDataFr, footerDataFr } from '~/navigation-fr';
import { fetchFrenchPosts, blogPostsPerPage } from '~/utils/blog-fr';

export const prerender = true;

export const getStaticPaths = (async ({ paginate }) => {
  const posts = await fetchFrenchPosts();
  const pages = paginate(posts, { pageSize: blogPostsPerPage });
  return pages.filter((page) => page.params.page !== undefined);
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

const { page } = Astro.props as Props;
const currentPage = page.currentPage ?? 1;

const metadata = {
  title: `Blogue — Page ${currentPage}`,
  description: 'Guides, comparaisons et astuces.',
  robots: { index: false, follow: true },
  openGraph: { type: 'blog' },
};

const prevUrl = currentPage === 2 ? '/fr/blogue' : page.url.prev;
---

<Layout metadata={metadata}>
  <Header {...headerDataFr} />

  <section class="px-6 sm:px-6 py-12 sm:py-16 lg:py-20 mx-auto max-w-4xl">
    <Headline subtitle="Conseils, guides et astuces!"> Blogue </Headline>
    <BlogListFr posts={page.data} />
    <Pagination prevUrl={prevUrl} nextUrl={page.url.next} />
  </section>

  <Footer {...footerDataFr} />
</Layout>
```

---

## FILE 10: src/pages/fr/blogue/[slug].astro

```astro
---
import type { InferGetStaticPropsType, GetStaticPaths } from 'astro';
import merge from 'lodash.merge';
import type { ImageMetadata } from 'astro';
import Layout from '~/layouts/PageLayoutFr.astro';
import SinglePostFr from '~/components/blog/SinglePostFr.astro';
import ToBlogLinkFr from '~/components/blog/ToBlogLinkFr.astro';
import { getCanonical } from '~/utils/permalinks';
import { blogPostRobots } from '~/utils/blog';
import { fetchFrenchPosts } from '~/utils/blog-fr';
import { findImage } from '~/utils/images';
import type { MetaData } from '~/types';
import RelatedPostsFr from '~/components/blog/RelatedPostsFr.astro';

export const prerender = true;

export const getStaticPaths = (async () => {
  const frenchPosts = await fetchFrenchPosts();
  return frenchPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

const { post } = Astro.props as Props;
const url = getCanonical(`/fr/blogue/${post.slug}`);
const image = (await findImage(post.image)) as ImageMetadata | string | undefined;

const metadata = merge(
  {
    title: post.title,
    description: post.excerpt,
    robots: { index: blogPostRobots?.index, follow: blogPostRobots?.follow },
    openGraph: {
      type: 'article',
      ...(image
        ? { images: [{ url: image, width: (image as ImageMetadata)?.width, height: (image as ImageMetadata)?.height }] }
        : {}),
    },
  },
  { ...(post?.metadata ? { ...post.metadata, canonical: post.metadata?.canonical || url } : {}) }
) as MetaData;
---

<Layout metadata={metadata}>
  <SinglePostFr post={{ ...post, image: image }}>
    {post.Content ? <post.Content /> : <Fragment set:html={post.content || ''} />}
  </SinglePostFr>
  <ToBlogLinkFr />
  <RelatedPostsFr post={post} />
</Layout>
```

---

## FILE 11: src/components/blog/GridFr.astro

```astro
---
import ItemFr from '~/components/blog/GridItemFr.astro';
import type { Post } from '~/types';

export interface Props {
  posts: Array<Post>;
}

const { posts } = Astro.props;
---

<div class="grid gap-6 row-gap-5 md:grid-cols-2 lg:grid-cols-4 -mb-6">
  {posts.map((post) => <ItemFr post={post} />)}
</div>
```

---

## FILE 12: src/components/blog/GridItemFr.astro

```astro
---
import { APP_BLOG } from 'astrowind:config';
import type { Post } from '~/types';
import Image from '~/components/common/Image.astro';
import { findImage } from '~/utils/images';
import { getPermalinkFr } from '~/utils/permalinks-fr';

export interface Props {
  post: Post;
}

const { post } = Astro.props;
const image = await findImage(post.image);
const link = APP_BLOG?.post?.isEnabled ? getPermalinkFr(post.permalink, 'post') : '';
---

<article class="mb-6 transition">
  <div class="relative md:h-64 bg-gray-400 dark:bg-slate-700 rounded shadow-lg mb-6">
    {
      image &&
        (link ? (
          <a href={link}>
            <Image
              src={image}
              class="w-full md:h-full rounded shadow-lg bg-gray-400 dark:bg-slate-700"
              widths={[400, 900]}
              width={400}
              sizes="(max-width: 900px) 400px, 900px"
              alt={post.title}
              aspectRatio="16:9"
              layout="cover"
              loading="lazy"
              decoding="async"
            />
          </a>
        ) : (
          <Image
            src={image}
            class="w-full md:h-full rounded shadow-lg bg-gray-400 dark:bg-slate-700"
            widths={[400, 900]}
            width={400}
            sizes="(max-width: 900px) 400px, 900px"
            alt={post.title}
            aspectRatio="16:9"
            layout="cover"
            loading="lazy"
            decoding="async"
          />
        ))
    }
  </div>

  <h3 class="text-xl sm:text-2xl font-bold leading-tight mb-2 font-heading dark:text-slate-300">
    {
      link ? (
        <a class="inline-block hover:text-primary dark:hover:text-blue-700 transition ease-in duration-200" href={link}>
          {post.title}
        </a>
      ) : (
        post.title
      )
    }
  </h3>

  <p class="text-muted dark:text-slate-400 text-lg">{post.excerpt}</p>
</article>
```

---

## FILE 13: src/components/widgets/BlogHighlightedPostsFr.astro

```astro
---
import { APP_BLOG } from 'astrowind:config';
import GridFr from '~/components/blog/GridFr.astro';
import { findFrenchPostsByIds } from '~/utils/blog-fr';
import WidgetWrapper from '~/components/ui/WidgetWrapper.astro';
import type { Widget } from '~/types';

export interface Props extends Widget {
  title?: string;
  linkText?: string;
  linkUrl?: string | URL;
  information?: string;
  postIds: string[];
}

const {
  title = await Astro.slots.render('title'),
  linkText = 'Voir tous les articles',
  linkUrl = '/fr/blogue',
  information = await Astro.slots.render('information'),
  postIds = [],
  id,
  isDark = false,
  classes = {},
  bg = await Astro.slots.render('bg'),
} = Astro.props;

const posts = APP_BLOG.isEnabled ? await findFrenchPostsByIds(postIds) : [];
---

{
  APP_BLOG.isEnabled ? (
    <WidgetWrapper id={id} isDark={isDark} containerClass={classes?.container as string} bg={bg}>
      <div class="flex flex-col lg:justify-between lg:flex-row mb-8">
        {title && (
          <div class="md:max-w-sm">
            <h2
              class="text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none group font-heading mb-2"
              set:html={title}
            />
            {APP_BLOG.list.isEnabled && linkText && linkUrl && (
              <a
                class="text-muted dark:text-slate-400 hover:text-primary transition ease-in duration-200 block mb-6 lg:mb-0"
                href={linkUrl}
              >
                {linkText} »
              </a>
            )}
          </div>
        )}

        {information && <p class="text-muted dark:text-slate-400 lg:text-sm lg:max-w-md" set:html={information} />}
      </div>

      <GridFr posts={posts} />
    </WidgetWrapper>
  ) : (
    <Fragment />
  )
}
```

---

## IMPORTANT: [slug].astro must use PageLayoutFr!

The key fix for French blog posts is line 6:

```astro
import Layout from '~/layouts/PageLayoutFr.astro';
```

NOT `PageLayout.astro` - this was the bug that caused mixed English/French navigation!
