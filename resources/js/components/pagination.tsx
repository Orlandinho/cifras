import { Link } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useLayoutEffect, useState } from 'react';

export default function Pagination({ items }: { items: [] }) {
    const [totalLinks, setTotalLinks] = useState([]);

    useLayoutEffect(() => {
        let numShown = items.meta.last_page > 7 ? 7 : items.meta.last_page;
        numShown = Math.min(numShown, items.meta.last_page);
        let first = items.meta.current_page - Math.floor(numShown / 2);
        first = Math.max(first, 1);
        first = Math.min(first, items.meta.last_page - numShown + 1);
        const total = [...Array(numShown)].map((k, i) => i + first);
        setTotalLinks(total);
    }, [items]);

    return (
        <div className="flex items-center justify-between border-t border-neutral-500 bg-neutral-50 px-4 py-3 sm:px-6 dark:bg-neutral-900">
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    as="button"
                    href={items.links.prev}
                    disabled={!items.links.prev}
                    className={`${!items.links.prev ? 'border border-neutral-400 bg-neutral-400' : 'border border-neutral-300 bg-white hover:bg-neutral-50'} relative inline-flex items-center rounded-md px-4 py-1 text-sm font-medium text-neutral-700`}
                >
                    Anterior
                </Link>
                <Link
                    as="button"
                    href={items.links.next}
                    disabled={!items.links.next}
                    className={`${!items.links.next ? 'border border-neutral-400 bg-neutral-400' : 'border border-neutral-300 bg-white hover:bg-neutral-50'} relative ml-3 inline-flex items-center rounded-md px-4 py-1 text-sm font-medium text-neutral-700`}
                >
                    Próximo
                </Link>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm dark:text-neutral-300">
                        Exibindo de <span className="font-medium">{items.meta.from}</span> a{' '}
                        <span className="font-medium">{items.meta.to}</span> de{' '}
                        <span className="font-medium">{items.meta.total}</span>
                    </p>
                </div>
                <div>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-neutral-900 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:outline-offset-0" */}
                        <>
                            <Link
                                as="button"
                                href={items.links.prev}
                                disabled={!items.links.prev}
                                preserveScroll={true}
                                className={`${items.links.prev ? 'cursor-pointer hover:bg-neutral-50 hover:dark:bg-neutral-500 hover:dark:text-neutral-300' : ''} relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-neutral-500 ring-inset focus:z-20 focus:outline-offset-0 dark:bg-neutral-800 dark:text-neutral-300`}
                            >
                                <span className="sr-only">Anterior</span>
                                <ChevronLeftIcon aria-hidden="true" className="size-5" />
                            </Link>
                            {totalLinks.map((link: array) => (
                                <Link
                                    key={link}
                                    preserveScroll={true}
                                    href={route('songs.index', { page: link })}
                                    aria-current="page"
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-neutral-500 ring-inset focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 hover:dark:bg-neutral-500 hover:dark:text-neutral-300 ${items.meta.current_page === link ? 'z-10 dark:bg-neutral-600 dark:text-neutral-300' : 'dark:bg-neutral-800 dark:text-neutral-400'}`}
                                >
                                    {link}
                                </Link>
                            ))}
                        </>
                        <Link
                            as="button"
                            href={items.links.next}
                            preserveScroll={true}
                            disabled={items.meta.current_page === items.meta.last_page}
                            className={`${items.links.next ? 'cursor-pointer hover:bg-neutral-50 hover:dark:bg-neutral-500 hover:dark:text-neutral-300' : ''} relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-neutral-500 ring-inset focus:z-20 focus:outline-offset-0 dark:bg-neutral-800 dark:text-neutral-300`}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon aria-hidden="true" className="size-5" />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
