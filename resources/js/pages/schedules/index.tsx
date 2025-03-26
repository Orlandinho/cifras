import DeleteButton from '@/components/delete-button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Head, Link } from '@inertiajs/react';
import { LinkIcon, SquarePenIcon, XIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Separadas',
        href: '/separadas',
    },
];

interface Song {
    id: number;
    title: string;
    slug: string;
    url: string;
    artist: {
        id: number;
        name: string;
        slug: string;
    };
    schedules: {
        date: Date;
    };
}

export default function Index({ schedules, recent, popular }: { schedules: Song[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lista de Cifras" />
            <div className="py-6">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-neutral-100 shadow-sm sm:rounded-lg dark:bg-neutral-900">
                        <div className="p-6">
                            <div className="flex w-full justify-center">
                                <div className="w-full">
                                    <TabGroup>
                                        <TabList className="flex justify-center gap-4">
                                            <Tab
                                                key={1}
                                                className="rounded-full px-3 py-1 text-sm/6 font-semibold focus:outline-none data-[focus]:outline-1 data-[focus]:outline-black data-[hover]:bg-black/5 data-[selected]:bg-black/10 data-[selected]:data-[hover]:bg-black/10 dark:data-[focus]:outline-white dark:data-[hover]:bg-white/5 dark:data-[selected]:bg-white/10 dark:data-[selected]:data-[hover]:bg-white/10"
                                            >
                                                Separados Para Hoje
                                            </Tab>
                                            <Tab
                                                key={2}
                                                className="rounded-full px-3 py-1 text-sm/6 font-semibold focus:outline-none data-[focus]:outline-1 data-[focus]:outline-black data-[hover]:bg-black/5 data-[selected]:bg-black/10 data-[selected]:data-[hover]:bg-black/10 dark:data-[focus]:outline-white dark:data-[hover]:bg-white/5 dark:data-[selected]:bg-white/10 dark:data-[selected]:data-[hover]:bg-white/10"
                                            >
                                                Recentes
                                            </Tab>
                                            <Tab
                                                key={3}
                                                className="rounded-full px-3 py-1 text-sm/6 font-semibold focus:outline-none data-[focus]:outline-1 data-[focus]:outline-black data-[hover]:bg-black/5 data-[selected]:bg-black/10 data-[selected]:data-[hover]:bg-black/10 dark:data-[focus]:outline-white dark:data-[hover]:bg-white/5 dark:data-[selected]:bg-white/10 dark:data-[selected]:data-[hover]:bg-white/10"
                                            >
                                                20 + Populares
                                            </Tab>
                                        </TabList>
                                        <TabPanels className="mt-3">
                                            <TabPanel key={1} className="rounded-xl bg-black/5 p-3 dark:bg-white/5">
                                                {schedules.length > 0 ? (
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
                                                                            Mídia
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="px-3 py-3.5 text-left text-sm font-semibold"
                                                                        >
                                                                            Remover
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="relative py-3.5 pr-4 pl-3 sm:pr-0"
                                                                        >
                                                                            <span className="sr-only">Edit</span>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-neutral-600">
                                                                    {schedules.map((scheduled) => (
                                                                        <tr key={scheduled.id}>
                                                                            <td className="py-3 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-0">
                                                                                <Link
                                                                                    href={route('songs.show', [
                                                                                        scheduled.song.artist.slug,
                                                                                        scheduled.song.slug,
                                                                                    ])}
                                                                                    className="hover:underline"
                                                                                >
                                                                                    {scheduled.song.title}
                                                                                </Link>
                                                                            </td>
                                                                            <td className="px-3 py-3 text-sm whitespace-nowrap">
                                                                                <Link
                                                                                    href={route(
                                                                                        'artists.show',
                                                                                        scheduled.song.artist.slug,
                                                                                    )}
                                                                                    className="hover:underline"
                                                                                >
                                                                                    {scheduled.song.artist.name}
                                                                                </Link>
                                                                            </td>
                                                                            <td
                                                                                className={
                                                                                    'px-3 py-3 text-sm whitespace-nowrap text-neutral-700 dark:text-neutral-400'
                                                                                }
                                                                            >
                                                                                {scheduled.song.url ? (
                                                                                    <a
                                                                                        href={scheduled.song.url}
                                                                                        className="inline-block"
                                                                                        target="_blank"
                                                                                    >
                                                                                        <LinkIcon className="h-4 w-4 text-orange-500 hover:text-orange-700" />
                                                                                    </a>
                                                                                ) : (
                                                                                    'Sem Link'
                                                                                )}
                                                                            </td>
                                                                            <td className="px-3 py-3 text-sm whitespace-nowrap">
                                                                                <Link
                                                                                    as="button"
                                                                                    href={route(
                                                                                        'schedules.destroy',
                                                                                        scheduled.song,
                                                                                    )}
                                                                                    method="delete"
                                                                                    preserveScroll={true}
                                                                                    className="cursor-pointer"
                                                                                >
                                                                                    <XIcon className="h-4 w-4 text-red-500 hover:text-red-700" />
                                                                                </Link>
                                                                            </td>
                                                                            <td className="relative py-3 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                                                                <div className="flex items-center justify-center space-x-2">
                                                                                    <Link
                                                                                        href={route('songs.edit', [
                                                                                            scheduled.song.artist.slug,
                                                                                            scheduled.song.slug,
                                                                                        ])}
                                                                                        className="text-red-600 hover:text-red-900 dark:text-orange-600 dark:hover:text-orange-800"
                                                                                    >
                                                                                        <SquarePenIcon className="h-4 w-4 text-green-500 hover:text-green-700" />
                                                                                        <span className="sr-only">
                                                                                            {scheduled.song.title}
                                                                                        </span>
                                                                                    </Link>
                                                                                    <DeleteButton
                                                                                        item={scheduled.song}
                                                                                        text={`A cifra ${scheduled.song.title} do(a) grupo/artista ${scheduled.song.artist.name} será excluída. Deseja prosseguir?`}
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
                                                ) : (
                                                    <div className="px-4 sm:flex sm:items-center sm:justify-between">
                                                        <div className="sm:flex-auto">
                                                            <h1 className="text-base font-semibold">
                                                                Nenhuma cifra separada para hoje
                                                            </h1>
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
                                                )}
                                            </TabPanel>
                                            <TabPanel key={2} className="rounded-xl bg-black/5 p-3 dark:bg-white/5">
                                                {recent.length > 0 ? (
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
                                                                            Usado em
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="relative py-3.5 pr-4 pl-3 sm:pr-0"
                                                                        >
                                                                            <span className="sr-only">Edit</span>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-neutral-600">
                                                                    {recent.map((item) => (
                                                                        <tr key={item.id}>
                                                                            <td className="py-3 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-0">
                                                                                <Link
                                                                                    href={route('songs.show', [
                                                                                        item.song.artist,
                                                                                        item.song.slug,
                                                                                    ])}
                                                                                    className="hover:underline"
                                                                                >
                                                                                    {item.song.title}
                                                                                </Link>
                                                                            </td>
                                                                            <td className="px-3 py-3 text-sm whitespace-nowrap">
                                                                                <Link
                                                                                    href={route(
                                                                                        'artists.show',
                                                                                        item.song.artist.slug,
                                                                                    )}
                                                                                    className="hover:underline"
                                                                                >
                                                                                    {item.song.artist.name}
                                                                                </Link>
                                                                            </td>
                                                                            <td
                                                                                className={
                                                                                    'px-3 py-3 text-sm whitespace-nowrap text-neutral-700 dark:text-neutral-400'
                                                                                }
                                                                            >
                                                                                {item.date}
                                                                            </td>
                                                                            <td className="relative py-3 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                                                                <div className="flex items-center justify-center space-x-2">
                                                                                    <Link
                                                                                        href={route('songs.edit', [
                                                                                            item.song.artist.slug,
                                                                                            item.song.slug,
                                                                                        ])}
                                                                                        className="text-red-600 hover:text-red-900 dark:text-orange-600 dark:hover:text-orange-800"
                                                                                    >
                                                                                        <SquarePenIcon className="h-4 w-4 text-green-500 hover:text-green-700" />
                                                                                        <span className="sr-only">
                                                                                            {item.song.title}
                                                                                        </span>
                                                                                    </Link>
                                                                                    <DeleteButton
                                                                                        item={item.song}
                                                                                        text={`A cifra ${item.song.title} do(a) grupo/artista ${item.song.artist.name} será excluída. Deseja prosseguir?`}
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
                                                ) : (
                                                    <div className="px-4 sm:flex sm:items-center sm:justify-between">
                                                        <div className="sm:flex-auto">
                                                            <h1 className="text-base font-semibold">
                                                                Nenhuma cifra usada recentemente
                                                            </h1>
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
                                                )}
                                            </TabPanel>
                                            <TabPanel key={3} className="rounded-xl bg-black/5 p-3 dark:bg-white/5">
                                                {popular.length > 0 ? (
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
                                                                            Usado
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="relative py-3.5 pr-4 pl-3 sm:pr-0"
                                                                        >
                                                                            <span className="sr-only">Edit</span>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-neutral-600">
                                                                    {popular.map((song) => (
                                                                        <tr key={song.id}>
                                                                            <td className="py-3 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-0">
                                                                                <Link
                                                                                    href={route('songs.show', [
                                                                                        song.artist,
                                                                                        song.slug,
                                                                                    ])}
                                                                                    className="hover:underline"
                                                                                >
                                                                                    {song.title}
                                                                                </Link>
                                                                            </td>
                                                                            <td className="px-3 py-3 text-sm whitespace-nowrap">
                                                                                <Link
                                                                                    href={route(
                                                                                        'artists.show',
                                                                                        song.artist.slug,
                                                                                    )}
                                                                                    className="hover:underline"
                                                                                >
                                                                                    {song.artist.name}
                                                                                </Link>
                                                                            </td>
                                                                            <td
                                                                                className={
                                                                                    'px-3 py-3 text-sm whitespace-nowrap text-neutral-700 dark:text-neutral-400'
                                                                                }
                                                                            >
                                                                                {song.schedules_count}
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
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="px-4 sm:flex sm:items-center sm:justify-between">
                                                        <div className="sm:flex-auto">
                                                            <h1 className="text-base font-semibold">
                                                                Nenhuma cifra que atenda ao critério
                                                            </h1>
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
                                                )}
                                            </TabPanel>
                                        </TabPanels>
                                    </TabGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
