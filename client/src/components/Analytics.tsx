import { useEffect } from 'react';

interface AnalyticsProps {
  googleAnalyticsId?: string;
  linkedInPartnerId?: string;
}

export default function Analytics({ 
  googleAnalyticsId = 'G-XXXXXXXXXX', // Replace with actual GA4 ID
  linkedInPartnerId = 'XXXXXX' // Replace with actual LinkedIn Partner ID
}: AnalyticsProps) {
  
  useEffect(() => {
    // Google Analytics 4
    if (googleAnalyticsId && googleAnalyticsId !== 'G-XXXXXXXXXX') {
      // Check if script already exists
      if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${googleAnalyticsId}"]`)) {
        // Add GA4 script
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
        document.head.appendChild(gaScript);

        // Add GA4 initialization
        const gaInitScript = document.createElement('script');
        gaInitScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId}');
        `;
        document.head.appendChild(gaInitScript);
      }
    }

    // LinkedIn Insight Tag
    if (linkedInPartnerId && linkedInPartnerId !== 'XXXXXX') {
      // Check if script already exists
      if (!document.querySelector('script[src*="snap.licdn.com"]')) {
        const linkedInScript = document.createElement('script');
        linkedInScript.type = 'text/javascript';
        linkedInScript.innerHTML = `
          _linkedin_partner_id = "${linkedInPartnerId}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        `;
        document.head.appendChild(linkedInScript);

        const linkedInPixel = document.createElement('script');
        linkedInPixel.type = 'text/javascript';
        linkedInPixel.innerHTML = `
          (function(l) {
          if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
          window.lintrk.q=[]}
          var s = document.getElementsByTagName("script")[0];
          var b = document.createElement("script");
          b.type = "text/javascript";b.async = true;
          b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
          s.parentNode.insertBefore(b, s);})(window.lintrk);
        `;
        document.head.appendChild(linkedInPixel);

        // Add noscript fallback
        const noscript = document.createElement('noscript');
        noscript.innerHTML = `<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=${linkedInPartnerId}&fmt=gif" />`;
        document.body.appendChild(noscript);
      }
    }
  }, [googleAnalyticsId, linkedInPartnerId]);

  return null;
}
