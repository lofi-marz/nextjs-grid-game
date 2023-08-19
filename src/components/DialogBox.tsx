import { Dialog } from '@headlessui/react';
import { useState, type PropsWithChildren } from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { WithClassNameProps } from 'types';
import clsx from 'clsx';
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
                    <div className="fixed inset-0 flex h-full w-full items-start justify-center p-12 pt-48 decoration-primary-500">
                        <Dialog.Panel
                            className="relative flex w-full max-w-sm flex-col items-center justify-center gap-6 rounded-xl bg-light p-6 font-sans text-base drop-shadow dark:bg-dark"
                            as={motion.div}
                            variants={dialogBoxVariants}>
                            <button
                                className="absolute right-0 top-0 p-4 transition-all hover:text-red-400"
                                onClick={onClose}>
                                <FaTimes />
                            </button>
                            {title && (
                                <Dialog.Title className="text-xl font-bold">
                                    {title}
                                </Dialog.Title>
                            )}
                            <div className={clsx('w-full', className)}>
                                {children}
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
}
