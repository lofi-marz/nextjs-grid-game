import { Dialog } from '@headlessui/react';
import { useState, type PropsWithChildren } from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { WithClassNameProps } from 'types';
import clsx from 'clsx';
import { cn } from 'lib/utils';
export function useDialogControls(startOpen = false) {
    const [open, setOpen] = useState(startOpen);
    return [open, () => setOpen(true), () => setOpen(false)] as const;
}
type DialogBoxProps = PropsWithChildren<{
    open: boolean;
    onClose: () => void;
    title?: string;
}> &
    WithClassNameProps;

const dialogBoxContainerVariants: Variants = {
    hide: { opacity: 0 },
    show: { opacity: 1, transition: { when: 'beforeChildren' } },
};

const dialogBoxVariants: Variants = {
    hide: { scaleX: 0 },
    show: { scaleX: 1 },
};

export function DialogBox({
    open,
    onClose,
    title,
    children,
    className,
}: DialogBoxProps) {
    return (
        <AnimatePresence>
            {open && (
                <Dialog
                    open={open}
                    onClose={onClose}
                    className="relative z-50 text-xl"
                    as={motion.div}
                    variants={dialogBoxContainerVariants}
                    initial="hide"
                    animate="show"
                    exit="hide">
                    <div
                        className="fixed inset-0 bg-black/50"
                        aria-hidden="true"
                    />
                    <motion.div className="fixed inset-0 flex h-full w-full items-start justify-center p-12 pt-48 decoration-primary-500">
                        <Dialog.Panel
                            className="relative flex w-full max-w-sm flex-col items-center justify-center gap-6 overflow-clip rounded-xl bg-primary-500 p-6 font-sans text-base text-light drop-shadow"
                            as={motion.div}
                            variants={dialogBoxVariants}>
                            <button
                                className="absolute right-0 top-0 p-4 transition-all hover:text-red-400"
                                onClick={onClose}>
                                <FaTimes />
                            </button>
                            {title && (
                                <Dialog.Title
                                    className="text-xl font-bold lg:text-3xl"
                                    as={motion.h2}>
                                    {title}
                                </Dialog.Title>
                            )}
                            <motion.div
                                className={cn(
                                    'flex w-full flex-col gap-4',
                                    className
                                )}>
                                {children}
                            </motion.div>
                        </Dialog.Panel>
                    </motion.div>
                </Dialog>
            )}
        </AnimatePresence>
    );
}
