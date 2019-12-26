import { LoginPO } from "../login/login.po";
import { SideMenuPO } from "../side-menu/side-menu.po";
import { TopToolbarPO } from "../top-toolbar/top-toolbar.po";
import { UserListPO } from "../user-list/user-list.po";
import { Utils } from "../utils";
import { UserUpdatePO } from "./user-update.po";
import { Dao } from "../dao";

describe('Update do cadastro de usuários, com usuário BBI', () => {

    let loginPO: LoginPO;
    let topNavbarPO: TopToolbarPO;
    let sideMenuPO: SideMenuPO;
    let userListPO: UserListPO;
    let userUpdatePO: UserUpdatePO;
    let utils: Utils;
    let dao: Dao;

    beforeEach(() => {
        loginPO = new LoginPO();
        topNavbarPO = new TopToolbarPO();
        sideMenuPO = new SideMenuPO();
        userListPO = new UserListPO();
        userUpdatePO = new UserUpdatePO();
        utils = new Utils();
        dao = new Dao();

        loginPO.navigateTo('/');
        loginPO.doLogin('gm@bbi.solutions', '123');
        sideMenuPO.openSubMenuUsuarios();
        sideMenuPO.accessUsuariosGerenciar();

        dao.generateGenericUserFor('sts');
        dao.generateGenericUserFor('mdzn');

    })
    afterEach(() => {
        topNavbarPO.doLogout();
        dao.deleteGenericUserFrom('sts');
        dao.deleteGenericUserFrom('mdzn');
    })

    it('Alterar senha do usuário com sucesso', () => {
        userListPO.searchByEmail('bentinho_capitu@bbi.solutions');
        userListPO.editarUsuario();
        userUpdatePO.alterarSenha('1234', '1234');
        expect(utils.getSweetAlertContent()).toContain('A senha foi alterada com sucesso.');
        utils.confirmSweetAlert();
    })
    it('Incluir nível de acesso com sucesso', () => {
        userListPO.searchByEmail('bentinho_capitu@bbi.solutions');
        userListPO.editarUsuario();
        userUpdatePO.selectNivelDeAcesso('Santander');
        userUpdatePO.salvarAlteracoesAcesso();
        expect(utils.getSweetAlertContent()).toContain('Alterações realizadas com sucesso.');
        utils.confirmSweetAlert();
    })
})