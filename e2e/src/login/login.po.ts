import { browser, by, element } from "protractor";

export class LoginPO {

    navigateTo(path: string) {
        browser.get(path);
        browser.manage().window().maximize();
    }

    doLogin(email: string, password: string) {
        element(by.id('email')).sendKeys(email);
        element(by.id('password')).sendKeys(password);
        element(by.id('btn-login')).click();
    }
}
