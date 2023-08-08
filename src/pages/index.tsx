import Head from 'next/head';
import clsx from 'clsx';
import { sans } from '../fonts';
import { Grid } from 'features/grid';

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
                <div className="flex h-96 w-96 items-center justify-center p-6">
                    <Grid />
                </div>
            </div>
        </div>
    );
}
