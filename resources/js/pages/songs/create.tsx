import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

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
export default function Create({ topics }) {
    const { data, setData, post, processing, errors } = useForm<T>({
        title: '',
        artist: '',
        tags: [],
        url: '',
        body: '',
        lyrics: '',
    });

    const handleCheckboxChange = (topicId) => {
        setData((prevData) => {
            const tags = prevData.tags.includes(topicId)
                ? prevData.tags.filter((id) => id !== topicId) // Remove if exists
                : [...prevData.tags, topicId]; // Add if not exists

            return { ...prevData, tags };
        });
    };

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
                                        <p className="mb-4 text-sm">Temas</p>
                                        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                                            {topics.map((topic) => (
                                                <div key={topic.id} className="flex space-x-3">
                                                    <div className="flex gap-3">
                                                        <div className="flex h-6 shrink-0 items-center">
                                                            <div className="group grid size-4 grid-cols-1">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`tag-${topic.id}`}
                                                                    value={topic.id}
                                                                    checked={data.tags.includes(topic.id)}
                                                                    onChange={() => handleCheckboxChange(topic.id)}
                                                                    aria-describedby="tags"
                                                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-neutral-300 bg-neutral-300 checked:border-neutral-600 checked:bg-neutral-600 indeterminate:border-neutral-600 indeterminate:bg-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-neutral-100 disabled:checked:bg-neutral-100 forced-colors:appearance-auto"
                                                                />
                                                                <svg
                                                                    fill="none"
                                                                    viewBox="0 0 14 14"
                                                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                                >
                                                                    <path
                                                                        d="M3 8L6 11L11 3.5"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-checked:opacity-100"
                                                                    />
                                                                    <path
                                                                        d="M3 7H11"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-indeterminate:opacity-100"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="text-sm/6">
                                                            <Label htmlFor={`tag-${topic.id}`}>{topic.name}</Label>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <InputError message={errors.tags} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="body">
                                            Letra Cifrada{' '}
                                            <span className="ml-3 text-xs text-neutral-500">
                                                Restam: {5000 - data.body.length + ' caracteres'}
                                            </span>
                                        </Label>
                                        <Textarea
                                            rows={20}
                                            className="font-mono"
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

                                    <div className="grid gap-2">
                                        <Label htmlFor="lyrics">
                                            Letra{' '}
                                            <span className="ml-3 text-xs text-neutral-500">
                                                Restam: {3000 - data.lyrics.length + ' caracteres'}
                                            </span>
                                        </Label>
                                        <Textarea
                                            rows={20}
                                            className="font-mono"
                                            maxLength={3000}
                                            spellCheck={true}
                                            id="lyrics"
                                            required
                                            tabIndex={5}
                                            autoComplete="lyrics"
                                            value={data.lyrics}
                                            onChange={(e) => setData('lyrics', e.target.value)}
                                        />
                                        <InputError message={errors.lyrics} />
                                    </div>

                                    <div className="mt-4 flex items-center justify-start gap-x-6">
                                        <Button type="submit" tabIndex={6} disabled={processing}>
                                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                            Salvar
                                        </Button>
                                        <Button type="button" tabIndex={7}>
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
