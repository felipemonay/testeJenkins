import {ChangeDetectorRef, Injectable} from '@angular/core';
import {DigitalSourceTree} from '../models/digital-source-tree';
import {ModalExcelComponent} from '../../modules/insertions/components/mmm/components/modal-excel/modal-excel.component';
import {Insertion} from '../models/insertion';
import {Extra} from '../models/extra';


@Injectable(<any>{
    providedIn: 'root'
})

export class ValidateExcelDataService {

    private static instance: ValidateExcelDataService = new ValidateExcelDataService();

    public filteredListCache = {};
    public modal: ModalExcelComponent = null;
    public platform = 'EMPTY';

    public STATUS = 'status';
    public BASE_URL = 'base_url';
    public CHANNEL = 'channel';
    public MEDIA_TYPE = 'media_type';
    public FORMAT = 'format';
    public DURATION = 'duration';
    public PURCHASE_TYPE = 'purchase_type';
    public SEGMENTATION_TYPE = 'segmentation_type';
    public SEGMENTATION = 'segmentation';
    public CREATIVE_LINE = 'creative_line';
    public CORRESPONDENCE = 'correspondence';
    public NEGOCIATION_TYPECONST = 'negociation_type';
    public FL_USING_NEW_URL = 'fl_using_new_url';
    public AGENCY_FIELD = 'agency_field';


    public cdr: ChangeDetectorRef = null;


    public digitalSourceTreeList: Array<DigitalSourceTree>;

    public dropdownSource = null;
    public columnsConfig = {
        status: {
            className: ' hot_column htLeft',
            data: 'status',
            title: 'Status do Anúncio',
            type: 'dropdown',
            source: 'empty',
            allowInvalid: false
        },

        base_url: {
            className: ' hot_column htLeft',
            data: 'base_url',
            title: 'URL Base',
            type: 'text',
            source: 'empty',
            validator: function (value, callback) {
                const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                    '(\\#[-a-z\\d_\/]*)?$', 'i'); // fragment locator
                value = value === '' ? null : value;
                callback(value === null || !!pattern.test(value));
            },
            allowInvalid: true
        },
        channel: {
            className: ' hot_column htLeft',
            data: 'channel',
            title: 'Canal',
            type: 'dropdown',
            //  width: 200,
            source: 'empty',
            validator: function (value, callback) {
                if (value !== null && value !== '') {
                    const ved = ValidateExcelDataService.getInstance();
                    const res = ved.validateDependencyColumn(this, value, 'canal');
                    callback(res);
                } else {
                    callback(true);
                }
            }
            , allowInvalid: true


        },
        media_type: {
            className: ' hot_column htLeft',
            data: 'media_type',
            title: 'Tipo de Mídia',
            type: 'dropdown',
            validator: function (value, callback) {
                if (value !== null && value !== '') {
                    const ved = ValidateExcelDataService.getInstance();
                    const res = ved.validateDependencyColumn(this, value, 'tipo_midia');
                    callback(res);
                } else {
                    callback(true);
                }
            }
            ,
            allowInvalid: true,
            // width: 200,
            source: 'empty'

        },
        purchase_type: {
            className: ' hot_column htLeft',
            data: 'purchase_type',
            title: 'Tipo de Compra',
            type: 'dropdown',
            // width: 200,
            source: 'empty',
            allowInvalid: false
        },
        fl_using_new_url: {
            className: ' hot_column htLeft',
            data: 'fl_using_new_url',
            title: 'Utilizar URL 3.0',
            type: 'dropdown',
            // width: 200,
            source: 'empty',
            allowInvalid: false
        },
        segmentation_type: {
            className: ' hot_column htLeft',
            data: 'segmentation_type',
            title: 'Tipo Segmentação',
            type: 'dropdown',
            //  width: 200,
            source: 'empty',
            allowInvalid: false
        },
        segmentation: {
            className: ' hot_column htLeft',
            data: 'segmentation',
            title: 'Segmentação',
            type: 'text',
            //  width: 200,
            validator: function (value, callback) {
                value = value === '' ? null : value;
                callback(/^[a-z0-9\-]+$/i.test(value));
            },
            source: 'empty',
            allowInvalid: true
        },
        creative_line: {
            className: ' hot_column htLeft',
            data: 'creative_line',
            title: 'Criativo',
            type: 'text',
            //  width: 200,
            validator: function (value, callback) {
                value = value === '' ? null : value;
                callback(/^[a-z0-9\-]+$/i.test(value));
            },
            source: 'empty',
            allowInvalid: true
        },
        correspondence: {
            className: ' hot_column htLeft',
            data: 'correspondence',
            title: 'Correspondência',
            type: 'dropdown',
            //  width: 200,
            source: 'empty',
            allowInvalid: false
        },
        format: {
            className: ' hot_column htLeft',
            data: 'format',
            title: 'Formato',
            type: 'dropdown',
            // width: 200,
            source: 'empty',
            validator: function (value, callback) {
                if (value !== null && value !== '') {
                    const ved = ValidateExcelDataService.getInstance();
                    const res = ved.validateDependencyColumn(this, value, 'formato');
                    callback(res);
                } else {
                    callback(true);
                }
            }
            , allowInvalid: true

        },
        duration: {
            className: ' hot_column htLeft',
            data: 'duration',
            title: 'Tempo (segundos)',
            type: 'dropdown',
            // width: 200,
            source: 'empty',
            validator: function (value, callback) {
                if (value !== undefined && value !== null) {
                    const v = value;
                    const ved = ValidateExcelDataService.getInstance();
                    // const res = ved.validateDependencyColumn(this, value, 'duracao');
                    const check = !isNaN(v) || v.toString().toLowerCase() === 'na';

                    callback(check && value !== '' && value !== undefined && value !== null && value !== '');
                } else {
                    callback(true);
                }
            }
            , allowInvalid: false
        },

