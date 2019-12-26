import { Dao } from "../dao";
import { LoginPO } from "../login/login.po";
import { SideMenuPO } from "../side-menu/side-menu.po";
import { TopToolbarPO } from "../top-toolbar/top-toolbar.po";
import { UserListPO } from "../user-list/user-list.po";
import { UserShowPO } from "../user-show/user-show.po";
import { UserUpdatePO } from "../user-update/user-update.po";
import { Utils } from "../utils";

describe('Visualizar o cadastro de usuários, com usuário BBI', () => {

    let loginPO: LoginPO;
    let topNavbarPO: TopToolbarPO;
    let sideMenuPO: SideMenuPO;
    let userListPO: UserListPO;
    let userUpdatePO: UserUpdatePO;
    let userShowPO: UserShowPO;
    let utils: Utils;

    beforeEach(() => {
        loginPO = new LoginPO();
        topNavbarPO = new TopToolbarPO();
        sideMenuPO = new SideMenuPO();
        userListPO = new UserListPO();
        userUpdatePO = new UserUpdatePO();
        userShowPO = new UserShowPO();
        utils = new Utils();
        loginPO.navigateTo('/');
        loginPO.doLogin('gm@bbi.solutions', '123');
        sideMenuPO.openSubMenuUsuarios();
        sideMenuPO.accessUsuariosGerenciar();
    })
    afterEach(() => {
        topNavbarPO.doLogout();
    })

    it('Visualizar cadastro de usuário', () => {
        userListPO.searchByEmail('carlacolautti@santander.com.br');
        userListPO.visualizarUsuario();
        expect(userShowPO.isTextInList('CPF: 29681517890')).toBe(true);
    })
    it('Voltar para lista de usuários', () => {
        userListPO.searchByEmail('carlacolautti@santander.com.br');
        userListPO.visualizarUsuario();
        userShowPO.clickVoltarParaListaDeUsuarios();
        expect(utils.getElementById('p-listagem-usuarios').getText()).toContain('LISTAGEM DE USUÁRIOS');
    })
    it('Editar usuário, teste do botão', () => {
        userListPO.searchByEmail('carlacolautti@santander.com.br');
        userListPO.visualizarUsuario();
        userShowPO.clickEditarUsuario();
        expect(utils.getElementById('p-editar-usuario').getText())
            .toContain('EDITAÇÃO DE USUÁRIOS');
    })
})
describe('Visualizar o cadastro de usuário e excluir', () => {
    let loginPO: LoginPO;
    let topNavbarPO: TopToolbarPO;
    let sideMenuPO: SideMenuPO;
    let userListPO: UserListPO;
    let userShowPO: UserShowPO;
    let utils: Utils;
    let dao: Dao;

    beforeEach(() => {
        loginPO = new LoginPO();
        topNavbarPO = new TopToolbarPO();
        sideMenuPO = new SideMenuPO();
        userListPO = new UserListPO();
        userShowPO = new UserShowPO();
        utils = new Utils();
        dao = new Dao();

        dao.generateGenericUserFor('sts');
        dao.generateGenericUserFor('mdzn');

        loginPO.navigateTo('/');
        loginPO.doLogin('gm@bbi.solutions', '123');

        sideMenuPO.openSubMenuUsuarios();
        sideMenuPO.accessUsuariosGerenciar();
    })
    afterEach(() => {
        topNavbarPO.doLogout();
        dao.deleteGenericUserFrom('sts');
        dao.deleteGenericUserFrom('mdzn');
    })

    it('Excluir usuário com sucesso', () => {
        userListPO.searchByEmail('bentinho_capitu@bbi.solutions');
        userListPO.visualizarUsuario();
        userShowPO.clickExcluirUsuario();
        utils.confirmSweetAlert();
        expect(utils.getSweetAlertContent()).toContain('Usuário excluído com sucesso.');
        utils.confirmSweetAlert();
        userListPO.searchByEmail('bentinho_capitu@bbi.solutions');
        expect(utils.searchInTable('Nenhum resultado encontrado!')).toBe(true);
    })
})