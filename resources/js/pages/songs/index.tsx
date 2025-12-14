import DeleteButton from '@/components/delete-button';
import LyricsModal from '@/components/lyrics-modal';
import Pagination from '@/components/pagination';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import { BookOpenCheckIcon, CirclePlusIcon, LinkIcon, SquarePenIcon } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cifras',
        href: '/cifras',
    },
];

const today = new Date().toLocaleString('pt-BR').split(',')[0];

interface Song {
    id: number;
    title: string;
    slug: string;
    url: string;
    lyrics: string;
    schedules_count: number;
    artist: {
        id: number;
        name: string;
        slug: string;
    };
}

export default function Index({ songs, filter }: { songs: Song[]; filter: string }) {
    const [search, setSearch] = useState(filter || '');
    const isFirstRender = useRef(true);
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const handleSearch = useCallback(
        debounce((query) => {
            router.get(route('songs.index'), { filter: query }, { replace: true, preserveState: true });
        }, 400),
        [],
    );

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        handleSearch(search);
    }, [search]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lista de Cifras" />
            <div className="py-6">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-neutral-100 shadow-sm sm:rounded-lg dark:bg-neutral-900">
                        <div className="p-6">
                            <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-base font-semibold">Cifras</h1>
                                    {songs.data.length > 0 || search.length > 0 ? (
                                        <p className="mt-2 text-sm">
                                            {songs.data.length > 0
                                                ? 'Cifras em ordem Alfabética'
                                                : 'A busca não retornou resultados'}
                                        </p>
                                    ) : (
                                        <p className="mt-2 text-sm">Ainda não há cifras</p>
                                    )}
                                </div>
                                {(songs.data.length > 0 || search.length) && (
                                    <div className="mt-4 max-w-xs sm:mt-0 sm:max-w-sm">
                                        <Input
                                            type="text"
                                            tabIndex={1}
                                            autoComplete="search"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Busca"
                                        />
                                    </div>
                                )}
                                {auth.user && (
                                    <div className="mt-4 sm:mt-0 sm:ml-8 sm:flex-none">
                                        <Link
                                            href={route('songs.create')}
                                            type="button"
                                            className="rounded-md bg-orange-600 px-3 py-1.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                        >
                                            Nova Cifra
                                        </Link>
                                    </div>
                                )}
                            </div>
                            {songs.data.length > 0 ? (
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
                                                            Título
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-3 py-3.5 text-left text-sm font-semibold"
                                                        >
                                                            Artista
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-3 py-3.5 text-left text-sm font-semibold"
                                                        >
                                                            Letra
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-3 py-3.5 text-left text-sm font-semibold"
                                                        >
                                                            Mídia
                                                        </th>
                                                        {auth.user && (
                                                            <>
                                                                <th
                                                                    scope="col"
                                                                    className="px-3 py-3.5 text-left text-sm font-semibold"
                                                                >
                                                                    Separar
                                                                </th>

                                                                <th
                                                                    scope="col"
                                                                    className="px-3 py-3.5 text-left text-sm font-semibold"
                                                                >
                                                                    Usado
                                                                </th>

                                                                <th
                                                                    scope="col"
                                                                    className="relative py-3.5 pr-4 pl-3 sm:pr-0"
                                                                >
                                                                    <span className="sr-only">Ações</span>
                                                                </th>
                                                            </>
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-neutral-600">
                                                    {songs.data.map((song: Song) => (
                                                        <tr key={song.id}>
                                                            <td className="py-3 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-0">
                                                                <Link
                                                                    href={route('songs.show', [
                                                                        song.artist.slug,
                                                                        song.slug,
                                                                    ])}
                                                                    className="hover:underline"
                                                                >
                                                                    {song.title}
                                                                </Link>
                                                            </td>
                                                            <td className="px-3 py-3 text-sm whitespace-nowrap">
                                                                <Link
                                                                    href={route('artists.show', song.artist.slug)}
                                                                    className="hover:underline"
                                                                >
                                                                    {song.artist.name}
                                                                </Link>
                                                            </td>
                                                            <td
                                                                className={
                                                                    'px-3 py-3 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-400'
                                                                }
                                                            >
                                                                {song.lyrics ? (
                                                                    <LyricsModal
                                                                        title={song.title}
                                                                        lyrics={song.lyrics}
                                                                    />
                                                                ) : (
                                                                    'Sem Letra'
                                                                )}
                                                            </td>
                                                            <td
                                                                className={
                                                                    'px-3 py-3 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-400'
                                                                }
                                                            >
                                                                {song.url ? (
                                                                    <a
                                                                        href={song.url}
                                                                        className="hover:underline"
                                                                        target="_blank"
                                                                    >
                                                                        <LinkIcon className="h-4 w-4 text-orange-500 hover:text-orange-700" />
                                                                    </a>
                                                                ) : (
                                                                    'Sem Link'
                                                                )}
                                                            </td>
                                                            {auth.user && (
                                                                <>
                                                                    <td className="px-3 py-3 text-sm whitespace-nowrap">
                                                                        <Link
                                                                            as="button"
                                                                            className="cursor-pointer"
                                                                            href={route('schedules.toggle', song)}
                                                                            method="post"
                                                                            preserveScroll={true}
                                                                        >
                                                                            {song.schedules.find(function (el) {
                                                                                return el.date === today;
                                                                            }) ? (
                                                                                <BookOpenCheckIcon className="h-4 w-4 text-yellow-500 hover:text-yellow-700" />
                                                                            ) : (
                                                                                <CirclePlusIcon className="h-4 w-4 text-sky-500 hover:text-sky-700" />
                                                                            )}
                                                                        </Link>
                                                                    </td>

                                                                    <td className="px-3 py-3 text-sm whitespace-nowrap">
                                                                        {song.schedules.length}
                                                                    </td>

                                                                    <td className="relative py-3 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                                                        <div className="flex items-center justify-center space-x-2">
                                                                            <Link
                                                                                href={route('songs.edit', [
                                                                                    song.artist.slug,
                                                                                    song.slug,
                                                                                ])}
                                                                                className="text-red-600 hover:text-red-900 dark:text-orange-600 dark:hover:text-orange-800"
                                                                            >
                                                                                <SquarePenIcon className="h-4 w-4 text-green-500 hover:text-green-700" />
                                                                                <span className="sr-only">
                                                                                    {song.title}
                                                                                </span>
                                                                            </Link>
                                                                            <DeleteButton
                                                                                item={song}
                                                                                text={`A cifra ${song.title} do(a) grupo/artista ${song.artist.name} será excluída. Deseja prosseguir?`}
                                                                                path={'songs.destroy'}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                </>
                                                            )}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="sm:flex sm:items-center sm:justify-between">
                                    <div className="sm:flex-auto">
                                        <h1 className="text-base font-semibold">Não há cifras cadastrados</h1>
                                    </div>
                                    {auth.user && (
                                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                            <Link
                                                href={route('songs.create')}
                                                type="button"
                                                className="block rounded-md bg-orange-600 px-3 py-1.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                            >
                                                Nova Cifra
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        {songs.meta.last_page > 1 && <Pagination items={songs} />}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
