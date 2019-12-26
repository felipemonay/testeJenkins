import { LoginPO } from "../login/login.po";
import { TopToolbarPO } from "../top-toolbar/top-toolbar.po";
import { Utils } from "../utils";
import { SideMenuPO } from "../side-menu/side-menu.po";
import { UserListPO } from "./user-list.po";

describe('Listagem de usuários, com usuário BBI', () => {
    let loginPO: LoginPO;
    let topNavbarPO: TopToolbarPO;
    let sideMenuPO: SideMenuPO;
    let userListPO: UserListPO;
    let utils: Utils;

    beforeEach(() => {
        loginPO = new LoginPO();
        topNavbarPO = new TopToolbarPO();
        sideMenuPO = new SideMenuPO();
        userListPO = new UserListPO();
        utils = new Utils();
        loginPO.navigateTo('/');
        loginPO.doLogin('gm@bbi.solutions', '123');
        sideMenuPO.openSubMenuUsuarios();
        sideMenuPO.accessUsuariosGerenciar();
        // TODO: Incluir usuário usado na busca no BD
    })

    afterEach(() => {
        topNavbarPO.doLogout();
    })

    it('Busca de usuário por ID', () => {
        userListPO.searchById('6');
        expect(utils.searchInTable('Carla Colautti Raucci')).toBe(true);
    })

    it('Buscar de usuário por NOME', () => {
        userListPO.searchByName('Carla Colautti');
        expect(utils.searchInTable('carlacolautti@santander.com.br')).toBe(true);
    })
    it('Busca de usuário por Empresa', () => {
        userListPO.searchByCompany('SANTANDER');
        expect(utils.searchInTable('SANTANDER')).toBe(true);
    })
    it('Busca de usuário por Telefone', () => {
        userListPO.searchByPhone('11989262563');
        expect(utils.searchInTable('11989262563')).toBe(true);
    })
})