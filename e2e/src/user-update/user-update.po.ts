import { Utils } from "../utils";
import { element, by } from "protractor";

export class UserUpdatePO {

    private utils: Utils = new Utils();

    private niveisDeAcesso = ['Admin', 'Santander', 'Tribal WordWide',
        'Suno Creators', 'Y&R', 'Predicta', 'PONTOMAP'];

    selectNivelDeAcesso(nivel: string) {
        let el = element.all(by.className('mdc-checkbox__native-control'));
        el.get(this.niveisDeAcesso.indexOf(nivel)).click();
    }
    salvarAlteracoesAcesso() {
        this.utils.performClickById('btn-salvar-alteracoes-acesso');
    }
    alterarSenha(senha: string, confirmacaoSenha: string) {
        this.utils.fillById('password', senha);
        this.utils.fillById('password_confirmation', confirmacaoSenha);
        this.utils.performClickById('btn-salvar-senha');
    }
}