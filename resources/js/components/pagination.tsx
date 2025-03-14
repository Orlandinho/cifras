import { Link } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export default function Pagination({ items }: { items: [] }) {
    return (
        <div className="flex items-center justify-between border-t border-neutral-500 bg-neutral-50 px-4 py-3 sm:px-6 dark:bg-neutral-900">
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                >
                    Previous
                </Link>
                <Link
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                >
                    Next
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
                                href={items.links.prev}
                                disabled={!items.links.prev}
                                preserveScroll={true}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-neutral-500 ring-inset hover:bg-neutral-50 focus:z-20 focus:outline-offset-0 dark:bg-neutral-800 dark:text-neutral-300 hover:dark:bg-neutral-500 hover:dark:text-neutral-300"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon aria-hidden="true" className="size-5" />
                            </Link>
                            {items.meta.links.map(
                                (link: array) =>
                                    !link.label.includes('aquo') && (
                                        <Link
                                            key={link.label}
                                            preserveScroll={true}
                                            href={link.url}
                                            aria-current="page"
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-neutral-500 ring-inset focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 hover:dark:bg-neutral-500 hover:dark:text-neutral-300 ${link.active ? 'z-10 dark:bg-neutral-600 dark:text-neutral-300' : 'dark:bg-neutral-800 dark:text-neutral-400'}`}
                                        >
                                            {link.label}
                                        </Link>
                                    ),
                            )}
                        </>
                        <Link
                            href={items.links.next}
                            preserveScroll={true}
                            disabled={items.meta.current_page === items.meta.last_page}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-neutral-500 ring-inset hover:bg-neutral-50 focus:z-20 focus:outline-offset-0 dark:bg-neutral-800 dark:text-neutral-300 hover:dark:bg-neutral-500 dark:hover:text-neutral-300"
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
