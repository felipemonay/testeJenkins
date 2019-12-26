import {User} from './user';

export class Contact {
    id: number;

    title: string;

    description: string;

    user_id: number;

    created_at: string;

    updated_at: string;

    deleted_at: string;

    user: User = new User();
}
