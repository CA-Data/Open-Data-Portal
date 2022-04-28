import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      <script type="text/javascript" async="" src="../scripts/custom.js"></script>
      <script type="text/javascript" async="" src="../scripts/page-navigation.js"></script>
      {/*<script type="text/javascript" async="" src="../scripts/site-navigation.js"></script>*/}
      </body>
    </Html>
  )
}