// import style files
// pages/_app.tsx
import { Hubspot, hsPageView } from '@/components/analytics/hubspot';
import { CrispWidget } from '@/components/supportChat';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { useRouter } from 'next/router';
import Script from 'next/script';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect, useState } from 'react';
import 'vidstack/styles/base.css';
import '../src/overrides.css';
import '../style.css';


export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [queryClient] = useState(() => new QueryClient());
  useEffect(() => {
    // Initialize PostHog
    if (typeof window !== 'undefined') {
      // 在组件挂载时初始化 posthog，如果环境变量中存在 NEXT_PUBLIC_POSTHOG_KEY 和 NEXT_PUBLIC_POSTHOG_HOST，就会使用这些值进行初始化。
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.posthog.com',
        // Enable debug mode in development
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug()
        },
      })
    }
    // Track page views
    const handleRouteChange = (path) => {
      posthog.capture('$pageview')
      hsPageView(path)
    }
    // 使用 router.events.on 监听路由变化，捕获页面视图事件，并调用 hsPageView 和 posthog.capture 记录页面视图。
    // 在组件卸载时清理事件监听器。
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])
  return (
    <div
      // 使用 PostHogProvider 包裹应用组件，以提供 posthog 上下文。
      // 渲染传入的页面组件 Component 及其 pageProps。
      // 添加 Analytics 和 SpeedInsights 组件用于性能和分析。
      // 根据环境变量条件渲染 CrispWidget 组件，用于客服支持。
      // 添加 Hubspot 组件进行分析和追踪。
      // 使用 next/script 动态加载外部脚本。
      className={`${GeistSans.variable} font-sans ${GeistMono.variable} font-mono ${GeistSans.variable} `}
    >
      {/* <div className={`${GeistSans.variable}`}> */}
      <QueryClientProvider client={queryClient}>
        <PostHogProvider client={posthog}>
          <Component {...pageProps} />
          <Analytics />
          <SpeedInsights />
          {process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID ? <CrispWidget /> : null}
        </PostHogProvider>
      </QueryClientProvider>
      
      <Hubspot />
      <Script
        src="https://app.termly.io/resource-blocker/26739b38-1a89-4742-ab53-d8d724b77f51?autoBlock=on"
        strategy="beforeInteractive"
        type="text/javascript"
      />
    </div>
  )
}
