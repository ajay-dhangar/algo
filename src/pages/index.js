import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Homepage from "../components/Homepage";
import BottomToTop from "../components/Scroller/BottomToTop/BottomToTop.tsx";
import TopToBottom from "../components/Scroller/TopToBottom/TopToBottom.tsx";
import ChatbotIframe from "../components/chatbot.jsx";


export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  // useEffect(() => {
  //   // Create and append the Chatrace script
  //   const chatraceScript = document.createElement("script");
  //   chatraceScript.src = "https://chatrace.com/webchat/plugin.js?v=5";
  //   chatraceScript.async = true;
  //   chatraceScript.onload = () => {
  //     // Initialize the chat widget after the script loads
  //     if (window.ktt10) {
  //       window.ktt10.setup({
  //         id: "2Xk6i0bywhd02D",
  //         accountId: "1322274",
  //         color: "#006dff",
  //       });
  //     }
  //   };
  //   document.body.appendChild(chatraceScript);

  //   return () => {
  //     document.body.removeChild(chatraceScript);
  //   };
  // }, []);

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
         <ChatbotIframe />
        <BottomToTop />
        <TopToBottom />
      </main>
    </Layout>
  );
}
