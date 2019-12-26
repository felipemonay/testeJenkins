import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {NgxCurrencyModule} from 'ngx-currency';
import {SelectModule} from 'ng-select';
import {CURRENCY_MASK_CONFIG} from 'ngx-currency/src/currency-mask.config';
import { ArchwizardModule } from 'angular-archwizard';
import {routing} from './insertion-routing.module';
import {CustomCurrencyMaskConfig, SharedModule} from '../../shared/shared.module';
import {InsertionService} from './insertion.service';
import {InsertionCreateComponent} from './insertion-create/insertion-create.component';
import {InsertionListComponent} from './insertion-list/insertion-list.component';
import {InsertionUpdateComponent} from './insertion-update/insertion-update.component';
import {InsertionShowComponent} from './insertion-show/insertion-show.component';
import {DefaultMmmComponent} from './components/mmm/default-mmm/default-mmm.component';
import {DefaultMrmComponent} from './components/mrm/default-mrm/default-mrm.component';
import {ModalGroupComponent} from './components/mmm/components/modal-group/modal-group.component';
import {ModalDigitalGroupComponent} from './components/mmm/components/modal-digital-group/modal-digital-group.component';
import {ModalTagComponent} from './components/mmm/components/modal-tag/modal-tag.component';
import {ModalComponent} from './components/mrm/components/modal/modal.component';
import {InsertionForceUpdateComponent} from './insertion-force-update/insertion-force-update.component';
import {InsertionFilterService} from './insertion-filter.service';
import {ReferenceDateFieldComponent} from './components/fields/reference-date-field/reference-date-field.component';
import {AreaFieldComponent} from './components/fields/area-field/area-field.component';
import {MediaFieldComponent} from './components/fields/media-field/media-field.component';
import {CampaignNameFieldComponent} from './components/fields/campaign-name-field/campaign-name-field.component';
import {PiNumberFieldComponent} from './components/fields/pi-number-field/pi-number-field.component';
import {InitiativeFieldComponent} from './components/fields/initiative-field/initiative-field.component';
import {InvestmentFieldComponent} from './components/fields/investment-field/investment-field.component';
import {PiTypeFieldComponent} from './components/fields/pi-type-field/pi-type-field.component';
import {PiNotRatedFieldComponent} from './components/fields/pi-not-rated-field/pi-not-rated-field.component';
import {UnitCostFieldComponent} from './components/fields/unit-cost-field/unit-cost-field.component';
import {ImpactFieldComponent} from './components/fields/impact-field/impact-field.component';
import {CommentsFieldComponent} from './components/fields/comments-field/comments-field.component';
import {UserFieldComponent} from './components/fields/user-field/user-field.component';
import {DefaultExtraComponent} from './components/extras/default-extra/default-extra.component';
import {DigitalExtraComponent} from './components/extras/digital-extra/digital-extra.component';
import {InitialDateFieldComponent} from './components/extras/components/fields/initial-date-field/initial-date-field.component';
import {FinalDateFieldComponent} from './components/extras/components/fields/final-date-field/final-date-field.component';
import {MediaOwnerFieldComponent} from './components/extras/components/fields/media-owner-field/media-owner-field.component';
import {MediaObjectiveFieldComponent} from './components/extras/components/fields/media-objective-field/media-objective-field.component';
import {MediaAdserverPlatformFieldComponent} from './components/extras/components/fields/media-adserver-platform-field/media-adserver-platform-field.component';
import {DigitalMmmComponent} from './components/mmm/digital-mmm/digital-mmm.component';
import {ModalExcelComponent} from './components/mmm/components/modal-excel/modal-excel.component';
import {HotTableModule} from '@handsontable/angular';
import {OohExtraComponent} from './components/extras/ooh-extra/ooh-extra.component';
import {BaseUrlFieldComponent} from './components/extras/components/fields/base-url-field/base-url-field.component';
import {ExcelListDownloadComponent} from './components/excel-list-download/excel-list-download.component';
import {CustomerFieldComponent} from './components/extras/components/fields/customer-field/customer-field.component';
import {ImpactTypeFieldComponent} from './components/fields/impact-type-field/impact-type-field.component';
import {ModalAttentionComponent} from './components/extras/digital-extra/components/modal-attention/modal-attention.component';
import { ModalStatusCreativeLineComponentComponent } from './insertion-list/components/modal-status-creative-line-component/modal-status-creative-line-component.component';
import { RotativeFieldComponent } from './components/extras/components/fields/rotative-field/rotative-field.component';
import { ModalWizardComponent } from './components/mmm/components/modal-wizard/moda-wizard-hash/modal-wizard-hash.component';
import { ModalWizardExcelComponent } from './components/mmm/components/modal-wizard/modal-wizard-excel/modal-wizard-excel.component';

@NgModule({
    imports:      [
        routing,
        CommonModule,
        FormsModule,
        NgxCurrencyModule,
        SelectModule,
        SharedModule,
        NgxMaskModule.forRoot(),
        HotTableModule.forRoot(),
        ArchwizardModule
    ],
    declarations: [
        InsertionCreateComponent,
        InsertionUpdateComponent,
        InsertionForceUpdateComponent,
        InsertionListComponent,
        InsertionShowComponent,
        DefaultMmmComponent,
        DefaultMrmComponent,
        ModalGroupComponent,
        ModalDigitalGroupComponent,
        ModalTagComponent,
        ModalComponent,
        ReferenceDateFieldComponent,
        AreaFieldComponent,
        MediaFieldComponent,
        CampaignNameFieldComponent,
        PiNumberFieldComponent,
        InitiativeFieldComponent,
        InvestmentFieldComponent,
        PiTypeFieldComponent,
        PiNotRatedFieldComponent,
        UnitCostFieldComponent,
        ImpactFieldComponent,
        ImpactTypeFieldComponent,
        InitialDateFieldComponent,
        MediaOwnerFieldComponent,
        MediaObjectiveFieldComponent,
        MediaAdserverPlatformFieldComponent,
        FinalDateFieldComponent,
        CommentsFieldComponent,
        UserFieldComponent,
        DefaultExtraComponent,
        OohExtraComponent,
        DigitalExtraComponent,
        DigitalMmmComponent,
        ModalExcelComponent,
        BaseUrlFieldComponent,
        ExcelListDownloadComponent,
        CustomerFieldComponent,
        ModalAttentionComponent,
        ModalStatusCreativeLineComponentComponent,
        RotativeFieldComponent,
        ModalWizardComponent,
        ModalWizardExcelComponent
    ],
    providers:    [
        InsertionService,
        InsertionFilterService,
        {provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig}
    ]
})

export class InsertionModule {
}
