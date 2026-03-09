"use client";

import Script from "next/script";

/**
 * Tawk.to live chat widget
 * Property ID: 69aa04a1b558e41c381191d7
 * Widget ID: 1jj0245kv
 *
 * Deployed on: /docs/*, /install
 * NOT on: homepage, /pricing, blog
 *
 * Goat patch spin: slow 4s rotation on the chat bubble via CSS injection.
 */
export default function TawkToWidget() {
  return (
    <>
      <style>{`
        @keyframes tawk-goat-spin {
          /* subtle jiggle during pause, then spin */
          0%   { transform: rotate(0deg) translate(0, 0); }
          8%   { transform: rotate(-3deg) translate(0, -2px); }
          16%  { transform: rotate(2deg) translate(0, 0); }
          24%  { transform: rotate(-1deg) translate(0, -1px); }
          30%  { transform: rotate(0deg) translate(0, 0); }
          55%  { transform: rotate(360deg) translate(0, 0); }
          100% { transform: rotate(360deg) translate(0, 0); }
        }
        /* Tawk.to bubble container — jiggle pause + spin cycle */
        #tawk-bubble-container,
        .tawk-button,
        iframe[title="chat widget"] {
          animation: tawk-goat-spin 5s ease-in-out infinite;
          transform-origin: center;
        }
        /* Pause spin when chat is open */
        .tawk-open #tawk-bubble-container,
        .tawk-open .tawk-button {
          animation-play-state: paused;
        }
      `}</style>
      <Script
        id="tawk-to"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/69aa04a1b558e41c381191d7/1jj0245kv';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
          `.trim(),
        }}
      />
    </>
  );
}
