import { Utils } from "../utils";

export class UserCreatePO {

    private utils = new Utils();

    private generateNewEmail() {
        let email = Math.random().toString(36).substr(2, 10);
        return email;
    }

    fillName(name: string) {
        this.utils.fillById('name', name);
    }
    fillRandomEmail(email: string) {
        this.utils.fillById('email', this.generateNewEmail() + email);
    }
    fillEmail(email: string) {
        this.utils.fillById('email', email);
    }
    fillCpf(cpf: string) {
        this.utils.fillById('cpf', cpf);
    }
    fillPhone(telefone: string) {
        this.utils.fillById('phone', telefone);
    }
    fillPassword(password: string) {
        this.utils.fillById('password', password);
    }
    fillConfirmPassword(password: string) {
        this.utils.fillById('password_confirmation', password);
    }
    fillCompany(company: string) {
        this.utils.fillById('company_id', company);
    }
    fillOffice(office: string) {
        this.utils.fillById('office', office);
    }
    btnCadastrar() {
        this.utils.performClickById('btn-cadastrar');
    }
}