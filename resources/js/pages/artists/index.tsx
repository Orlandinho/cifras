import DeleteButton from '@/components/delete-button';
import Pagination from '@/components/pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { SquarePenIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Artistas',
        href: '/artistas',
    },
];

interface Artist {
    id: number;
    name: string;
    slug: string;
    songs_count: number;
}

export default function Index({ artists }: { artists: Artist[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lista de Artistas" />
            <div className="py-6">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-neutral-100 shadow-sm sm:rounded-lg dark:bg-neutral-900">
                        <div className="p-6">
                            {artists.data.length > 0 ? (
                                <div>
                                    <div className="sm:flex sm:items-center">
                                        <div className="sm:flex-auto">
                                            <h1 className="text-base font-semibold">Artistas</h1>
                                            <p className="mt-2 text-sm">
                                                Lista dos artistas e grupos em ordem alfabética.
                                            </p>
                                        </div>
                                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                            <Link
                                                href={route('songs.create')}
                                                type="button"
                                                className="rounded-md bg-orange-600 px-3 py-1.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                            >
                                                Nova Cifra
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mt-8 flow-root">
                                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                                <table className="min-w-full divide-y divide-gray-500">
                                                    <thead>
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold sm:pl-0"
                                                            >
                                                                Grupos/Intérpretes
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-3 py-3.5 text-left text-sm font-semibold"
                                                            >
                                                                Cifras
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="relative py-3.5 pr-4 pl-3 sm:pr-0"
                                                            >
                                                                <span className="sr-only">Edit</span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-neutral-600 dark:text-neutral-300">
                                                        {artists.data.map((artist: Artist) => (
                                                            <tr key={artist.id}>
                                                                <td className="py-3 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-0">
                                                                    <Link
                                                                        href={route('artists.show', artist.slug)}
                                                                        className="hover:underline"
                                                                    >
                                                                        {artist.name}
                                                                    </Link>
                                                                </td>
                                                                <td className="px-3 py-3 text-sm whitespace-nowrap">
                                                                    {artist.songs_count}
                                                                </td>
                                                                <td className="relative py-3 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                                                    <div className="flex items-center justify-center space-x-2">
                                                                        <Link
                                                                            href={route('artists.edit', artist.slug)}
                                                                            className="text-red-600 hover:text-red-900 dark:text-orange-600 dark:hover:text-orange-900"
                                                                        >
                                                                            <SquarePenIcon className="h-4 w-4 text-green-500 hover:text-green-700" />
                                                                            <span className="sr-only">
                                                                                {artist.name}
                                                                            </span>
                                                                        </Link>
                                                                        <DeleteButton
                                                                            item={artist}
                                                                            text={`Ao excluir o(a) artista/grupo ${artist.name} todas as cifras relacionadas também serão excluídas. Deseja prosseguir?`}
                                                                            path={'artists.destroy'}
                                                                        />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="sm:flex sm:items-center sm:justify-between">
                                    <div className="sm:flex-auto">
                                        <h1 className="text-base font-semibold">Não há artistas/grupos cadastrados</h1>
                                    </div>
                                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                        <Link
                                            href={route('songs.create')}
                                            type="button"
                                            className="block rounded-md bg-orange-600 px-3 py-1.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                        >
                                            Nova Cifra
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        {artists.meta.last_page > 1 && <Pagination items={artists} />}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
