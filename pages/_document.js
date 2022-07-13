import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-23110710-38"></script> 
        <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){
                dataLayer.push(arguments);
              }
              gtag('js', new Date());
          
              //statewide GA property
                  gtag('config', 'UA-3419582-2'); 
              //individual agency	GA property
                  gtag('config', 'UA-23110710-38');
          
              var getOutboundLink = function(url) {
              gtag('event', 'click', {
                  'event_category': 'navigation',
                  'event_label': 'outbound link: ' + url,
                  'transport_type': 'beacon',
                  'event_callback': function(){document.location = url;}
              });
              }
          
              var trackDownload = function(filename) {
              gtag('event', 'click', {
                  'event_category': 'download',
                  'event_label': 'file: ' + filename,
                  'transport_type': 'beacon',
                  'event_callback': function(){document.location = url;}
              });
              }
          `,
            }}
          />
        
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-FE1LM63K50"></script>
      <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-69TD0KNT0F'); // statewide GA4 ID
              gtag('config', 'G-FE1LM63K50'); // individual agency GA4 ID
          `,
            }}
          />
      </Head>
      <body>
        <Main />
        <NextScript />     
      <script type="text/javascript" async="" src="../scripts/script.js"></script>
      </body>
    </Html>
  )
}