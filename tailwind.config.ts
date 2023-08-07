import type { Config } from 'tailwindcss';

import colors from 'tailwindcss/colors';

import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

const theme = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
        '../../packages/ui/**/*.{js,ts,jsx,tsx}', // Add the ui package
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                logo: ['var(--font-logo)', ...defaultTheme.fontFamily.sans],
                body: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: colors.neutral[950], //'#FE2E5A'
                secondary: '#a6ff00',
                neutral: colors.neutral,
                light: colors.neutral[50],
                grey: colors.neutral[400],
                dark: colors.neutral[950],
                what: colors.red,
                who: colors.blue,
                where: colors.emerald,
            },
        },
    },
    plugins: [forms, typography],
} satisfies Config;

export default theme;

export const themeColors = theme.theme.extend.colors;
