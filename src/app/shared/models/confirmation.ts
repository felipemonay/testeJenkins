import {User} from './user';

export class Confirmation {
    id: number;

    insertion_id: number;

    user_id: number;

    created_at: string;

    updated_at: string;

    deleted_at: string;

    user: User = new User();
}
