import React from "react";
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
      title={`DSA Guide | ${siteConfig.title}`}
      description="Learn data structures and algorithms with our comprehensive, open-source educational platform. Explore clean solutions, boost your coding interview prep, and contribute to world-class developer documentation."
    >
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5832817025080991"
          crossorigin="anonymous"
        />
        <meta name='impact-site-verification' value='1e9bf198-a4f7-4132-b77d-46b34e45f6ad' />   
         {/* Inline Script for AdSense Initialization */}
        <script>
          {`
            (adsbygoogle = window.adsbygoogle || []).push({});
          `}
        </script>
      </Head>
      <main>
        <Homepage />
        {/* AdSense In-feed / Display Unit */}
        <div style={{ padding: '10px 0' }}>
          <ins 
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-format="fluid"
            data-ad-layout-key="-fd-24+9-a1+se"
            data-ad-client="ca-pub-5832817025080991"
            data-ad-slot="4344560339"
          />
        </div>
        <BottomToTop />
        <TopToBottom />
      </main>
    </Layout>
  );
}
