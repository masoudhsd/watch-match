/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    OPENAI_API_KEY: "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",
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/Nutlope/twitterbio",
        permanent: false,
      },
      {
        source: "/deploy",
        destination: "https://vercel.com/templates/next.js/twitter-bio",
        permanent: false,
      },
    ];
  },
};
``