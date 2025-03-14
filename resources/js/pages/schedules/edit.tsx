import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Song {
    title: string,
    slug: string,
    url: string,
    body: string,
    artist: {
        name: string,
        slug: string,
    },
}

export default function Edit({song}: {song: Song}) {

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
            href: '/cifras/' + song.artist.slug + '/' + song.slug,
        },
        {
            title: 'Editar',
            href: '/cifras/' + song.artist.name + '/' + song.slug + '/editar',
        },
    ];

    const { data, setData, patch, processing, errors } = useForm<SongForm>({
        title: song.title,
        artist: song.artist.name,
        url: song.url,
        body: song.body
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('songs.update', song));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nova Cifra" />
            <div className="py-6">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden dark:bg-neutral-900 bg-neutral-50 shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form className="flex flex-col gap-6" onSubmit={submit}>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Título</Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="artist">Artista</Label>
                                        <Input
                                            id="artist"
                                            type="text"
                                            tabIndex={2}
                                            autoComplete="artist"
                                            value={data.artist}
                                            onChange={(e) => setData('artist', e.target.value)}
                                        />
                                        <InputError message={errors.artist} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="url">Link Multimídia (vídeo ou serviço de streaming)</Label>
                                        <Input
                                            id="url"
                                            type="text"
                                            tabIndex={3}
                                            autoComplete="url"
                                            value={data.url}
                                            onChange={(e) => setData('url', e.target.value)}
                                        />
                                        <InputError message={errors.url} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="body">Letra Cifrada <span className="text-xs ml-3 text-neutral-500">Restam: {5000 - data.body.length + ' caracteres'}</span></Label>
                                        <Textarea
                                            rows={20}
                                            maxLength={5000}
                                            spellCheck={true}
                                            id="body"
                                            required
                                            tabIndex={4}
                                            autoComplete="body"
                                            value={data.body}
                                            onChange={(e) => setData('body', e.target.value)}
                                        />
                                        <InputError message={errors.body} />
                                    </div>

                                    <div className="mt-4 flex items-center justify-start gap-x-6">
                                        <Button type="submit" tabIndex={5} disabled={processing}>
                                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                            Atualizar
                                        </Button>
                                        <Button onClick={() => router.visit("/cifras", {method: 'get'})} type="button" tabIndex={6}>
                                            Cancelar
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
