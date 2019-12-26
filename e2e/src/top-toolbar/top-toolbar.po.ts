import { by, element, browser, ExpectedConditions } from "protractor";

export class TopToolbarPO {
    doLogout() {
        element(by.id('hamburguer-menu')).click();
        let btnLogout = element(by.id('btn-logout'));
        browser.wait(ExpectedConditions.presenceOf(btnLogout), 2000);
        btnLogout.click();
        browser.sleep(2000);
    }
    openMenu(){
        element(by.id('btn-menu')).click();
        browser.sleep(500);
    }
}