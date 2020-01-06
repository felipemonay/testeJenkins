import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {CoreService} from '../../../../core.service';
import {Router} from '@angular/router';
import {AccessLevelService} from 'src/app/shared/services/access-level.service';
import {AlertService} from '../../../../alert.service';


@Component({
    selector:    'app-top-toolbar-alert',
    templateUrl: './top-toolbar-alert.component.html',
    animations:  [
        trigger('show_alert', [
            transition(':enter', [
                style({opacity: 0}),
                animate(200, style({opacity: 1}))
            ]),
            transition(':leave', [
                style({opacity: 1}),
                animate(300, style({opacity: 0}))
            ])
        ])
    ]
})

export class TopToolbarAlertComponent implements OnInit {


    @ViewChild('alert_list', { static: false }) public alert_list: ElementRef;
    public insertionsData: Array<any> = new Array<any>();
    public hasInsertion = false;
    public show_alert_modal = false;
    private access_level: any = {
        page:   'insertions',
        action: 'App\\Http\\Controllers\\Api\\InsertionController@forceStore'
    };

    constructor(public layoutService: CoreService,
                private router: Router,
                private accessLevelService: AccessLevelService,
                private  alertService: AlertService) {


        this.alertService.alert.subscribe((data) => {
            this.getAlerts();
        });


    }

    getAlerts() {
        this.layoutService.getAlert().subscribe((data: Array<any>) => {
            this.hasInsertion = data.length > 0;
            this.insertionsData = data;
        });
    }

    ngOnInit() {


    }

    onScroll(e) {
        // event.stopPropagation();
        // event.preventDefault();
        // event.returnValue = false;

        const t = this.alert_list.nativeElement;
        const scrollTop    = t.scrollTop,
              scrollHeight = t.scrollHeight,
              height       = t.offsetHeight,
              up           = e.wheelDelta > 0;

        if ((scrollTop === (scrollHeight - height) && !up) || (scrollTop === 0 && up)) {
            event.preventDefault();
            event.returnValue = false;
            return false;
        }

        return true;
    }

    toggleAlert() {
        this.show_alert_modal = !this.show_alert_modal;
    }

    goToInsertion(id) {
        this.accessLevelService.is_accessible(this.access_level.page, this.access_level.action).subscribe((data) => {
            this.show_alert_modal = false;
            if (data) {
                this.router.navigate(['insertions/force-update'], {queryParams: {id: id.toString()}});
            } else {
                this.router.navigate(['insertions/update'], {queryParams: {id: id.toString()}});
            }
        });
    }
}
