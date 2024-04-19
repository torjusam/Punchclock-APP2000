import {Html, Head, Main, NextScript} from 'next/document'

/**
 * This is a custom Document component for Next.js. The Document is only rendered in the server.
 * Allows one to augment application's <html> and <body> tags. This is necessary for CSS-in-JS libraries
 * that need to wrap their app component, and for setting up any polyfills.
 *
 * @function Document
 * @returns {JSX.Element} - This function returns a JSX element. It does not return a value.
 */
export default function Document() {
    return (
        <Html>
            <Head/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}