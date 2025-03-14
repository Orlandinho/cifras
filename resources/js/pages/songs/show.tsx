import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Columns2Icon } from 'lucide-react';
import { useState } from 'react';

interface Song {
    id: number;
    title: string;
    slug: string;
    body: string;
    artist: {
        id: number;
        name: string;
        slug: string;
    };
}

export default function Show({ song }: { song: Song }) {
    const [columns, setColumns] = useState<boolean>(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Cifras',
            href: '/cifras',
        },
        {
            title: song.artist.name,
            href: '/artistas/' + song.artist.slug,
        },
        {
            title: song.title,
            href: '/artistas/' + song.artist.slug + '/' + song.slug,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={song.title} />
            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-neutral-100 shadow-sm sm:rounded-lg dark:bg-neutral-900">
                        <div className="absolute">
                            <button onClick={() => setColumns(!columns)} className="relative mx-4 mt-4 cursor-pointer">
                                <Columns2Icon
                                    className={`size-6 ${columns ? 'text-sky-400 hover:text-sky-600' : 'text-neutral-400 hover:text-neutral-600'}`}
                                />
                            </button>
                        </div>
                        <div className="p-6 text-center">
                            <pre className={`text-sm md:text-base ${columns ? 'columns-2' : ''}`}>{song.body}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
