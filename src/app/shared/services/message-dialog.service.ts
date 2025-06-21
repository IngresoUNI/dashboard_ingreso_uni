import { Injectable } from "@angular/core";
import { ConfirmationService, MessageService } from 'primeng/api';


@Injectable({
    providedIn: 'root'
})
export class MessageDialogService {
    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) { }

    confirm(accept: Function, reject: Function, message: string = '¿Estás seguro que deseas proceder?') {
        this.confirmationService.confirm({
            header: 'Confirmación',
            message: message,
            icon: 'pi pi-exclamation-triangle',
            accept: accept,
            reject: reject
        });
    }

    showSuccess(message: string = 'Operación completada con éxito') {
        this.messageService.add({ severity: 'success', summary: 'Alerta', detail: message ? message : 'Operación completada con éxito' });
    }

    showError(detail: string = 'Ha ocurrido un error') {
        this.messageService.add({ severity: 'error', summary: 'Alerta', detail: detail });
    }
}