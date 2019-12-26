import { element, by } from "protractor";
import { Utils } from "../utils";

export class UserShowPO {

    private utils = new Utils();

    async isTextInList(searchText: string) {
        let lista = element.all(by.tagName('li'));
        let validacao = false;
        await lista.each(async li => {
            let text = await li.getText();
            if (text === searchText) {
                validacao = true;
            }
        })
        return validacao;
    }

    clickVoltarParaListaDeUsuarios() {
        this.utils.performClickById('btn-voltar');
    }
    clickEditarUsuario() {
        this.utils.performClickById('btn-editar-usuario');
    }
    clickExcluirUsuario() {
        this.utils.performClickById('btn-excluir-usuario');
    }
}