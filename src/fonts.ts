import { Poppins } from 'next/font/google';

export const sans = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '400', '600', '700', '900'],
    variable: '--font-sans',
});
