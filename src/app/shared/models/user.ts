import {Company} from './company';
import {AccessLevelGroup} from './access-level-group';

export class User {
    id: number;

    name: string;

    email: string;

    password: string;

    password_confirmation: string;

    cpf: string;

    office: string;

    phone: string;

    token: string;

    status: boolean;

    company_id: number;

    created_at: string;

    updated_at: string;

    deleted_at: string;

    company: Company = new Company();

    access_level_groups: Array<AccessLevelGroup> = [];
}
