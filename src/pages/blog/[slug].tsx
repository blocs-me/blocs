import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Nav from '@/design-system/Nav'
import Footer from '@/design-system/Footer'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import PageGutters from '@/helpers/PageGutters'
import { getAllPosts, getPostBySlug, BlogPostMeta } from 'src/lib/blog'

function WidgetEmbed({
  src,
  title = 'Blocs Widget',
  aspectRatio,
  height,
  maxWidth = '420px'
}: {
  src: string
  title?: string
  aspectRatio?: string
  height?: string
  maxWidth?: string
}) {
  return (
    <Box
      mx="auto"
      width="100%"
      maxWidth={maxWidth}
      my="md"
      css={{
        ...(height ? { height } : { aspectRatio: aspectRatio || '0.85' }),
        border: '2px solid var(--colors-primary-accent-1)',
        borderRadius: '16px',
        overflow: 'hidden'
      }}
    >
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title={title}
      />
    </Box>
  )
}

const mdxComponents = {
  WidgetEmbed,
  h1: (props: any) => (
    <Text as="h1" fontSize="lg" fontWeight="bold" color="foreground" mt="md" mb="xs" {...props} />
  ),
  h2: (props: any) => (
    <Text as="h2" fontSize="md" fontWeight="bold" color="foreground" mt="md" mb="xs" {...props} />
  ),
  h3: (props: any) => (
    <Text as="h3" fontSize="sm" fontWeight="bold" color="foreground" mt="sm" mb="xxs" {...props} />
  ),
  p: (props: any) => (
    <Text as="p" fontSize="sm" color="primary.accent-4" lineHeight={1.7} my="xs" {...props} />
  ),
  a: (props: any) => (
    <Box
      as="a"
      color="brand.accent-1"
      css={{ textDecoration: 'underline', '&:hover': { opacity: 0.8 } }}
      {...props}
    />
  ),
  ul: (props: any) => (
    <Box as="ul" css={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }} {...props} />
  ),
  ol: (props: any) => (
    <Box as="ol" css={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }} {...props} />
  ),
  li: (props: any) => (
    <Text as="li" fontSize="sm" color="primary.accent-4" lineHeight={1.7} my="xxs" {...props} />
  ),
  table: (props: any) => (
    <Box
      as="table"
      my="sm"
      width="100%"
      css={{
        borderCollapse: 'collapse',
        fontSize: 'var(--fontSizes-sm, 14px)',
        'th, td': {
          border: '1px solid var(--colors-primary-accent-1)',
          padding: '8px 12px',
          textAlign: 'left'
        },
        th: {
          fontWeight: 600,
          color: 'var(--colors-foreground)',
          backgroundColor: 'var(--colors-primary-accent-2)'
        },
        td: {
          color: 'var(--colors-primary-accent-4)'
        }
      }}
      {...props}
    />
  ),
  code: (props: any) => (
    <Box
      as="code"
      css={{
        backgroundColor: 'var(--colors-primary-accent-2)',
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '0.9em'
      }}
      {...props}
    />
  ),
  pre: (props: any) => (
    <Box
      as="pre"
      my="sm"
      p="sm"
      css={{
        backgroundColor: 'var(--colors-primary-accent-2)',
        borderRadius: '8px',
        overflow: 'auto',
        fontSize: '0.9em',
        lineHeight: 1.5
      }}
      {...props}
    />
  ),
  blockquote: (props: any) => (
    <Box
      as="blockquote"
      my="sm"
      pl="sm"
      css={{
        borderLeft: '3px solid var(--colors-brand-accent-1)',
        margin: '1rem 0',
        '& p': { margin: 0 }
      }}
      {...props}
    />
  ),
  hr: () => (
    <Box
      as="hr"
      my="md"
      css={{
        border: 'none',
        borderTop: '1px solid var(--colors-primary-accent-1)'
      }}
    />
  )
}

type Props = {
  meta: BlogPostMeta
  mdxSource: MDXRemoteSerializeResult
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts()
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const remarkGfm = (await import('remark-gfm')).default
  const { meta, content } = getPostBySlug(params!.slug as string)
  const mdxSource = await serialize(content, {
    mdxOptions: { remarkPlugins: [remarkGfm as any], rehypePlugins: [] }
  })
  return { props: { meta, mdxSource } }
}

export default function BlogPost({ meta, mdxSource }: Props) {
  return (
    <Box bg="background">
        <Head>
          <title>{meta.title} — Blocs Blog</title>
          <meta name="description" content={meta.description} />
          <link rel="canonical" href={`https://blocs.me/blog/${meta.slug}`} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://blocs.me/blog/${meta.slug}`} />
          <meta property="og:title" content={`${meta.title} — Blocs Blog`} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:image" content="https://blocs.me/blocs-social-banner.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content={`${meta.title} — Blocs Blog`} />
          <meta property="twitter:description" content={meta.description} />
        </Head>
        <Nav />

        <PageGutters>
          <Flex flexDirection="column" pt="100px" pb="lg" maxWidth="700px" mx="auto">
            <Link href="/blog" style={{ textDecoration: 'none' }}>
              <Text
                fontSize="xs"
                color="brand.accent-1"
                m={0}
                mb="sm"
                css={{ '&:hover': { opacity: 0.8 } }}
              >
                &larr; Back to Blog
              </Text>
            </Link>

            <Text
              as="h1"
              fontSize={['lg', , , 'xl']}
              fontWeight="bold"
              color="foreground"
              m={0}
              mb="xxs"
            >
              {meta.title}
            </Text>
            <Text fontSize="xs" color="primary.accent-3" m={0} mb="md">
              {new Date(meta.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>

            <MDXRemote {...mdxSource} components={mdxComponents} />
          </Flex>
        </PageGutters>

        <Footer />
      </Box>
  )
}
