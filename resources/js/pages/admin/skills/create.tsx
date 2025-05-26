import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create skill',
        href: '/admin/skills/create',
    },
];

type SkillForm = {
    name: string;
    type: string;
    logo_url: string;
}


export default function Create() {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<SkillForm>>({
        name: '',
        type: '',
        logo_url: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('skills.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create skill" />
            <div className="px-4 py-6">
                <div className="space-y-6">
                    <HeadingSmall title="Skill information" description="Add new your skill" />
                    <div className="flex-1 md:max-w-2xl">
                        <section className="max-w-xl space-y-12">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>

                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        autoComplete="name"
                                        placeholder="Skill name"
                                    />

                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Type</Label>

                                    <Input
                                        id="type"
                                        className="mt-1 block w-full"
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        required
                                        autoComplete="name"
                                        placeholder="Skill type"
                                    />

                                    <InputError className="mt-2" message={errors.type} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>Save</Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">Saved</p>
                                    </Transition>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
