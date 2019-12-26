import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { WizardCompletionStep, WizardComponent } from 'angular-archwizard';
import { Insertion } from 'src/app/shared/models/insertion';
import { InsertionService } from 'src/app/modules/insertions/insertion.service';
import { ErrorHandler } from 'src/app/shared/http/responses/error-handler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-wizard-hash',
  templateUrl: './modal-wizard-hash.component.html',
  styleUrls: ['./modal-wizard-hash.component.scss']
})
export class ModalWizardComponent implements OnInit {

  @Input() predicta;
  @Input() novo;

  @Input()
  public insertion: Insertion = new Insertion();
    
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;

  _show = true;

  constructor( 
    private insertionService: InsertionService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.predicta ? this.sendPredictaAndGenHash() : this.generateHash();
  }

  
  generateHash(){
    this.insertionService.newGenerateHash(this.insertion).subscribe((data: any) => {
      this.wizard.goToNextStep();
    }, error => {
      return this.throwError(error);
    })
  }

  sendPredictaAndGenHash() {
    this.insertionService.generateHashWithNotification(this.insertion).subscribe((data: any) => {
      this.wizard.goToNextStep();
    }, error => {
        return this.throwError(error);
    });
  }

  close = () => {
    if(!this.novo){
      window.location.reload();
    } else {
      return this.router.navigate(['/insertions/show'], { queryParams: { id: this.insertion.id } })
    }
  };

  throwError(error) {
    return new ErrorHandler(error).show();
  }
}
