import {PiType} from './pi-type';
import {Flag} from './flag';
import {User} from './user';
import {Mrm} from './mrm';
import {Group} from './group';
import {Confirmation} from './confirmation';
import {ImpactType} from './impact-type';
import {Extra} from './extra';
import {MediaModule} from './redshift/media-module';

export class Insertion {
    id: number;

    reference_date: string;

    area: string;

    media: string;

    campaign_name: string;

    pi_number: string;

    investment: number;

    pi_not_rated: boolean;

    unit_cost: number;

    impact: number;

    impact_type_id: number;

    comments: string;

    initiative_id: string;

    pi_type_id: number;

    user_id: number;

    insertion_id: number;

    created_at: string;

    updated_at: string;

    deleted_at: string;

    user: User = new User();

    mrm: Mrm = new Mrm();

    confirmation: Confirmation = new Confirmation();

    extra: Extra = new Extra();

    pi_type: PiType = new PiType();

    impact_type: ImpactType = new ImpactType();

    initiative: Flag = new Flag();

    insertion_group_tags: Array<Group> = [];

    deleted_user: User = new User();

    media_module: MediaModule = new MediaModule();

    version: number;
}
