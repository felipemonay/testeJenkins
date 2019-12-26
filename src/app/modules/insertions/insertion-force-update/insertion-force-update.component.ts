import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InsertionService} from '../insertion.service';
import {Insertion} from '../../../shared/models/insertion';
import {ErrorHandler} from '../../../shared/http/responses/error-handler';
import {SuccessHandler} from '../../../shared/http/responses/success-handler';
import swal from 'sweetalert2';
import {AccessLevelService} from '../../../shared/services/access-level.service';
import {SharedMethodsService} from 'src/app/shared/services/shared-methods.service';
import {MediaModuleService} from '../../../shared/services/media-module.service';
import {Company} from '../../../shared/models/company';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../../shared/models/user';
import {ExtraService} from '../components/extras/extra.service';
import { MmmService } from '../components/mmm/mmm.service';
import { Group } from 'src/app/shared/models/group';

@Component({
    selector:    'app-insertion-force-update',
    templateUrl: './insertion-force-update.component.html',
    providers:   [Company]
})

export class InsertionForceUpdateComponent implements OnInit {

    public insertion: Insertion = new Insertion();
    public user: User = new User();
    private canSubmit = true;
    private access_level: any = {
        page:   'insertions',
        action: 'App\\Http\\Controllers\\Api\\InsertionController@forceUpdate'
    };
    idBloqueio: number;
    public modalShow: any = {
        show: false,
        tag: new Group()
    };
    public modal: any = {
        show: { wizard: false },
        group: new Group(),
        excel: Array
    };
    novo: boolean;

    constructor(private activatedRoute: ActivatedRoute,
                private insertionService: InsertionService,
                private accessLevelService: AccessLevelService,
                private router: Router,
                private cdr: ChangeDetectorRef,
                private  authService: AuthService,
                private extraService: ExtraService,
                private company: Company,
                private sharedMethods: SharedMethodsService,
                public mediaModuleService: MediaModuleService,
                public mmmService: MmmService) {

    }

    get companies() {
        return Company;
    }

    ngOnInit() {
        this.user = this.authService.getAuth();

        this.insertionService.getIdBloqueio().subscribe((data: number) => {
            this.idBloqueio = data;
        });

        this.accessLevelService.is_accessible(this.access_level.page, this.access_level.action).subscribe((data: boolean) => {
            if (!data) {
                return this.router.navigate(['/error/403']);
            }
        });

        this.activatedRoute.queryParams.subscribe(params => {
            if (typeof params['id'] !== 'undefined') {
                return this.getInsertion(params['id']);
            }

            return this.router.navigate(['/error/404']);
        });
    }

    hasNewGroup() {
        let groups: Array<Group>;
        this.mmmService.groups(this.insertion).subscribe(async data => {
            groups = await data;
            groups.forEach(g => {
                if (g.hash === undefined || g.hash === '') {
                    this.mmmService.isNewGroup = true;
                }
            })
        }, error => {
            return new ErrorHandler(error).show();
        });
    }

    getInsertion(id) {
        this.insertionService.find(id).subscribe((insertion: Insertion) => {
            this.insertion = insertion;
            this.hasNewGroup();
            if ( ( insertion.id <= this.idBloqueio && this.mediaModuleService.isEqual(insertion.media, 'DIGITAL')) ) {
                return this.router.navigate(['/error/old-version']);
            }
        }, error => {
            if (error.status === 404) {
                return this.router.navigate(['/error/404']);
            }

            return this.throwError(error);

        });
    }

    send() {
        if (!this.canSubmit) {
            return;
        }
        this.canSubmit = false;
        this.insertionService.forceUpdate(this.insertion).subscribe(data => {
            this.canSubmit = true;
            return new SuccessHandler('Alterações realizadas com sucesso.').show();
        }, error => {
            return this.throwError(error);
        });
    }

    canGenerateHash(piMessage?: string) {
        if (!this.canSubmit) {
            return;
        }
        if (undefined === piMessage || null === piMessage) {
            piMessage = '';
        }
        this.canSubmit = false;
        this.insertionService.canGenerateHash(this.insertion).subscribe(() => {
            swal.fire({
                title:             'Alerta!',
                text:              'Deseja realmente gerar a HASH para esta inserção?\n' + piMessage,
                type:              'warning',
                showCancelButton:  true,
                confirmButtonText: 'Sim, continuar!',
                cancelButtonText:  'Não, cancelar!'
            }).then((response: any) => {
                this.canSubmit = true;
                if (!response.dismiss) {
                    return this.generateHash();
                }
            });
        }, error => {
            return this.throwError(error);
        });
    }

    generateHash() {
        this.novo = true;
        this.modalShow.wizard = true;
    }

    confirm(insertion: Insertion) {
        if (!this.canSubmit) {
            return;
        }
        this.canSubmit = false;
        const self = this;

        swal.fire({
            title:             'Alerta!',
            text:              'Confirmar exclusão da chave de inserção: ' + insertion.campaign_name + ' (' + insertion.id + ')?',
            type:              'warning',
            showCancelButton:  true,
            confirmButtonText: 'Sim, continuar!',
            cancelButtonText:  'Não, cancelar!'
        }).then((response: any) => {
            this.canSubmit = true;
            if (!response.dismiss) {
                self.destroy(insertion);
            }
        });
    }

    destroy(insertion: Insertion) {
        this.insertionService.destroy(insertion).subscribe(response => {
            return new SuccessHandler('Chave de inserção excluída com sucesso.').show().then(() => {
                this.canSubmit = true;
                this.router.navigate(['/insertions']);
            });
        }, error => {
            return this.throwError(error);
        });
    }

