import swal from 'sweetalert2';

export class SuccessHandler {
    public title: string = 'Sucesso!';

    public message: string = '';

    public constructor(message: string = '') {
        this.message = message;
    }

    show() {
        return swal.fire(this.title, this.message, 'success');
    }
}
