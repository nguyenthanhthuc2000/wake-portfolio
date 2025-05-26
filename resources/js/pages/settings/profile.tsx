import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    name: string;
    email: string;
    introduce: string;
    image_url?: string;
    github_url?: string;
    linkedin_url?: string;
    facebook_url?: string;
    cv_url?: string;
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
        introduce: auth.user.introduce || '',
        image_url: auth.user.image_url || '',
        github_url: auth.user.github_url || '',
        linkedin_url: auth.user.linkedin_url || '',
        facebook_url: auth.user.facebook_url || '',
        cv_url: auth.user.cv_url || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile information" description="Update your name and email address" />

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
                                placeholder="Full name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="introduce">Introduce</Label>

                            <Input
                                id="introduce"
                                className="mt-1 block w-full"
                                value={data.introduce}
                                onChange={(e) => setData('introduce', e.target.value)}
                                required
                                
                                autoComplete="introduce"
                                placeholder="Introduce yourself"
                            />

                            <InputError className="mt-2" message={errors.introduce} />
                        </div>
                        
                        <div className="grid gap-2">
                            <Label htmlFor="github_url">Github URL</Label>

                            <Input
                                id="github_url"
                                className="mt-1 block w-full"
                                value={data.github_url}
                                onChange={(e) => setData('github_url', e.target.value)}
                                required
                                autoComplete="github_url"
                                placeholder="Github URL"
                            />

                            <InputError className="mt-2" message={errors.github_url} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="linkedin_url">Linkedin URL</Label>
                            <Input
                                id="linkedin_url"
                                className="mt-1 block w-full"
                                value={data.linkedin_url}
                                onChange={(e) => setData('linkedin_url', e.target.value)}
                                required
                                autoComplete="linkedin_url"
                                placeholder="Linkedin URL"
                            />

                            <InputError className="mt-2" message={errors.linkedin_url} />
                        </div>
                        
                        <div className="grid gap-2">
                            <Label htmlFor="facebook_url">Facebook URL</Label>

                            <Input
                                id="facebook_url"
                                className="mt-1 block w-full"
                                value={data.facebook_url}
                                onChange={(e) => setData('facebook_url', e.target.value)}
                                required
                                autoComplete="facebook_url"
                                placeholder="Facebook URL"
                            />

                            <InputError className="mt-2" message={errors.facebook_url} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="cv_url">CV URL</Label>

                            <Input
                                id="cv_url"
                                className="mt-1 block w-full"
                                value={data.cv_url}
                                onChange={(e) => setData('cv_url', e.target.value)}
                                required
                                autoComplete="cv_url"
                                placeholder="CV URL"
                            />

                            <InputError className="mt-2" message={errors.cv_url} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

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
                </div>

            </SettingsLayout>
        </AppLayout>
    );
}
