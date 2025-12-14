'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { MicVocalIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

export default function LyricsModal({ title, lyrics }: { title: string; lyrics: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button type="button" className="cursor-pointer" onClick={() => setOpen(true)}>
                <MicVocalIcon className="h-4 w-4 text-fuchsia-500 hover:text-fuchsia-700" />
            </button>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-stone-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-stone-900/50"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-stone-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
                        >
                            <div className="absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="rounded-md bg-white text-stone-400 hover:text-stone-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 dark:bg-stone-800 dark:hover:text-stone-300 dark:focus:outline-white"
                                >
                                    <span className="sr-only">Close</span>
                                    <XIcon aria-hidden="true" className="size-6" />
                                </button>
                            </div>
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-fuchsia-100 sm:mx-0 sm:size-10 dark:bg-fuchsia-500/10">
                                    <MicVocalIcon
                                        aria-hidden="true"
                                        className="size-6 text-fuchsia-500 dark:text-fuchsia-700"
                                    />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:overflow-y-auto sm:text-left">
                                    <DialogTitle
                                        as="h3"
                                        className="text-base font-semibold text-stone-900 dark:text-white"
                                    >
                                        {title}
                                    </DialogTitle>
                                    <div className="mt-5">
                                        <div className="text-sm text-stone-500 dark:text-stone-400">
                                            <pre>{lyrics}</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
