import { Callout } from '@/components/callouts/callout'
import Carousel from '@/components/carousel/Carousel'
import { Feature, Features } from '@/components/features'
import { Logo } from '@/components/logo'
import { Code } from '@/components/svg/'
import { OptionTable } from 'components/table'
import { GeistSans } from 'geist/font/sans'
import { useRouter } from 'next/router'
import { DocsThemeConfig, ThemeSwitch, useConfig } from 'nextra-theme-docs'
import { Button, Cards, FileTree, Steps, Tabs } from 'nextra/components'
import FooterMenu from './components/FooterMenu'
import { Frame } from './components/Frame'

const config: DocsThemeConfig = {
  logo: <Logo />,
  logoLink: '/',
  project: {
    link: 'https://github.com/AowerDmax/nextra',
  },
  search: {
    placeholder: 'Search...',
  },
  navbar: {
    extraContent: () => {
      return <>{ThemeSwitch({ lite: true, className: 'button-switch theme-switch' })}</>
    },
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  footer: {
    content: <FooterMenu />,
  },

  head: () => {
    const { asPath, defaultLocale, locale } = useRouter()
    const { frontMatter, title: pageTitle } = useConfig()
    const url = 'https://librechat.ai' + (defaultLocale === locale ? asPath : `/${locale}${asPath}`)

    const description = frontMatter.description ?? ''

    const title = frontMatter.title ?? pageTitle

    // Default frontmatter image based on path
    const defaultImage = asPath.startsWith('/docs')
      ? '/images/socialcards/default-docs-image.png'
      : asPath.startsWith('/blog')
        ? '/images/socialcards/default-blog-image.png'
        : asPath.startsWith('/changelog')
          ? '/images/socialcards/default-changelog-image.png'
          : '/images/socialcards/default-image.png'

    const image = frontMatter.ogImage
      ? 'https://www.librechat.ai' + frontMatter.ogImage // Use frontmatter image if available
      : defaultImage // Use default image based on path if frontmatter image is not available

    const video = frontMatter.ogVideo ? 'https://www.librechat.ai' + frontMatter.ogVideo : null

    return (
      <>
        <meta name="theme-color" content="#000" />
        <meta property="og:url" content={url} />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="title" content={title} />
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        {video && <meta property="og:video" content={video} />}
        <meta property="og:image" content={image} />
        <meta property="twitter:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site:domain" content="librechat.ai" />
        <meta name="twitter:url" content="https://librechat.ai" />
        <style
          dangerouslySetInnerHTML={{
            __html: `html { --font-geist-sans: ${GeistSans.style.fontFamily}; }`,
          }}
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#111111" />
      </>
    )
  },

  components: {
    Frame,
    Tabs,
    Steps,
    Cards,
    FileTree,
    Callout,
    Button,
    Carousel,
    OptionTable,
    Feature,
    Features,
    Code
  },
  // banner: {
  //   key: 'new-docs',
  //   dismissible: true,
  //   content: (
  //     <Link href="#">
  //       {/* mobile */}
  //       <span className="sm:hidden">Meet the New LibreChat Resources Hub! 🚀</span>
  //       {/* desktop */}
  //       <span className="hidden sm:inline">Meet the New LibreChat Resources Hub! 🚀</span>
  //     </Link>
  //   ),
  // },
}

export default config
