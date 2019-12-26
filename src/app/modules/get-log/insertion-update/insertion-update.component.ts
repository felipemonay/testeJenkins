import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/shared/models/group';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../../shared/http/responses/error-handler';
import { SuccessHandler } from '../../../shared/http/responses/success-handler';
import { Company } from '../../../shared/models/company';
import { Insertion } from '../../../shared/models/insertion';
import { User } from '../../../shared/models/user';
import { MediaModuleService } from '../../../shared/services/media-module.service';
import { AuthService } from '../../auth/auth.service';
import { ExtraService } from '../components/extras/extra.service';
import { MmmService } from '../components/mmm/mmm.service';
import { InsertionToastService } from '../insertion-toast.service';
import { InsertionService } from '../insertion.service';


@Component({
    selector: 'app-insertion-update',
    templateUrl: './insertion-update.component.html',
    providers: [Company]

})

export class InsertionUpdateComponent implements OnInit {

    public insertion: Insertion = new Insertion();
    errorMessage: string;
    public user: User = new User();
    private canSubmit = true;
    predicta = false;
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
    step: boolean;
    novo: boolean;

    constructor(private activatedRoute: ActivatedRoute,
        private insertionService: InsertionService,
        private router: Router,
        private sharedMethods: SharedMethodsService,
        private extraService: ExtraService,
        private company: Company,
        private authService: AuthService,
        public mediaModuleService: MediaModuleService,
        private insertionToastService: InsertionToastService,
        public mmmService: MmmService) {
    }

    get companies() {
        return Company;
    }

