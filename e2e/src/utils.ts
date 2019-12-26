import { browser, by, element, ExpectedConditions } from "protractor";

export class Utils {

    fillById(id: string, text: string) {
        let el = element(by.id(id));
        browser.wait(ExpectedConditions.presenceOf(el), 3000);
        el.sendKeys(text);
    }
    performClickById(id: string) {
        let el = element(by.id(id));
        browser.wait(ExpectedConditions.elementToBeClickable(el), 2000);
        el.click();
    }
    performClickByClass(classe: string) {
        let el = element(by.className(classe));
        browser.wait(ExpectedConditions.elementToBeClickable(el), 2000);
        el.click();
    }

    async searchInTable(search: string) {
        let tableCells = element.all(by.tagName('td'));
        let validacao = false;
        await tableCells.each(async cel => {
            let text = await cel.getText();
            if (text === search) {
                validacao = true;
            }
        })
        return validacao;
    }

    nextPageInTable(classe: string, page: number) {
        // TODO: Navegação na tabela
    }

    getElementByClass(classe: string) {
        let el = element(by.className(classe));
        browser.wait(ExpectedConditions.presenceOf(el), 3000);
        return el;
    }
    getElementByXpath(xpath: string) {
        let el = element(by.xpath(xpath));
        browser.wait(ExpectedConditions.presenceOf(el), 3000);
        return el;
    }
    getElementById(id: string) {
        let el = element(by.id(id));
        browser.wait(ExpectedConditions.presenceOf(el), 3000);
        return el;
    }
    getSweetAlertContent() {
        let swal = element(by.id('swal2-content'));
        browser.wait(ExpectedConditions.visibilityOf(swal), 3000);
        return swal.getText();
    }
    confirmSweetAlert() {
        this.performClickByClass('swal2-confirm');
        browser.sleep(300);
    }
    getUrl() {
        return browser.getCurrentUrl();
    }
}