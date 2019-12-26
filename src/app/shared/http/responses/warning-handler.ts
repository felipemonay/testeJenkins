import swal from 'sweetalert2';

export class WarningHandler {
    public error: any;

    public title: string = 'Alerta!';

    public error_type: any = 'warning';

    public constructor(error: any = false) {
        if (error) {
            this.error = error;
        }
    }

    public show(message: string = '') {
        if (message) {
            return swal.fire(this.title, message, this.error_type);
        }

        if (this.error.error.warnings) {
            return swal.fire(this.title, Object.values(this.error.error.warnings)[0][0], this.error_type);
        }
    }
}
