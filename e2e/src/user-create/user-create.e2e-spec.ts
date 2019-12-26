import { by, element } from "protractor";
import { LoginPO } from "../login/login.po";
import { SideMenuPO } from "../side-menu/side-menu.po";
import { TopToolbarPO } from "../top-toolbar/top-toolbar.po";
import { UserUpdatePO } from "../user-update/user-update.po";
import { UserCreatePO } from "./user-create.po";
import { Utils } from "../utils";

describe('Criação de usuários, com usuário BBI', () => {

    let loginPO: LoginPO;
    let topNavbarPO: TopToolbarPO;
    let utils: Utils;
    let sideMenuPO: SideMenuPO;
    let userCreatePO: UserCreatePO;
    let userUpdatePO: UserUpdatePO;


    beforeEach(() => {
        loginPO = new LoginPO();
        topNavbarPO = new TopToolbarPO();
        utils = new Utils();
        sideMenuPO = new SideMenuPO();
        userCreatePO = new UserCreatePO();
        userUpdatePO = new UserUpdatePO();
        loginPO.navigateTo('/');
        loginPO.doLogin('gm@bbi.solutions', '123');
        sideMenuPO.openSubMenuUsuarios();
        sideMenuPO.accessUsuariosCadastrar();
    })

    afterEach(() => {
        topNavbarPO.doLogout();
    })

    it('Criação de usuário com sucesso', () => {
        userCreatePO.fillName('Teste Teste');
        userCreatePO.fillRandomEmail('bbi@bbi.com.br');
        userCreatePO.fillCpf('11111111111');
        userCreatePO.fillPhone('11999999999');
        userCreatePO.fillPassword('123');
        userCreatePO.fillConfirmPassword('123');
        userCreatePO.fillCompany('BBI.SOLUTIONS');
        userCreatePO.fillOffice('Manager');
        userCreatePO.btnCadastrar();
        expect(utils.getSweetAlertContent()).toContain('Usuário cadastrado com sucesso.');
        utils.confirmSweetAlert();
    })
    it('Criação de usuário com sucesso e alteração de nível de acesso', () => {
        userCreatePO.fillName('Fulano Fulano');
        userCreatePO.fillRandomEmail('bbi@bbi.com.br');
        userCreatePO.fillCpf('22222222222');
        userCreatePO.fillPhone('11998888888');
        userCreatePO.fillPassword('123');
        userCreatePO.fillConfirmPassword('123');
        userCreatePO.fillCompany('BBI.SOLUTIONS');
        userCreatePO.fillOffice('Manager');
        userCreatePO.btnCadastrar();
        expect(utils.getSweetAlertContent()).toContain('Usuário cadastrado com sucesso.');
        utils.confirmSweetAlert();
        userUpdatePO.selectNivelDeAcesso('Admin');
        userUpdatePO.salvarAlteracoesAcesso();
        expect(utils.getSweetAlertContent()).toContain('Alterações realizadas com sucesso.');
        utils.confirmSweetAlert();
    })
    it('Criação de usuário, com confirmação de senha diferente', () => {
        userCreatePO.fillName('Ciclano Ciclano');
        userCreatePO.fillRandomEmail('bbi@bbi.com.br');
        userCreatePO.fillCpf('22222222222');
        userCreatePO.fillPhone('11998888888');
        userCreatePO.fillPassword('123');
        userCreatePO.fillConfirmPassword('1234');
        userCreatePO.fillCompany('BBI.SOLUTIONS');
        userCreatePO.fillOffice('Sales');
        userCreatePO.btnCadastrar();
        expect(utils.getSweetAlertContent()).toContain('A senha não coincide com a confirmação.');
        utils.confirmSweetAlert();
    })
    it('Criação de usuário, validação botão cadastrar desabilitado', () => {
        userCreatePO.fillName('Ciclano Ciclano');
        userCreatePO.fillRandomEmail('bbi@bbi.com.br');
        expect(element(by.id('btn-cadastrar')).getAttribute('disabled')).toBe('true');
    })
    it('Criação de usuário, validação dos campos obrigatórios', () => {
        utils.performClickById('name');
        utils.performClickById('email');
        utils.performClickById('cpf');
        utils.performClickById('phone');
        utils.performClickById('password');
        utils.performClickById('password_confirmation');
        utils.performClickById('office');
        utils.performClickById('company_id');
        utils.performClickById('company_id');
        expect(utils.getElementById('name').getAttribute('class')).toContain('ng-invalid ng-touched');
        expect(utils.getElementById('email').getAttribute('class')).toContain('ng-invalid ng-touched');
        expect(utils.getElementById('cpf').getAttribute('class')).toContain('ng-invalid ng-touched');
        expect(utils.getElementById('phone').getAttribute('class')).toContain('ng-invalid ng-touched');
        expect(utils.getElementById('password').getAttribute('class')).toContain('ng-invalid ng-touched');
        expect(utils.getElementById('password_confirmation').getAttribute('class')).toContain('ng-invalid ng-touched');
        expect(utils.getElementById('office').getAttribute('class')).toContain('ng-invalid ng-touched');
    })

})