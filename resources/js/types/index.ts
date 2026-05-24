import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
}

export interface Schedule {
    id: number;
    date: string;
    song: Song;
}

export interface Song {
    id: number;
    title: string;
    slug: string;
    url: string;
    body: string;
    lyrics: string;
    artist: Artist;
    tags?: Tag[];
    schedules: Schedule[];
    schedules_for_today: Schedule;
}

export interface Artist {
    id: number;
    name: string;
    slug: string;
    songs: Song[];
    songs_count?: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
