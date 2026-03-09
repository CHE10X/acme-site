"use client";

import Script from "next/script";

/**
 * Tawk.to live chat widget
 * Property ID: 69aa04a1b558e41c381191d7
 * Widget ID: 1jj0245kv
 *
 * Deployed on: /docs/*, /install
 * NOT on: homepage, /pricing, blog
 */
export default function TawkToWidget() {
  return (
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
  );
}
