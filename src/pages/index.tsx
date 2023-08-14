import Head from 'next/head';
import clsx from 'clsx';
import { sans } from '../styles/fonts';
import { Game } from 'src/features/game';

export default function Home() {
    return (
        <div
            className={clsx(
                'dark flex min-h-screen w-full flex-col items-center justify-center font-sans',
                sans.variable
            )}>
            <Head>
                <title>Hello World!</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex h-screen w-full items-center justify-center bg-dark text-light">
                <Game />
            </div>
        </div>
    );
}
