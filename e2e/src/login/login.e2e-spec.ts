import { TopToolbarPO } from "../top-toolbar/top-toolbar.po";
import { Utils } from "../utils";
import { LoginPO } from "./login.po";
import { browser } from "protractor";


describe('Login, com usuário BBI', () => {

    let utils: Utils;
    let topToolbar: TopToolbarPO;
    let loginPage: LoginPO;

    beforeEach(() => {
        utils = new Utils();
        topToolbar = new TopToolbarPO();
        loginPage = new LoginPO();
    })

    it('Login com sucesso', () => {
        loginPage.navigateTo('/');
        loginPage.doLogin('gm@bbi.solutions', '123');
        expect(utils.getUrl()).toContain('dashboard');
        topToolbar.doLogout();
    })

    it('Login com senha inválida', () => {
        loginPage.navigateTo('/');
        loginPage.doLogin('fr@bbi.solutions', '111');
        expect(utils.getSweetAlertContent()).toBe('Usuário e senha não coincidem.');
    })

})