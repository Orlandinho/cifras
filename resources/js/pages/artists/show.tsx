import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Link as LuciLink, SquarePenIcon } from 'lucide-react';
import DeleteButton from '@/components/delete-button';

export default function Show({artist} : { artist: Artist[] }) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Artistas',
            href: '/artistas',
        },
        {
            title: artist.name,
            href: '/artistas/' + artist.slug,
        },
    ];

    interface Artist {
        id: number;
        name: string;
        slug: string;
        songs: {
            id: number;
            title: string;
            slug: string;
        };
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Cifras de ' + artist.name} />
            <div className="py-6">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden dark:bg-neutral-900 bg-neutral-50 shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {artist.songs.length > 0 ?
                                <div>
                                    <div className="sm:flex sm:items-center">
                                        <div className="sm:flex-auto">
                                            <h1 className="text-base font-semibold">{'Cifras de ' + artist.name}</h1>
                                            <p className="mt-2 text-sm">
                                                Lista de cifras do artista ou grupo.
                                            </p>
                                        </div>
                                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                            <Link
                                                href={route('songs.create')}
                                                type="button"
                                                className="block rounded-md bg-orange-600 px-3 py-1.5 text-center text-sm font-semibold text-white shadow-xs
                                                hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
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
                                                        <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold sm:pl-0">
                                                            Artista
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                                                            Mídia
                                                        </th>
                                                        <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                                                            <span className="sr-only">Edit</span>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-neutral-600">
                                                    {artist.songs.map((song: Artist) => (
                                                        <tr key={song.id}>
                                                            <td className="py-3 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-0">
                                                                <Link href={route('songs.show', [artist.slug, song.slug])} className="hover:underline">
                                                                    {song.title}
                                                                </Link>
                                                            </td>
                                                            <td className="px-3 py-3 text-sm whitespace-nowrap">
                                                                {song.url
                                                                ? <a href={song.url} className="hover:underline" target="_blank"><LuciLink className="h-4 w-4 text-orange-500" /></a>
                                                                : 'Sem Link'
                                                                }
                                                            </td>
                                                            <td className="relative py-3 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                                                <div className="flex items-center justify-center space-x-2">
                                                                    <Link href={route('songs.edit', [artist.slug, song.slug])}
                                                                          className="text-red-600 hover:text-red-900 dark:text-orange-600 dark:hover:text-orange-900">
                                                                        <SquarePenIcon className="h-4 w-4 text-green-500 hover:text-green-700" />
                                                                        <span className="sr-only">
                                                                                    {song.title}
                                                                                </span>
                                                                    </Link>
                                                                    <DeleteButton item={song}
                                                                                  text={`A cifra ${song.title} do(a) grupo/artista ${artist.name} será excluída. Deseja prosseguir?`}
                                                                                  path={'songs.destroy'}
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
                                :
                                <div className="sm:flex sm:items-center sm:justify-between">
                                    <div className="sm:flex-auto">
                                        <h1 className="text-base font-semibold">Não há cifras cadastradas para o(a) artista/grupo {artist.name}</h1>
                                    </div>
                                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                        <Link
                                            href={route('songs.create')}
                                            type="button"
                                            className="block rounded-md bg-orange-600 px-3 py-1.5 text-center text-sm font-semibold text-white shadow-xs
                                                hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                        >
                                            Nova Cifra
                                        </Link>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
