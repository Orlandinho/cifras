import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Artist {
    name: string;
    slug: string;
}

export default function Edit({ artist }: { artist: Artist }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Cifras',
            href: '/cifras',
        },
        {
            title: artist.name,
            href: '/artistas/' + artist.slug,
        },
        {
            title: 'Editar',
            href: '/cifras/' + artist.slug + '/editar',
        },
    ];

    const { data, setData, patch, processing, errors } = useForm<ArtistForm>({
        name: artist.name,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('artists.update', artist));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nova Cifra" />
            <div className="py-6">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-neutral-50 shadow-sm sm:rounded-lg dark:bg-neutral-900">
                        <div className="p-6">
                            <form className="flex flex-col gap-6" onSubmit={submit}>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nome</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        <InputError message={errors.name || errors.slug} />
                                    </div>

                                    <div className="mt-4 flex items-center justify-start gap-x-6">
                                        <Button type="submit" tabIndex={2} disabled={processing}>
                                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                            Atualizar
                                        </Button>
                                        <Button
                                            onClick={() => router.visit('/artistas', { method: 'get' })}
                                            type="button"
                                            tabIndex={3}
                                        >
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