        negociation_type: {
            className: ' hot_column htLeft',
            data: 'negociation_type',
            title: 'Tipo de Negociação',
            type: 'dropdown',
            // width: 200,
            source: 'empty',
            allowEmpty: false,
            validator: function (value, callback) {
                if (value !== undefined && value !== null && value !== '') {
                    const v = value;

                    const ved = ValidateExcelDataService.getInstance();
                    const validValues = ved.dropdownSource.negociation_type;
                    const res = validValues.indexOf(value) !== -1;
                    callback(res || value === '');
                } else {
                    callback(true);
                }
            },
            allowInvalid: true
        },
        agency_field: {
            className: ' hot_column htLeft',
            data: 'agency_field',
            title: 'Campo Agência',
            type: 'text',
            //  width: 200,
            validator: function (value, callback) {
                value = value === '' ? null : value;
                callback(/^[a-z0-9\-]+$/i.test(value));
            },
            source: 'empty',
            allowInvalid: false
        }


    };


    public constructor() {
        if (ValidateExcelDataService.instance) {
            throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
        }
        ValidateExcelDataService.instance = this;

    }

    public static getInstance() {
        return ValidateExcelDataService.instance;
    }

    public isRequired(field) {
        return this.getPlatformColumns().includes(field);
    }


    public setPlatform(platform: string) {
        platform = platform || 'NA';
        this.filteredListCache = {};
        this.platform = platform.toUpperCase();
    }


    public getPlatformColumns() {
        if (!this.platform) {
            return [this.STATUS];
        }
        switch (this.platform.toUpperCase()) {
            case 'FACEBOOKADS':
            case 'FACEBOOK-ADS':
                return [
                    this.STATUS, this.BASE_URL, this.CHANNEL, this.MEDIA_TYPE, this.FORMAT,
                    this.DURATION, this.CORRESPONDENCE, this.SEGMENTATION_TYPE, this.SEGMENTATION, this.PURCHASE_TYPE,
                    this.CREATIVE_LINE, this.FL_USING_NEW_URL, this.AGENCY_FIELD];

            case 'ADWORDS':
            case 'GOOGLE-ADS':
                return [
                    this.STATUS, this.BASE_URL, this.CHANNEL, this.MEDIA_TYPE, this.FORMAT,
                    this.DURATION, this.CORRESPONDENCE, this.SEGMENTATION_TYPE, this.SEGMENTATION,
                    this.PURCHASE_TYPE, this.CREATIVE_LINE, this.FL_USING_NEW_URL, this.AGENCY_FIELD];

            case 'DBM':
            case 'DV360':
            case 'CM-DV360':
            case 'NA':
            case 'OATH':
            default:
                return [
                    this.STATUS, this.BASE_URL, this.CHANNEL, this.MEDIA_TYPE, this.FORMAT,
                    this.DURATION, this.CORRESPONDENCE, this.SEGMENTATION_TYPE, this.SEGMENTATION,
                    this.PURCHASE_TYPE, this.NEGOCIATION_TYPECONST, this.CREATIVE_LINE,
                    this.FL_USING_NEW_URL, this.AGENCY_FIELD];


        }

    }


    public getColumns(dropDownOptionsDict: object) {
        if (!this.platform) {
            return;
        }
        this.dropdownSource = dropDownOptionsDict;
        const _columnsConfig = this.columnsConfig;

        const columnsList = this.getPlatformColumns();

        return columnsList.reduce((a, b) => {
            const column = _columnsConfig[b];
            column.source = dropDownOptionsDict[column.data];
            a.push(column);
            return a;
        }, []);
    }


    public validateDuplicated(data) {
        if (!this.platform) {
            return;
        }

        const ignoredColumns = [this.STATUS, this.FL_USING_NEW_URL, this.AGENCY_FIELD];

        const uniqs = data.reduce((result, lineItem, lineIndex) => {

            const concatenatedLineItem = this.concatRowData(lineItem, ignoredColumns);

            if (concatenatedLineItem !== '' && concatenatedLineItem !== 'null' && concatenatedLineItem !== 'undefined') {

                const line = lineIndex + 1;
                if (!result[concatenatedLineItem]) {
                    result[concatenatedLineItem] = '[' + line + ']';
                } else {
                    result[concatenatedLineItem] = result[concatenatedLineItem].replace(']', ', ' + line + ']');
                }

            }
            return result;

        }, {});

        return Object.keys(uniqs).reduce((result, lineItem, lineIndex) => {
            if (uniqs[lineItem].indexOf(',') !== -1) {
                result.push(uniqs[lineItem]);
            }
            return result;
        }, []);
    }

    public validateEmpty(data) {
        if (!this.platform) {
            return;
        }

        const canBeEmpty = [];
        // const canBeEmpty = ['negociation_type'];

        const uniq = data.reduce((total, currentLine, lineIndex /*, array*/) => {

            const val = this.concatRowData(currentLine);

            if (val !== '' && val !== 'null' && val !== 'undefined') {

                this.getPlatformColumns().reduce((a, b) => {

                    if ((currentLine[b] === null || currentLine[b] === undefined || currentLine[b].toString().trim() === '') && canBeEmpty.indexOf(b) === -1) {
                        total.add(lineIndex + 1);
                    }
                    return a;

                }, 0);

            }

            return total;

        }, new Set());

        return Array.from(uniq);

    }

    public validateArbitraryRules(data, insertion: Insertion, extra: Extra) {
        if (!this.platform) {
            return;
        }

        /** iterando linha a linha do excel **/
        return data.reduce((rules, currentLine, lineIndex /*, array*/) => {

            const val = this.concatRowData(currentLine);
            /** verificando se a linha está vazia **/
            if (val !== '' && val !== 'null' && val !== 'undefined') {

                const lineMediaType = (currentLine[this.MEDIA_TYPE] || '').toString().toLowerCase();
                const lineCorrespondence = (currentLine[this.CORRESPONDENCE] || '').toString().toLowerCase();
                const lineSegmentationType = (currentLine[this.SEGMENTATION_TYPE] || '').toString().toLowerCase();
                const lineChannelType = (currentLine[this.CHANNEL] || '').toString().toLowerCase();
                // const insertionImpactType = insertion.impact_type.name.toString().toLowerCase();
                
                /**
                 * REGRA: alert_midia_correpondence_search
                 * DESCRIÇÃO: se a coluna 'media_type'==='SEARCH' valor da coluna 'correspondence' !== 'NA'
                 * DATA: DEZ/2019
                 * ELEMENTO: ViewChild('alert_midia_correpondence_search')
                 */
                if ((lineMediaType === 'search') &&
                    (lineCorrespondence === 'na')) {
                    rules.alert_midia_correpondence_search.push((lineIndex + 1));
                }


                /**
                 * REGRA: alert_midia_correpondence_not_search
                 * DESCRIÇÃO: se a coluna 'media_type'!=='SEARCH' valor da coluna 'correspondence' === 'NA'
                 * DATA: DEZ/2019
                 * ELEMENTO: @ViewChild('alert_midia_correpondence_not_search')
                 */
                if ((lineMediaType !== 'search' && lineMediaType !== '' && lineMediaType !== 'null' && lineMediaType !== 'undefined') &&
                    (lineCorrespondence !== 'na' && lineCorrespondence !== '' && lineCorrespondence !== 'null' && lineCorrespondence !== 'undefined')) {
                    rules.alert_midia_correpondence_not_search.push((lineIndex + 1));
                }

                /**
                 * REGRA: alert_channel_segmentacao
                 * DESCRIÇÃO: se a coluna 'segmentation_type'==='RLSA' valor da coluna 'channel' === 'SEARCH'
                 * DATA: DEZ/2019
                 * ELEMENTO: @ViewChild('alert_channel_segmentacao')
                 */
                if ((lineSegmentationType === 'rlsa') &&
                    (lineChannelType !== 'search')) {
                    rules.alert_channel_segmentacao.push((lineIndex + 1));
                }

                /**
                 * REGRA CAIU ATÉ SER MELHOR DEFINIDA
                 * REGRA: alert_views_midia
                 * DESCRIÇÃO: se a coluna 'impact_type'==='VIEW' valor da coluna 'media_type' === 'VIDEO'
                 * DATA: DEZ/2019
                 * ELEMENTO: @ViewChild('alert_views_midia')
                 */
                // if ((insertionImpactType === 'view') &&
                //     (lineMediaType !== 'video')) {
                //     rules.alert_views_midia.push((lineIndex + 1));
                // }

            }

            return rules;

        }, {
            alert_midia_correpondence_search: [],
            alert_midia_correpondence_not_search: [],
            alert_channel_segmentacao: [],
            alert_views_midia: [],
        });


    }

    public validateDependencyColumn(columnConfig, value, filterHeader) {
        if (!this.platform) {
            return;
        }
        // const rowMeta = this.hotInstance.getCellMetaAtRow(initialRow);
        // const metaCell = rowMeta[initialCol];
        const cellVal = columnConfig.instance.getDataAtCell(columnConfig.row, columnConfig.col);
        if (cellVal === null || cellVal === undefined || cellVal === '') {
            return true;
        }
        const rowData = columnConfig.instance.getDataAtRow(columnConfig.row);
        const filter = new DigitalSourceTree();
        filter.canal = (columnConfig.col !== 2) ? rowData[2] || null : null;
        filter.tipo_midia = (columnConfig.col !== 3) ? rowData[3] || null : null;
        filter.formato = (columnConfig.col !== 4) ? rowData[4] || null : null;
        filter.duracao = (columnConfig.col !== 5) ? rowData[5] || null : null;


        const ved = ValidateExcelDataService.getInstance();
        const list = ved.filterTreeList(ved.digitalSourceTreeList, filter, filterHeader);
        list.push(null);
        return list.includes(cellVal);

    }


    public filterTreeList(treeList: Array<DigitalSourceTree>, filter: DigitalSourceTree, prop) {
        // console.group('filterTreeList');
        // console.log(treeList);
        // console.log(filter);

        const ved = ValidateExcelDataService.getInstance();
        // console.log(ved.filteredListCache);
        const filterKey = ''
            .concat('col-', prop, '|',
                'channel=', filter.canal, '|',
                'mediaType=', filter.tipo_midia, '|',
                'format=', filter.formato, '|',
                'duration=', filter.duracao);
        // console.log(filterKey);
        if (ved.filteredListCache[filterKey] !== undefined && ved.filteredListCache[filterKey] !== null) {
            // console.info('CACHED');
            // console.log(ved.filteredListCache[filterKey]);
            //
            // console.groupEnd();
            return ved.filteredListCache[filterKey].filter((value, index) => {
                return value !== null && value !== undefined;
            });
        } else {

            const reduced = treeList.reduce((element, treeListItem) => {
                if ((filter.canal === treeListItem.canal || filter.canal === null) &&
                    (filter.tipo_midia === treeListItem.tipo_midia || filter.tipo_midia === null) &&
                    (filter.formato === treeListItem.formato || filter.formato === null)) {
                    element.add(treeListItem[prop]);
                }
                return element;
            }, new Set());
            ved.filteredListCache[filterKey] = Array.from(reduced).filter((value, index) => {
                return value !== null && value !== undefined;
            });
        }
        // console.log(ved.filteredListCache[filterKey]);
        // console.groupEnd();
        return ved.filteredListCache[filterKey];
    }

    private concatRowData(row, ignoredColumns: Array<any> = []) {
        if (!this.platform) {
            return;
        }
        const columnsList = this.getPlatformColumns();
        return columnsList.reduce((a, b) => {
            if (ignoredColumns.indexOf(b.toString().toLowerCase()) === -1) {
                a += (row[b] || '').toString().toLowerCase();
            }
            return a;
        }, '');
    }


}
