import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head key="main-head">
        <meta name="apple-mobile-web-app-title" content="mene" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>mene</title>
        <meta name="description" content="Track your period and be healthy" />
        <meta property="og:url" content="https://t-damer.github.io/mene" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="mene" />
        <meta
          property="og:image"
          content="https://t-damer.github.io/mene/open-graph.jpg"
        />
        <meta property="og:title" content="mene" />
        <meta
          property="og:description"
          content="Track your period and be healthy"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://t-damer.github.io/mene" />
        <meta name="twitter:title" content="mene" />
        <meta
          name="twitter:description"
          content="Track your period and be healthy"
        />
        <meta name="twitter:site" content="@True_Damer" />
        <meta
          name="twitter:image"
          content="https://t-damer.github.io/mene/open-graph.jpg"
        />
        <meta name="twitter:creator" content="@True_Damer" />
      </head>
      <body className="flex flex-col container prose print:w-full min-h-[100dvh] mx-auto px-5 md:p-10">
        {children}
      </body>
    </html>
  )
}
