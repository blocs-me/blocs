import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import Nav from '@/design-system/Nav'
import Footer from '@/design-system/Footer'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import PageGutters from '@/helpers/PageGutters'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import { getAllPosts, BlogPostMeta } from 'src/lib/blog'

type Props = { posts: BlogPostMeta[] }

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getAllPosts()
  return { props: { posts } }
}

export default function BlogIndex({ posts }: Props) {
  return (
    <BlocsThemeProvider>
      <Box bg="background">
        <Head>
          <title>Blog — Blocs</title>
          <meta
            name="description"
            content="Updates, tips, and guides for Notion widgets from Blocs."
          />
          <link rel="canonical" href="https://blocs.me/blog" />
        </Head>
        <Nav />

        <PageGutters>
          <Flex flexDirection="column" pt="100px" pb="lg" maxWidth="700px" mx="auto">
            <Text
              as="h1"
              fontSize={['lg', , , 'xl']}
              fontWeight="bold"
              color="foreground"
              m={0}
              mb="md"
            >
              Blog
            </Text>

            {posts.length === 0 && (
              <Text fontSize="sm" color="primary.accent-4">
                No posts yet. Check back soon!
              </Text>
            )}

            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <Box
                  py="sm"
                  borderBottom="solid 1px"
                  borderColor="primary.accent-1"
                  css={{
                    '&:hover h2': { color: 'var(--colors-brand-accent-1)' },
                    transition: 'opacity 0.2s',
                    '&:hover': { opacity: 0.85 }
                  }}
                >
                  <Text
                    as="h2"
                    fontSize="md"
                    fontWeight={600}
                    color="foreground"
                    m={0}
                    mb="xxs"
                    css={{ transition: 'color 0.2s' }}
                  >
                    {post.title}
                  </Text>
                  <Text fontSize="xs" color="primary.accent-3" m={0} mb="xxs">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                  <Text fontSize="sm" color="primary.accent-4" m={0} lineHeight={1.5}>
                    {post.description}
                  </Text>
                </Box>
              </Link>
            ))}
          </Flex>
        </PageGutters>

        <Footer />
      </Box>
    </BlocsThemeProvider>
  )
}
