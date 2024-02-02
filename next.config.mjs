const ispProd = process.env.NODE_ENV === 'production';

export default {
  // assetPrefix: ispProd ? 'https://prompts-eta.vercel.app/prompts' : '/prompts',
  // basePath: '/prompts',

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://donnamagi.com" },
          { key: "Access-Control-Allow-Origin", value: "https://www.donnamagi.com" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};
