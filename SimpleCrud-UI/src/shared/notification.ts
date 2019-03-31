import Toastr from 'toastr';

export class Toaster {
    private position: string = 'top-center';
    private timeout: number = 2300;
    private message: string;
    private type: string;

    constructor() {
        Toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "100",
            "hideDuration": "300",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
          }
    }

    warning(message: string) {
        Toastr.warning(message);
    }

    error(message: string) {
        Toastr.error(message);
    }

    success(message: string) {
        Toastr.success(message);
    }

    info(message: string) {
        Toastr.info(message);
    }

    
}