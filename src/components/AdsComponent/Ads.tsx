import React, { useEffect } from "react";
import Head from "@docusaurus/Head";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const Ads: React.FC = () => {
  useEffect(() => {
    const loadAd = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error("Ad loading failed:", error);
      }
    };

    // Ensure adsbygoogle script has loaded before pushing ads
    if (window.adsbygoogle) {
      loadAd();
    } else {
      console.warn("adsbygoogle not available.");
    }
  }, []);

  return (
    <>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5832817025080991"
          crossOrigin="anonymous"
        />
      </Head>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-5832817025080991"
        data-ad-slot="5461416177"
      />
    </>
  );
};

export default Ads;
