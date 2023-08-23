import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa6';

export function DarkModeSpacer() {
    return <div className="aspect-[2/1] h-16 w-full"></div>;
}

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();

    //TODO: The animation on hover is a little slow but it does work
    return (
        <motion.button
            layout
            className={clsx(
                'flex aspect-[2/1] h-6 flex-row items-center rounded-xl bg-theme-invert text-theme transition-all duration-500 ease-out',
                className,
                theme === 'dark' ? 'justify-end' : 'justify-start'
            )}
            onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
            }}>
            <DarkModeIcon dark={theme === 'dark'} />
        </motion.button>
    );
}

function DarkModeIcon({ dark }: { dark: boolean }) {
    return (
        <motion.div
            className="flex aspect-square h-full flex-row items-center justify-center overflow-clip rounded-full p-1"
            layout>
            <AnimatePresence mode="wait">
                <motion.div
                    key={dark ? 'dark' : 'light'}
                    initial={{
                        rotate: 360 * (2 * Number(!dark) - 1),
                        scale: 0.5,
                    }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: 360 * (2 * Number(!dark) - 1), scale: 0.5 }}
                    transition={{ duration: 0.25 }}>
                    {dark ? <FaMoon /> : <FaSun />}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
