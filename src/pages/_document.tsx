import clsx from 'clsx';
import { sans } from '@/styles/fonts';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className={clsx(sans.variable)}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
