'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { CircleAlertIcon, TrashIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

export default function DeleteDialog({ item, text, path }: { item: never; text: string; path: string }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button type="button" className="cursor-pointer" onClick={() => setOpen(true)}>
                <TrashIcon className="h-4 w-4 text-red-500 hover:text-red-700" />
            </button>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="bg-opacity-75 fixed inset-0 bg-gray-500 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    <span className="sr-only">Close</span>
                                    <XIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <CircleAlertIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle as="h3" className="text-base leading-6 font-semibold text-gray-900">
                                        ATENÇÃO!
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">{text}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <Link
                                    as="button"
                                    href={route(path, item.id)}
                                    method="delete"
                                    preserveScroll={true}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Excluir
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
