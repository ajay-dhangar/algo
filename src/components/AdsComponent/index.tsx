import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[] | undefined;
  }
}

const AdUnit: React.FC<{ adSlot: string }> = ({ adSlot }) => (
  <ins
    className="adsbygoogle"
    style={{ display: "block", textAlign: "center" }}
    data-ad-layout="in-article"
    data-ad-format="fluid"
    data-ad-client="ca-pub-5832817025080991"
    data-ad-slot={adSlot}
  />
);

const AdsComponent: React.FC<{ adSlot: string }> = ({ adSlot }) => {
  useEffect(() => {
    if (window.adsbygoogle) {
      try {
        window.adsbygoogle.push({});
      } catch (err) {
        console.error("AdsbyGoogle push error: ", err);
      }
    }
  }, [adSlot]);

  return (
    <>
      <AdUnit adSlot={adSlot} />
    </>
  );
};

export default AdsComponent;