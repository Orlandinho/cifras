import DeleteButton from '@/components/delete-button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Head, Link } from '@inertiajs/react';
import { LinkIcon, SquarePenIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teste',
        href: '/test',
    },
];

export default function Test({ schedules, recent, popular }) {
    console.log(recent);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="py-6">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-neutral-50 shadow-sm sm:rounded-lg dark:bg-neutral-900">
                        <div className="p-6">
                            <div className="flex h-screen w-full justify-center">
                                <div className="w-full">
                                    <TabGroup>
                                        <TabList className="flex justify-center gap-4">
                                            <Tab
                                                key={1}
                                                className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[hover]:bg-white/5 data-[selected]:bg-white/10 data-[selected]:data-[hover]:bg-white/10"
                                            >
                                                Separado
                                            </Tab>
                                            <Tab
                                                key={2}
                                                className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[hover]:bg-white/5 data-[selected]:bg-white/10 data-[selected]:data-[hover]:bg-white/10"
                                            >
                                                Recentes
                                            </Tab>
                                            <Tab
                                                key={3}
                                                className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[hover]:bg-white/5 data-[selected]:bg-white/10 data-[selected]:data-[hover]:bg-white/10"
                                            >
                                                20 + Populares
                                            </Tab>
                                        </TabList>
                                        <TabPanels className="mt-3">
                                            <TabPanel key={1} className="rounded-xl bg-white/5 p-3">
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
                                                                            className="relative py-3.5 pr-4 pl-3 sm:pr-0"
                                                                        >
                                                                            <span className="sr-only">Edit</span>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-neutral-600 text-neutral-300">
                                                                    {schedules.map((song) => (
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
                                                    <div className="sm:flex sm:items-center sm:justify-between">
                                                        <div className="sm:flex-auto">
                                                            <h1 className="text-base font-semibold">
                                                                Nenhuma cifra separada para hoje
                                                            </h1>
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
                                            </TabPanel>
                                            <TabPanel key={2} className="rounded-xl bg-white/5 p-3">
                                                {recent.data.length > 0 ? (
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
                                                                <tbody className="divide-y divide-neutral-600 text-neutral-300">
                                                                    {recent.data.map((recent) => (
                                                                        <tr key={recent.id}>
                                                                            <td className="py-3 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-0">
                                                                                <Link
                                                                                    href={route('songs.show', [
                                                                                        recent.song.artist,
                                                                                        recent.song.slug,
                                                                                    ])}
                                                                                    className="hover:underline"
                                                                                >
                                                                                    {recent.song.title}
                                                                                </Link>
                                                                            </td>
                                                                            <td className="px-3 py-3 text-sm whitespace-nowrap">
                                                                                <Link
                                                                                    href={route(
                                                                                        'artists.show',
                                                                                        recent.song.artist.slug,
                                                                                    )}
                                                                                    className="hover:underline"
                                                                                >
                                                                                    {recent.song.artist.name}
                                                                                </Link>
                                                                            </td>
                                                                            <td
                                                                                className={
                                                                                    'px-3 py-3 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-400'
                                                                                }
                                                                            >
                                                                                {recent.date}
                                                                            </td>
                                                                            <td className="relative py-3 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                                                                <div className="flex items-center justify-center space-x-2">
                                                                                    <Link
                                                                                        href={route('songs.edit', [
                                                                                            recent.song.artist.slug,
                                                                                            recent.song.slug,
                                                                                        ])}
                                                                                        className="text-red-600 hover:text-red-900 dark:text-orange-600 dark:hover:text-orange-800"
                                                                                    >
                                                                                        <SquarePenIcon className="h-4 w-4 text-green-500 hover:text-green-700" />
                                                                                        <span className="sr-only">
                                                                                            {recent.song.title}
                                                                                        </span>
                                                                                    </Link>
                                                                                    <DeleteButton
                                                                                        item={recent.song}
                                                                                        text={`A cifra ${recent.song.title} do(a) grupo/artista ${recent.song.artist.name} será excluída. Deseja prosseguir?`}
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
                                                    <div className="sm:flex sm:items-center sm:justify-between">
                                                        <div className="sm:flex-auto">
                                                            <h1 className="text-base font-semibold">
                                                                Nenhuma cifra separada para hoje
                                                            </h1>
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
                                            </TabPanel>
                                            <TabPanel key={3} className="rounded-xl bg-white/5 p-3">
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
                                                                            Qtde de Usos
                                                                        </th>
                                                                        <th
                                                                            scope="col"
                                                                            className="relative py-3.5 pr-4 pl-3 sm:pr-0"
                                                                        >
                                                                            <span className="sr-only">Edit</span>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-neutral-600 text-neutral-300">
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
                                                                                    'px-3 py-3 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-400'
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
                                                    <div className="sm:flex sm:items-center sm:justify-between">
                                                        <div className="sm:flex-auto">
                                                            <h1 className="text-base font-semibold">
                                                                Nenhuma cifra separada para hoje
                                                            </h1>
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
