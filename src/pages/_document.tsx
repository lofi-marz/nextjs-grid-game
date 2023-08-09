import clsx from 'clsx';
import { sans } from 'fonts';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className={clsx('dark', sans.variable)}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
