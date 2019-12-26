import swal from 'sweetalert2';
import {WarningHandler} from './warning-handler';

export class ErrorHandler {
    public error: any;

    public title = 'Atenção!';

    public error_type: any = 'error';

    public constructor(error: any = false) {
        if (error) {
            this.error = error;
        }
    }

    public show(message: string = '') {
        if (message) {
            return swal.fire(this.title, message, this.error_type);
        }

        if (this.error.status === 401) {
            return swal.fire(this.title, 'Você não tem permissão para acessar esta página e/ou ação.', this.error_type);
        }

        if (this.error.status === 405) {
            return swal.fire(this.title, 'Método não autorizado para seu usuário.', this.error_type);
        }

        if (this.error.status === 429) {
            return swal.fire(this.title, 'Muitas requisições realizadas, aguarde um momento.', this.error_type);
        }

        if (this.error.status === 500) {
            return swal.fire(this.title, 'Erro interno, contate o administrador.', this.error_type);
        }

        if ('old-version' === this.error) {
            return swal.fire(this.title,
                'O registro que você está tentando acessar está bloqueado pois possui a taxonomia no padrão antigo.', this.error_type);
        }

        if (this.error.error.warnings) {
            return new WarningHandler(this.error).show();
        }

        if (this.error.error.errors) {
            return swal.fire(this.title, Object.values(this.error.error.errors)[0][0], this.error_type);
        }
    }

    validDate (){
        
    }
}
