import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tech Stack',
        href: '/admin/skills',
    },
];

type Skills = {
    id: number;
    name: string;
    description: string;
    type: string;
    logo_url: string;
    created_at: string;
}

type SkillsProps = {
    skills: Skills[],
}

export default function Skills({ skills }: SkillsProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tech Stack" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="flex items-center justify-between border-b p-4">
                        <h1 className="text-xl font-semibold">Tech Stack</h1>
                        <a href="/admin/skills/create" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Add New Skill
                        </a>
                    </div>
                    <div className="grid auto-rows-min gap-4">
                        <ul role="list" className="divide-y divide-gray-100 pr-5 pl-5">
                            <li className="flex justify-between gap-x-6 py-5">
                                <div className="flex min-w-0 gap-x-4">
                                    Skill Name
                                </div>
                                <div className="flex min-w-0 gap-x-4">
                                    Special
                                </div>
                                <div className="flex min-w-0 gap-x-4">
                                    Created At
                                </div>
                                <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                                    Action
                                </div>
                            </li>
                            {
                                skills.map((skill) => (
                                    <li key={skill.id} className="flex justify-between gap-x-6 py-5">
                                        <div className="flex min-w-0 gap-x-4">
                                            <img className="size-12 flex-none rounded-full bg-gray-50" src={skill.logo_url} alt={skill.name} />
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm/6 font-semibold text-gray-900">{skill.name}</p>
                                                <p className="mt-1 truncate text-xs/5 text-gray-500">{skill.type}</p>
                                            </div>
                                        </div>
                                        <div className="flex min-w-0 gap-x-4">
                                            <input type="checkbox" checked />
                                        </div>
                                        <div className="flex min-w-0 gap-x-4">
                                            {skill.created_at}
                                        </div>
                                        <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
