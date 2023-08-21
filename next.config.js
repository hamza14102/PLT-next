module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    "@fullcalendar/common",
    "@babel/preset-react",
    "@fullcalendar/common",
    "@fullcalendar/daygrid",
    "@fullcalendar/interaction",
    "@fullcalendar/react",
    "@fullcalendar/timegrid",
    "react-github-btn",
    "dropzone",
  ],
  images: {
    domains: ['production-ai-bucket.s3.amazonaws.com'],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboards/analytics",
        permanent: true,
      },
    ];
  },
};
