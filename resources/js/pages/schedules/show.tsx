import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Song {
    id: number;
    title: string;
    slug: string;
    body: string;
    artist: {
        id: number;
        name: string;
        slug: string;
    }
}
export default function Show({song} : { song: Song }) {

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
            <Head title="Lista de Músicas" />
            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden dark:bg-neutral-900 bg-neutral-50 shadow-sm sm:rounded-lg">
                        <div className="p-6 text-center">
                            <pre className="text-sm md:text-base">
                                {song.body}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
