import {Component, HostListener} from '@angular/core';
import {CoreService} from '../../../core.service';

@Component({
    selector:    'app-side-menu',
    templateUrl: './side-menu.component.html'
})

export class SideMenuComponent {
    constructor(public layoutService: CoreService) {
        this.onResize();
    }

    toggle(el) {
        if (el.classList.contains('portal-navigation-list__item--open')) {
            el.classList.remove('portal-navigation-list__item--open');
        } else {
            el.classList.add('portal-navigation-list__item--open');
        }
    }

    child_active(el) {
        let list = el.nextElementSibling.children;

        for (let i = 0; i < list.length; i++) {
            if (list[i].classList.contains('mdc-list-item--activated')) {
                return true;
            }
        }

        return false;
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        if (window.innerWidth > 1125 && !this.layoutService.menu) {
            this.layoutService.toggleMenu();
        }

        if (window.innerWidth < 1125 && this.layoutService.menu) {
            this.layoutService.toggleMenu();
        }
    }
}
