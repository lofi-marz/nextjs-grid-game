import Head from 'next/head';
import clsx from 'clsx';
import { sans } from '../styles/fonts';
import { Game } from 'features/game';
import { Nav } from '@/components/Nav';
export default function Home() {
    return (
        <div
            className={clsx(
                'flex min-h-screen w-full flex-col items-center justify-center bg-light bg-repeat font-sans text-dark dark:bg-dark dark:text-light',
                sans.variable
            )}>
            <Head>
                <title>Hello World!</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex h-screen w-full flex-col items-center justify-center ">
                <Nav />
                <Game />
            </div>
        </div>
    );
}
