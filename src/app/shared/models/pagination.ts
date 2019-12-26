export class Pagination {
    current_page: number = 1;

    data: Array<any> = [];

    first_page_url: string = '';

    from: number = 1;

    last_page: number = 1;

    last_page_url: string = '';

    next_page_url: string | null = null;

    path: string = '';

    per_page: number = 10;

    prev_page_url: string | null = null;

    to: number = 2;

    total: number = 2;
}
