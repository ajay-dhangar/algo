import React, { useEffect } from "react";
import Head from "@docusaurus/Head";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdsComponent: React.FC = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
    catch (err) {
      console.error(err);
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
        data-ad-slot="3270832720"
       />
    </>
  );
};

export default AdsComponent;