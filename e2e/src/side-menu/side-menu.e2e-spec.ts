import { LoginPO } from "../login/login.po";
import { TopToolbarPO } from "../top-toolbar/top-toolbar.po";
import { Utils } from "../utils";
import { SideMenuPO } from "./side-menu.po";

describe('Interação com Sidebar menu, com usuário BBI', () => {
    let loginPO: LoginPO;
    let topNavbarPO: TopToolbarPO;
    let utils: Utils;
    let sideMenuPO: SideMenuPO;

    beforeEach(() => {
        loginPO = new LoginPO();
        topNavbarPO = new TopToolbarPO();
        utils = new Utils();
        sideMenuPO = new SideMenuPO();
        loginPO.navigateTo('/');
        loginPO.doLogin('gm@bbi.solutions', '123');
    })

    afterEach(() => {
        topNavbarPO.doLogout();
    })

    it('Acesso ao menu Home', () => {
        sideMenuPO.openSubMenuLixeira();
        sideMenuPO.accessLixeiraChavesDeInsercao();
        sideMenuPO.openHome();
        expect(utils.getElementById('portal-title').getText()).toContain('SISTEMA TAGS SANTANDER');
    })

    it('Acesso ao menu Usuários opção cadastrar', () => {
        sideMenuPO.openSubMenuUsuarios();
        sideMenuPO.accessUsuariosCadastrar()
        expect(utils.getElementById('name').isPresent()).toBe(true);
    })
    it('Acesso ao menu Usuários opção gerenciar', () => {
        sideMenuPO.openSubMenuUsuarios();
        sideMenuPO.accessUsuariosGerenciar();
        expect(utils.getElementById('p-listagem-usuarios').getText()).toContain('LISTAGEM DE USUÁRIOS');
    })
    it('Acesso ao menu Chaves de Inserção opção gerenciar', () => {
        sideMenuPO.openSubMenuChavesDeInsercao();
        sideMenuPO.accessChavesDeInsercaoGerenciar();
        expect(utils.getElementById('btn-cadastrar').isPresent()).toBe(true);
        expect(utils.getElementById('btn-limpar-filtros').isPresent()).toBe(true);
        expect(utils.getElementById('table-insertions').isPresent()).toBe(true);
    })
    it('Acesso ao menu Chaves de Inserção opção cadastrar', () => {
        sideMenuPO.openSubMenuChavesDeInsercao();
        sideMenuPO.accessChavesDeInsercaoCadastrar();
        expect(utils.getElementById('reference_date').isPresent()).toBe(true);
        expect(utils.getElementById('pi_number').isPresent()).toBe(true);
        expect(utils.getElementById('btn-insertion-cadastrar').isPresent()).toBe(true);
    })

    it('Acesso ao menu Lixeira opção usuários', () => {
        sideMenuPO.openSubMenuLixeira();
        sideMenuPO.accessLixeiraUsuarios();
        expect(utils.getElementById('alert-usuarios-excluidos').getText()).toContain('Atenção, esses registros estão excluídos!');
        expect(utils.getElementById('table-usuarios-excluidos').isPresent()).toBe(true);
    })

    it('Acesso ao menu Lixeira opção chaves de inserção', () => {
        sideMenuPO.openSubMenuLixeira();
        sideMenuPO.accessLixeiraChavesDeInsercao();
        expect(utils.getElementById('alert-insercoes-excluidas').getText()).toContain('Atenção, esses registros estão excluídos!');
        expect(utils.getElementById('table-insercoes-excluidas').isPresent()).toBe(true);
    })
})
    // TODO: Teste de navegação com usuário Predicta
    // TODO: Teste de navegação com usuário tribal
    // TODO: Teste de navegação com usuário Suno
    // TODO: Teste de navegação com usuário YR
    // TODO: Teste de navegação com usuário Santander
    // TODO: Teste de navegação com usuário 