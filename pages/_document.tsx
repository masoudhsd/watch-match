import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Find your movie to watch." />
          <meta
            property="og:site_name"
            content="https://6440606c2b02bb3eca6fe9ec--fascinating-praline-b465a1.netlify.app/"
          />
          <meta
            property="og:description"
            content="Find your movie to watch."
          />
          <meta property="og:title" content="Movie Recommendation app with Chat-GPT-3" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Movie Recommendation app with Chat-GPT-3" />
          <meta
            name="twitter:description"
            content="Find your movie to watch."
          />
          <meta
            property="og:image"
            content=""
          />
          <meta
            name="twitter:image"
            content=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
