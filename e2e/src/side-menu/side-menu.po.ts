import { browser, by, element } from "protractor";

export class SideMenuPO {

    private accessOption(option: string) {
        let el = element(by.id(option));
        el.click();
        browser.sleep(1000);
    }

    openHome() {
        this.accessOption('btn-home');
    }
    openSubMenuUsuarios() {
        this.accessOption('btn-user');
    }
    accessUsuariosGerenciar() {
        this.accessOption('btn-user-gerenciar');
    }
    accessUsuariosCadastrar() {
        this.accessOption('btn-user-cadastrar');
    }
    openSubMenuChavesDeInsercao() {
        this.accessOption('btn-chaves-insercao');
    }
    accessChavesDeInsercaoGerenciar() {
        this.accessOption('btn-chaves-insercao-gerenciar');
    }
    accessChavesDeInsercaoCadastrar() {
        this.accessOption('btn-chaves-insercao-cadastrar');
    }
    openSubMenuLixeira() {
        this.accessOption('btn-lixeira');
    }
    accessLixeiraUsuarios() {
        this.accessOption('btn-lixeira-usuarios');
    }
    accessLixeiraChavesDeInsercao() {
        this.accessOption('btn-lixeira-chaves-insercao');
    }

}