import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Group} from '../../../../../../shared/models/group';
import {Insertion} from '../../../../../../shared/models/insertion';
import {MmmService} from '../../mmm.service';
import {SuccessHandler} from '../../../../../../shared/http/responses/success-handler';
import {ErrorHandler} from '../../../../../../shared/http/responses/error-handler';
import swal from 'sweetalert2';
import {SourceService} from './source.service';
import {DigitalSources} from '../../../../../../shared/models/DigitalSources';
import {ValidateExcelDataService} from '../../../../../../shared/services/validate-excel-data.service';
import {HotTableComponent, HotTableRegisterer} from '@handsontable/angular';
import '../../../../../../../../node_modules/handsontable/languages/pt-BR';
import {Extra} from '../../../../../../shared/models/extra';
import {DigitalSourceTree} from '../../../../../../shared/models/digital-source-tree';
import {AlertService} from '../../../../../../core/alert.service';
import Handsontable from 'handsontable';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-modal-excel',
    templateUrl: './modal-excel.component.html'

})

export class ModalExcelComponent implements OnInit {

    @ViewChild('_handsontable')
    public _handsontable = HotTableComponent;

    @ViewChild('alert_text_valid') public alert_text_valid: ElementRef;

    @ViewChild('alert_text_duplicated') public alert_text_duplicated: ElementRef;

    @ViewChild('alert_text_empty') public alert_text_empty: ElementRef;

    @ViewChild('alert_midia_correpondence_search') public alert_midia_correpondence_search: ElementRef;

    @ViewChild('alert_midia_correpondence_not_search') public alert_midia_correpondence_not_search: ElementRef;

    @ViewChild('alert_channel_segmentacao') public alert_channel_segmentacao: ElementRef;

    // @ViewChild('alert_views_midia') public alert_views_midia: ElementRef;

    public alertElements: Array<any> = [];
    public hasAlertMessage = false;

    @Input()
    public action = 'create';

    @Input()
    public group: Group = new Group();

    @Output()
    public doClose: EventEmitter<any> = new EventEmitter();
    @Output()
    public doCancel: EventEmitter<any> = new EventEmitter();

    public source: DigitalSources = null;
    public digitalSourceTreeList: Array<DigitalSourceTree> = [];
    public contextMenuData = {items: {}};

    // public data: Array<Digital> = [];
    public validateExcelData: ValidateExcelDataService = ValidateExcelDataService.getInstance();
    public columns = [];
    public hotInstance: Handsontable = null;
    public instanceName = 'hot';
    private canSubmit = true;
    public isLoading = false;
    public isSaving = false;
    public isSpinner = false;
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


    constructor(private mmmService: MmmService,
                private sourceService: SourceService,
                private alertService: AlertService,
                private hotRegisterer: HotTableRegisterer,
                private cdr: ChangeDetectorRef) {

        this.validateExcelData.cdr = cdr;


    }

    public _insertion: Insertion = new Insertion();

    @Input()
    set insertion(insertion: Insertion) {

        this._insertion = insertion;
        if (insertion.confirmation) {
            this.contextMenuData.items = {
                row_above: {
                    name: 'Inserir linha acima.'
                },
                row_below: {
                    name: 'Inserir linha abaixo'
                }
            };


        } else {


            this.contextMenuData.items = {
                row_above: {
                    name: 'Inserir linha acima.'
                },
                row_below: {
                    name: 'Inserir linha abaixo'
                },
                // remove_row: {
                //     name: 'Ifddddxo'
                // },
                about: {
                    name: function () { // `name` can be a string or a function
                        return '<b>Remover Linha</b>'; // Name can contain HTML
                    },
                    callback: function (key, selection, clickEvent) { // Callback for specific option
                        // excelHT.getData()

                        const start = selection[0].start.row;
                        const end = selection[0].end.row;
                        const ht = ValidateExcelDataService.getInstance().modal.hotInstance;
                        const modal = ValidateExcelDataService.getInstance().modal;
                        ht.alter('remove_row', start, end - start + 1);


                        setTimeout((___modal) => {
                            ___modal.hotAfterChange(___modal.hotInstance, null, null);
                        }, 100, modal);
                    }
                }
            };


        }


    }

