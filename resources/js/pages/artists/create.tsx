import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cifras',
        href: '/cifras',
    },
    {
        title: 'Nova Cifra',
        href: '/cifras/criar',
    },
];

interface Song {
    title: string,
    artist: string,
    url: string,
    body: string,
}

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<SongForm>({
        title: '',
        artist: '',
        url: '',
        body: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('songs.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nova Cifra" />
            <div className="py-6">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-neutral-900 shadow-sm sm:rounded-lg">
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
                                        <Label htmlFor="body">Letra Cifrada</Label>
                                        <Textarea
                                            rows={20}
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
                                            Salvar
                                        </Button>
                                        <Button type="button" tabIndex={6}>
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
