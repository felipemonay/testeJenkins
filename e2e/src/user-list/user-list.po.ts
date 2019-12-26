import { Utils } from "../utils";

export class UserListPO {
    
    private utils = new Utils();

    searchById(text: string) {
        this.utils.fillById('search_id', text);
    }
    searchByName(text: string) {
        this.utils.fillById('search_name', text);
    }
    searchByCompany(text: string) {
        this.utils.fillById('search_company_id', text);
    }
    searchByEmail(text: string) {
        this.utils.fillById('search_email', text);
    }
    searchByPhone(text: string) {
        this.utils.fillById('search_phone', text);
    }
    visualizarUsuario() {
        this.utils.performClickById('btn-visualizar');
    }
    editarUsuario(){
        this.utils.performClickById('btn-editar');
    }
    excluirUsuario(){
        this.utils.performClickById('btn-excluir');
    }
    checkboxStatus(){
        this.utils.performClickById('checkbox-status');
    }
}