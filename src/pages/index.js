import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Homepage from "../components/Homepage";
import BottomToTop from "../components/Scroller/BottomToTop/BottomToTop.tsx";
import TopToBottom from "../components/Scroller/TopToBottom/TopToBottom.tsx";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5832817025080991"
          crossorigin="anonymous"
        />
        <script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        ></script>
      </Head>
      <main>
        <Homepage />
        <BottomToTop />
        <TopToBottom />
      </main>
    </Layout>
  );
}
