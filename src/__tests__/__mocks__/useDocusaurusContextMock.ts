export default function useDocusaurusContext() {
  return {
    siteConfig: {
      title: 'Algo',
      tagline: 'Learn Algorithms & Data Structures',
      url: 'https://algo.example.com',
      baseUrl: '/',
      customFields: {
        apiBaseUrl: 'https://api.example.com',
      },
    },
  };
}
