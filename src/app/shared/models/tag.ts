export class Tag {
    id: number;

    primary_segmentation: string;

    secondary_segmentation: string;

    nature: string;

    objective: string;

    product: string;

    priority: boolean = false;

    insertion_group_tag_id: number;

    // digital: Array<Digital> = [];

    created_at: string;

    updated_at: string;

    deleted_at: string;
}