    public _extra: Extra;

    @Input()
    set extra(extra: Extra) {
        this._extra = extra;
        const p = null === this._extra || undefined === this._extra ||
        null == this._extra.media_adserver_platform || undefined === this._extra.media_adserver_platform ?
            'empty' : this._extra.media_adserver_platform;

        this.validateExcelData.setPlatform(p);

        if (this.validateExcelData.platform !== '' && this.source) {
            this.columns = this.validateExcelData.getColumns(this.source);

        }
    }

    public _show = false;

    @Input()
    set show(show: boolean) {
        setTimeout(() => {
            if (show) {

                if (this.digitalSourceTreeList.length === 0) {

                    if (this.source === null) {
                        this.sourceService.all(this._insertion.extra.media_adserver_platform).subscribe(allResponse => {
                            this.source = allResponse;
                            ValidateExcelDataService.getInstance().modal = this;

                            if (this.validateExcelData.platform !== '' && this.source) {
                                this.columns = this.validateExcelData.getColumns(this.source);
                            }
                            this.setupHT(show);
                        });
                    } else {
                        this.setupHT(show);
                    }

                } else {
                    this._show = show;
                    // setTimeout(() => {
                    //
                    //     // this.hotAfterChange(this.hotInstance, null, null);
                    //
                    // }, 20);
                }


            } else {
                this._show = show;
            }
        }, 100);

    }

    @Input()
    set _group(group: Group) {
        this.group = group;

    }

    setupHT(show: boolean) {

        const data = {
            meio: this._insertion.media,
            veiculo: this._extra.media_owner || null,
            ad_server: this._extra.media_adserver_platform || null
        };

        this.alertElements = [
            {element: this.alert_text_valid, isVisible: false},
            {element: this.alert_text_duplicated, isVisible: false},
            {element: this.alert_text_empty, isVisible: false},
            {element: this.alert_midia_correpondence_search, isVisible: false},
            {element: this.alert_midia_correpondence_not_search, isVisible: false},
            {element: this.alert_channel_segmentacao, isVisible: false},
            // {element: this.alert_views_midia, isVisible: false},

        ];
        this.updateElementRefContent();

        if (data.meio && data.veiculo && data.ad_server && this.group.digital) {

            this.sourceService.getTree(data).subscribe(treeData => {


                this.digitalSourceTreeList = treeData;
                this.validateExcelData.digitalSourceTreeList = treeData;
                this._show = show;

                const __data = [];


                this.group.digital.map((row, index) => {
                    __data.push(Object.assign({}, this.group.digital[index]));
                });
                // this.hotInstance.getSettings().minRows = __data.length + 1 < 15 ? 15 : __data.length + 1;
                // console.log()
                setTimeout(() => {
                    this.hotInstance.loadData(__data);

                }, 300);
            });


        }
    }

    ngOnInit() {


        setTimeout(() => {
            this.hotInstance = this.hotRegisterer.getInstance(this.instanceName);

        }, 200);

    }

    public notDeleteRow(core, keyEvent) {
        if (keyEvent === 'Delete' || keyEvent.keyCode === 46 || keyEvent === 'Backspace' || keyEvent.keyCode === 8) {
            keyEvent.stopImmediatePropagation();
        }
    }

    public loadingBehavior(condition: boolean) {
        this.isSpinner = condition;
        this.isLoading = condition;
    }

    public savingBehavior(condition: boolean) {
        this.isSpinner = condition;
        this.isSaving = condition;
    }

    close = (isCancel: boolean) => {
        this.group = new Group();
        this.hotInstance.selectCell(0, 0);
        this.digitalSourceTreeList.splice(0, this.digitalSourceTreeList.length);
        this.validateExcelData.digitalSourceTreeList.splice(0, this.validateExcelData.digitalSourceTreeList.length);
        this.doClose.emit(true);
        this.hotInstance.loadData([]);


        this.hotInstance.getPlugin('filters').clearConditions();
        this.hotInstance.getPlugin('filters').filter();


        this.updateElementRefContent();

        return isCancel ? this.doCancel.emit(true) : null;
    };