    confirmDuplicate(insertion: Insertion) {
        if ((1 === insertion.version && this.mediaModuleService.isEqual(insertion.media, 'DIGITAL')  ) ||
            (1 === insertion.version && insertion.media === 'PERFORMANCE'  ) ||
            (1 === insertion.version && insertion.media === 'MERCHANDISING' ) ) { // && this.mediaModuleService.isEqual(insertion.media, 'DIGITAL')
            this.sharedMethods.openErrorMessage('old-version');
        } else {
            if (!this.canSubmit) {
                return;
            }
            this.canSubmit = false;
            const self = this;
            swal.fire({
                title:             'Alerta!',
                text:              'Confirmar duplicação desta inserção: ' + insertion.campaign_name + ' (' + insertion.id + ')?',
                type:              'warning',
                showCancelButton:  true,
                confirmButtonText: 'Sim, continuar!',
                cancelButtonText:  'Não, cancelar!'
            }).then((response: any) => {
                this.canSubmit = true;
                if (!response.dismiss) {
                    self.duplicate(insertion);
                }
            });
        }
    }

    duplicate(insertion: Insertion) {
        this.insertionService.duplicate(insertion).subscribe((response: any) => {
            if (!response.error) {
                this.canSubmit = true;
                return new SuccessHandler('Chave de inserção duplicada com sucesso.').show().then(() => {
                    this.router.navigate(['/insertions/force-update'], {queryParams: {id: response.id}});
                });
            } else {
                return this.throwError(response.error);

            }
        }, error => {
            return this.throwError(error);
        });
    }

    onChange(insertion: Insertion) {
        if (!insertion.pi_number) {
            return;
        }
        if (!this.canSubmit) {
            return;
        }
        this.canSubmit = false;
        insertion.pi_number = insertion.pi_number
                                       .replace(/[^0-9;]/g, '')
                                       .replace(/[;]/g, ' ')
                                       .trim()
                                       .replace(/\s/g, ';');
        this.insertionService.forceUpdate(insertion).subscribe(() => {
            this.extraService.createOrUpdate(this.insertion, this.insertion.extra, true).subscribe(() => {
                this.insertionService.handlesPiNumbers(insertion).subscribe(() => {
                    this.canSubmit = true;
                    return this.canGenerateHash();
                }, error => {
                    this.canSubmit = true;
                    return this.canGenerateHash(error.error.errors.confirmation[0]);
                });
            }, error => {
                return this.throwError(error);
            });
        }, error => {
            return this.throwError(error);
        });
    }

    showModalWizard(group: Group) {
        this.modalShow.group = group;
        this.modalShow.wizard = true;
    }


    // ---------------------------------------------------------------------------------------------------------


    sendPredicta(insertion: Insertion) {
        if (!insertion.pi_number) {
            return;
        }
        if (!this.canSubmit) {
            return;
        }
        this.canSubmit = false;


        insertion.pi_number = insertion.pi_number
                                       .replace(/[^0-9;]/g, '')
                                       .replace(/[;]/g, ' ')
                                       .trim()
                                       .replace(/\s/g, ';');


        this.insertionService.forceUpdate(insertion).subscribe(() => {

            this.extraService.createOrUpdate(this.insertion, this.insertion.extra, true).subscribe(() => {

                this.insertionService.handlesPiNumbers(insertion).subscribe(() => {


                    this.insertionService.canGenerateHash(this.insertion, 0).subscribe(() => {


                        return this.showSendPredictaMrssage('');

                    }, errorCanG => {
                        return this.throwError(errorCanG);
                    });

                }, error => {

                    const t = `<br><br> <i class="fa fa-warning " style="color:#ff8c00" ></i><strong> Atenção: </strong>` +
                              Object.values(error.error.errors)[0][0];

                    this.insertionService.canGenerateHash(this.insertion, 0).subscribe(() => {


                        return this.showSendPredictaMrssage(t);

                    }, errorCanG => {
                        return this.throwError(errorCanG);
                    });
                });
            }, error => {
                return this.throwError(error);
            });

        }, error => {
            return this.throwError(error);
        });
    }

    showSendPredictaMrssage(piMessage) {
        this.canSubmit = false;
        return this.insertionService.sendPredicta(this.insertion).subscribe((res: Object) => {
            const keys = Object.keys(res);
            const nameList = keys.map((elem, index, arr) => '<strong>' + elem + ': </strong> ' + res[elem]+ ' <br>').join('');


            swal.fire({
                title:             'Dados Salvos!',
                html:              `<div style="text-align: center">A inserção foi salva e encaminhada com sucesso!</div>
                <br><div style="text-align: left">Foi enviado uma notificação para a Predicta sobre os dados online (Excel) com status: <strong>'INSERIR'</strong>! através dos e-mails: `+
                    `<br><br>` +nameList+ '<br><br></div>',
                type:              'success',
                showCancelButton:  false,
                confirmButtonText: 'Continuar!'
            }).then((response: any) => {

                this.canSubmit = true;
                return this.router.navigate(['/insertions/show'], {queryParams: {id: this.insertion.id}});
            });
        }, errorCanG => {
            return this.throwError(errorCanG);
        });

    }

    newGenerateHash() {
        this.modalShow.wizard = true;
    }
    newCanGenerateHash() {
        this.insertionService.newCanGenerateHash(this.insertion).subscribe((data: any) => {
            swal.fire({
                title: 'Alerta!',
                text: 'Deseja realmente gerar a nova HASH para o(s) novo(s) criativo(s)?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, continuar!',
                cancelButtonText: 'Não, cancelar!'
            }).then((response: any) => {
                this.canSubmit = true;
                if (!response.dismiss) {
                    return this.newGenerateHash();
                }
            });
        }, error => {
            return this.throwError(error);
        })
    }

    throwError(error) {
        this.canSubmit = true;
        return new ErrorHandler(error).show();

    }
}
