import {Tag} from './tag';
import {Insertion} from './insertion';
import {Digital} from './digital';

export class Group {
    id: number;

    name: string;

    currentName: string;

    hash: string;

    investment: string;

    insertion_id: number;

    ad: string;

    ad_group: string;

    unit_cost: number;

    insertion_group_tag_id: number;

    created_at: string;

    updated_at: string;

    deleted_at: string;

    insertion_tags: Array<Tag>;

    insertion: Insertion = new Insertion();

    media_id: string;

    digital: Array<Digital> = [];
}
