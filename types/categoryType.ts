export interface Category {
    locale: Record<string, { cg_name: string; link: string }>;
    childs?: Category[];
    id: number;
}