    ngOnInit() {
        this.user = this.authService.getAuth();
        this.activatedRoute.queryParams.subscribe(params => {
            if (typeof params['id'] !== 'undefined') {
                return this.getInsertion(params['id']);
            }

            return this.router.navigate(['/error/404']);
        });

        this.insertionService.getIdBloqueio().subscribe((data: number) => {
            this.idBloqueio = data;
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
            this.insertionService.isEditable(insertion).subscribe(() => {
                this.insertionToastService.updateToastr(insertion);
            }, async error => {
                await new ErrorHandler(error).show();
                    return this.router.navigate(['/insertions/show'], { queryParams: { id: insertion.id } });
            });
            
            this.insertion = insertion;
            this.hasNewGroup();

            if (( insertion.id <= this.idBloqueio && this.mediaModuleService.isEqual(insertion.media, 'DIGITAL'))) { 
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
        this.insertionService.update(this.insertion).subscribe(data => {
            this.canSubmit = true;
            this.insertionToastService.updateToastr(this.insertion);
            return new SuccessHandler('Alterações realizadas com sucesso.').show();
        }, error => {
            this.canSubmit = true;
            return this.throwError(error);
        });
    }


    confirm(insertion: Insertion) {
        const self = this;

        swal.fire({
            title: 'Alerta!',
            text: 'Confirmar exclusão da chave de inserção: ' + insertion.campaign_name + ' (' + insertion.id + ')?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, continuar!',
            cancelButtonText: 'Não, cancelar!'
        }).then((response: any) => {
            this.canSubmit = true;
            if (!response.dismiss) {
                self.destroy(insertion);
            }
        });
    }

    destroy(insertion: Insertion) {
        if (!this.canSubmit) {
            return;
        }
        this.canSubmit = false;
        this.insertionService.destroy(insertion).subscribe(response => {
            this.canSubmit = true;
            return new SuccessHandler('Chave de inserção excluída com sucesso.').show().then(() => {
                this.router.navigate(['/insertions']);
            });
        }, error => {
            return this.throwError(error);
        });
    }

    confirmDuplicate(insertion: Insertion) {
        if ((1 === insertion.version && this.mediaModuleService.isEqual(insertion.media, 'DIGITAL')) ||
            (1 === insertion.version && insertion.media === 'PERFORMANCE') ||
            (1 === insertion.version && insertion.media === 'MERCHANDISING')) {  // && this.mediaModuleService.isEqual(insertion.media, 'x_DIGITAL')) {
            this.sharedMethods.openErrorMessage('old-version');
        } else {
            const self = this;

            swal.fire({
                title: 'Alerta!',
                text: 'Confirmar duplicação desta inserção: ' + insertion.campaign_name + ' (' + insertion.id + ')?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, continuar!',
                cancelButtonText: 'Não, cancelar!'
            }).then((response: any) => {
                this.canSubmit = true;
                if (!response.dismiss) {
                    self.duplicate(insertion);
                }
            });
        }
    }

    duplicate(insertion: Insertion) {
        if (!this.canSubmit) {
            return;
        }
        this.canSubmit = false;
        this.insertionService.duplicate(insertion).subscribe((response: any) => {
            if (!response.error) {
                return new SuccessHandler('Chave de inserção duplicada com sucesso.').show().then(() => {
                    this.canSubmit = true;
                    this.router.navigate(['/insertions/update'], { queryParams: { id: response.id } });
                });
            } else {
                return this.throwError(response.error);

            }
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
        this.insertionToastService.updateToastr(this.insertion);
        this.insertionService.canGenerateHash(this.insertion).subscribe(() => {
            this.canSubmit = true;
            swal.fire({
                title: 'Alerta!',
                text: 'Deseja realmente gerar a HASH para esta inserção?\n' + piMessage,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, continuar!',
                cancelButtonText: 'Não, cancelar!'
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

    canGenerateHashAndSendPredicta(piMessage?: string) {
        if (!this.canSubmit) {
            return;
        }
        if (undefined === piMessage || null === piMessage) {
            piMessage = '';
        }
        this.insertionToastService.updateToastr(this.insertion);
        this.canSubmit = false;
        this.insertionService.canGenerateHash(this.insertion).subscribe(() => {
            this.canSubmit = true;
            swal.fire({
                title: 'Alerta!',
                text: 'Deseja realmente gerar a HASH para esta inserção e enviar e-mail para Predicta?\n' + piMessage,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, continuar!',
                cancelButtonText: 'Não, cancelar!'
            }).then((response: any) => {
                this.canSubmit = true;
                if (!response.dismiss) {
                    return this.sendPredictaAndGenHash();
                }
            });
        }, error => {
            return this.throwError(error);
        });
    }

    generateHash() {
        this.modalShow.wizard = true;
        this.novo = true;
    }

    sendPredictaAndGenHash() {
        this.novo = true;
        this.predicta = true;
        this.modalShow.wizard = true;
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


        this.insertionService.update(insertion).subscribe(() => {

            this.extraService.createOrUpdate(this.insertion, this.insertion.extra, false).subscribe(() => {

                this.insertionService.handlesPiNumbers(insertion).subscribe(() => {
                    this.canSubmit = true;
                    return this.canGenerateHash();
                }, error => {
                    this.canSubmit = true;
                    return this.canGenerateHash(error.error.errors.confirmation[0]);
                });

            }, error => {
                return this.throwError(error);
            }
            );

        }, error => {
            return this.throwError(error);
        });
    }

    onChangeAndSend(insertion: Insertion) {
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


        this.insertionService.update(insertion).subscribe(() => {

            this.extraService.createOrUpdate(this.insertion, this.insertion.extra, false).subscribe(() => {

                this.insertionService.handlesPiNumbers(insertion).subscribe(() => {
                    this.canSubmit = true;
                    return this.canGenerateHashAndSendPredicta();
                }, error => {
                    this.canSubmit = true;
                    return this.canGenerateHashAndSendPredicta(error.error.errors.confirmation[0]);
                });

            }, error => {
                return this.throwError(error);
            }
            );

        }, error => {
            return this.throwError(error);
        });
    }

    // ---------------------------------------------------------------------------------------------------------

    throwError(error) {
        this.canSubmit = true;
        return new ErrorHandler(error).show();

    }


}
