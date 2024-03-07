//can update the <html> and <body> tags used to render a Page. Only rendered on the server!
import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html>
      <Head />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}