    hotBeforeChange = (core, sources: Array<Array<any>>) => {
        // sources - [ [3 linha, "segmentation" coluna , "2341" old_Value , "23452345" new_value],
        // [3, "segmentation", "2341", "23452345"]]
        sources.forEach((elem) => {
            const columnName = elem[1];
            const rowNumber = elem[0];
            const oldValue = elem[2];
            let newValue = elem[3];

            switch (columnName.toString().toLowerCase()) {
                case 'duration':
                    if (newValue !== null && newValue !== undefined) {
                        if (isNaN(newValue) || ((typeof newValue === 'string') && newValue === '')) {
                            if (newValue === '') {
                                newValue = undefined;
                            } else {
                                newValue = 'NA';
                            }
                        } else {
                            newValue = parseInt(newValue, 10);
                        }
                    }

                    break;
                case 'base_url':
                    if ('' === newValue) {
                        newValue = null;
                    } else {
                        newValue = 'https://' + elem[3]
                            .trim()
                            .replace(/^[htps\/:]+\//g, '') || '';
                           // .replace(/[^A-Za-z0-9\s\-\/\.\#\_]+/g, '')
                    }
                    break;
                case 'status':

                    break;
                case 'creative_line':
                    if ('' === newValue) {
                        newValue = null;
                    } else {
                        newValue = elem[3]
                            .replace(/[^A-Za-z0-9\s\-]+/g, '')
                            .trim()
                            .replace(/[\s]+/g, '-') || '';
                    }

                    break;
                case 'agency_field':
                    if ('' === newValue) {
                        newValue = null;
                    } else {
                        newValue = elem[3]
                            .replace(/[^A-Za-z0-9\s\-]+/g, '')
                            .trim()
                            .replace(/[\s]+/g, '-')
                            .substring(0, 25) || '';
                    }

                    break;
                default:
                    break;
            }


            elem[3] = newValue;
        });
    };

    hotAfterSelection = (core, initialRow, initialCol, finalRow, finalCol) => {
        if ((initialCol === finalCol) && (initialRow === finalRow)) {
            const rowMeta = this.hotInstance.getCellMetaAtRow(initialRow) || null;
            if (rowMeta === null) {
                return;
            }

            const metaCell = rowMeta[initialCol] || null;
            if (metaCell === null) {
                return;
            }
            const rowData = this.hotInstance.getDataAtRow(initialRow) || null;
            if (rowData === null) {
                return;
            }
            const filter = new DigitalSourceTree();

            filter.canal = (initialCol !== 2) ? rowData[2] || null : null;
            filter.tipo_midia = (initialCol !== 3) ? rowData[3] || null : null;
            filter.formato = (initialCol !== 4) ? rowData[4] || null : null;
            filter.duracao = (initialCol !== 5) ? rowData[5] || null : null;

            const dic = {
                format: 'formato',
                channel: 'canal',
                duration: 'duracao',
                media_type: 'tipo_midia'
            };

            const prop = dic[metaCell.prop];
            if (prop) {
                metaCell.source = this.validateExcelData.filterTreeList(this.digitalSourceTreeList, filter, prop);
            }
        }
    };


    hotAfterChange = (core, changes: Array<any>, action) => {
        if (!this.validateExcelData.platform) {
            return;
        }
        core.validateCells(this.onValidateCells);

        const sourceData = core.getSourceData();
        const duplicatedData = this.validateExcelData.validateDuplicated(sourceData);
        const alertDuplicated = duplicatedData.length > 0 ? 'Registros duplicados: ' + duplicatedData.join(', ') : null;
        this.updateElementRefContent(this.alert_text_duplicated, alertDuplicated);

        const emptyCells = this.validateExcelData.validateEmpty(sourceData);
        const alertEmpty = emptyCells.length > 0 ? 'Linhas com colunas vazias: ' + emptyCells.join(', ') : null;
        this.updateElementRefContent(this.alert_text_empty, alertEmpty);


        /*
        {
           alert_midia_correpondence_search: [],
           alert_midia_correpondence_not_search: [],
           alert_channel_segmentacao: [],
           alert_views_midia: [],
       }
        */
        const arbitraryRules = this.validateExcelData.validateArbitraryRules(sourceData, this._insertion, this._extra);

        const text_alert_midia_correpondence_search = arbitraryRules.alert_midia_correpondence_search.length > 0 ?
            'Para tipo de mídia "SEARCH", a correspondência precia ser diferente de "NA". Linhas: ' + arbitraryRules.alert_midia_correpondence_search.join(', ') : null;
        this.updateElementRefContent(this.alert_midia_correpondence_search, text_alert_midia_correpondence_search);

        const text_alert_midia_correpondence_not_search = arbitraryRules.alert_midia_correpondence_not_search.length > 0 ?
            'Para tipo de mídia diferente de "SEARCH", a correspondência precisa ser "NA". Linhas: ' + arbitraryRules.alert_midia_correpondence_not_search.join(', ') : null;
        this.updateElementRefContent(this.alert_midia_correpondence_not_search, text_alert_midia_correpondence_not_search);


        const text_alert_channel_segmentacao = arbitraryRules.alert_channel_segmentacao.length > 0 ?
            'Para tipo de segmentação "RLSA", o canal deve ser "SEARCH". Linhas: ' + arbitraryRules.alert_channel_segmentacao.join(', ') : null;
        this.updateElementRefContent(this.alert_channel_segmentacao, text_alert_channel_segmentacao);


        // const text_alert_views_midia = arbitraryRules.alert_views_midia.length > 0 ?
        //     'Para tipo de impacto "VIEW", a tipo de mídia deve ser "VIDEO". Linhas: ' + arbitraryRules.alert_views_midia.join(', ') : null;
        // this.updateElementRefContent(this.alert_views_midia, text_alert_views_midia);

        this.paintRow(changes, core);

    };



    onValidateCells = (isValid) => {
        const validateExcelData: ValidateExcelDataService = ValidateExcelDataService.getInstance();
        const modal = validateExcelData.modal;
        if (modal) {
            const validText = !isValid ? 'Existem valores incorretos na planilha.' : null;
            modal.updateElementRefContent(modal.alert_text_valid, validText);
        }
    };


    paintRow(changes, core) {


        const ved = ValidateExcelDataService.getInstance();
        const columns = ved.getPlatformColumns();
        const insertion = this._insertion;
        const isConfirmed = insertion.confirmation != null;


        if (!changes) {

            core.getSourceData().forEach((elem, indexRow) => {

                const elemStatus = elem.status ? elem.status.toLocaleLowerCase() : '';

                if (isConfirmed) {
                    if ('xinativado' === elemStatus) {
                        columns.forEach((columnElem, indexCol) => {
                            core.setCellMeta(indexRow, indexCol, 'className', 'handsontable-disabled');
                            core.setCellMeta(indexRow, indexCol, 'readOnly', true);
                        });
                    } else if ('inserir' === elemStatus) {
                        columns.forEach((columnElem, indexCol) => {
                            core.setCellMeta(indexRow, indexCol, 'className', 'handsontable-color__render');
                            core.setCellMeta(indexRow, indexCol, 'readOnly', false);
                        });
                    } else {
                        columns.forEach((columnElem, indexCol) => {
                            core.setCellMeta(indexRow, indexCol, 'className', 'handsontable-uncolor__render');
                            core.setCellMeta(indexRow, indexCol, 'readOnly', false);
                        });
                    }
                } else {
                    if ('inserir' === elemStatus) {
                        columns.forEach((columnElem, indexCol) => {
                            core.setCellMeta(indexRow, indexCol, 'className', 'handsontable-color__render');
                            core.setCellMeta(indexRow, indexCol, 'readOnly', false);
                        });
                    } else {
                        columns.forEach((columnElem, indexCol) => {
                            core.setCellMeta(indexRow, indexCol, 'className', 'handsontable-uncolor__render');
                            core.setCellMeta(indexRow, indexCol, 'readOnly', false);
                        });
                    }
                }


            });


        } else {
            changes.forEach((elem) => {
                const elemStatus = elem[3] ? elem[3].toString().toLowerCase() : '';
                const elemColumn = elem[1].toString().toLowerCase();
                const indexRow = elem[0];
                if (isConfirmed) {
                    if ('status' === elemColumn && 'xinativado' === elemStatus) {
                        columns.forEach((columnElem, indexCol) => {
                            core.setCellMeta(indexRow, indexCol, 'className', 'handsontable-semi-disabled');
                            core.setCellMeta(indexRow, indexCol, 'readOnly', false);
                        });
                    } else if ('status' === elemColumn && 'inserir' === elemStatus) {
                        columns.forEach((columnElem, indexCol) => {
                            core.setCellMeta(indexRow, indexCol, 'className', 'handsontable-color__render');
                            core.setCellMeta(indexRow, indexCol, 'readOnly', false);
                        });
                    } else if ('status' === elemColumn) {
                        columns.forEach((columnElem, indexCol) => {
                            core.setCellMeta(indexRow, indexCol, 'className', 'handsontable-uncolor__render');
                            core.setCellMeta(indexRow, indexCol, 'readOnly', false);
                        });
                    }
                } else {
                    if ('status' === elemColumn && 'inserir' === elemStatus) {
                        columns.forEach((columnElem, indexCol) => {
                            core.setCellMeta(indexRow, indexCol, 'className', 'handsontable-color__render');
                        });
                    } else if ('status' === elemColumn) {
                        columns.forEach((columnElem, indexCol) => {
                            core.setCellMeta(indexRow, indexCol, 'className', 'handsontable-uncolor__render');
                        });
                    }
                }


            });
        }


        setTimeout(() => {
            core.render();
          //  this.cdr.detectChanges();
        }, 20);


        return;
    }

    clearSelection = () => {
        if (!this.canSubmit) {
            return;
        }

        this.canSubmit = false;
        swal.fire({
            title: 'Alerta!',
            text: 'Deseja realmente limpar todos os registros da tabela?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, continuar!',
            cancelButtonText: 'Não, cancelar!'
        }).then((response: any) => {
            this.canSubmit = true;
            if (!response.dismiss) {
                const hotInstance = this.hotRegisterer.getInstance(this.instanceName);
                if (hotInstance) {
                    hotInstance.loadData([]);
                    setTimeout(() => {
                        hotInstance.render();
                    }, 200);
                }
            }
        });
    };

    showModalWizard(group: Group) {
        this.modalShow.group = group;
        this.modalShow.wizard = true;
    }

    closeWizard(close: boolean) {
        close ? (
        this.modalShow.wizard = false,
        this.close(true)) : this.modalShow.wizard = false;
    }

    send = () => {
        this.modalShow.wizard = true;
    };

    updateElementRefContent = (elementRef: ElementRef = null, text: string = null) => {
        if (elementRef === null) {
            this.alertElements.forEach((elementItem, elementIndex) => {
                elementItem.element.nativeElement.style.display = 'none';
                elementItem.element.nativeElement.innerHTML = '';
                elementItem.isVisible = false;
            });
            this.hasAlertMessage = false;

        } else {

            if (text === null) {
                elementRef.nativeElement.style.display = 'none';
                elementRef.nativeElement.innerHTML = '';
            } else {
                elementRef.nativeElement.style.display = 'block';
                elementRef.nativeElement.innerHTML = text;
            }


            this.alertElements.forEach((item, index) => {
                if (item.element === elementRef) {
                    item.isVisible = text !== null;
                }
            });

            this.hasAlertMessage = this.alertElements.reduce((hasError, element) => {
                if (element.isVisible) {
                    return true;
                } else {
                    return hasError;
                }
            }, false);
        }

    };


}
