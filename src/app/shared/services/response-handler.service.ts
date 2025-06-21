import { Injectable } from '@angular/core';
import { MessageDialogService } from './message-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerService {
  constructor(private messageDialogService: MessageDialogService) {}

  handleResponseSilence<T>(
    promise: Promise<T>, 
    successCallback: (data: any) => void, 
    errorCallback?: (error: string) => void
  ): Promise<T | null> {
    return promise.then((response: any) => {
      if (response.success) {
        //this.messageDialogService.showSuccess();
        successCallback(response.data);
        return response;
      } else {
        this.messageDialogService.showError(response.message);
        if (errorCallback) {
          errorCallback(response.message);
        }
        return null;
      }
    }).catch((error) => {
      console.error('Error en la respuesta:', error);
      this.messageDialogService.showError(error.error?.message || 'Intentelo de nuevo más tarde1');
      if (errorCallback) {
        errorCallback(error.error?.message || 'Intentelo de nuevo más tarde');
      }
      return null;
    });
  }

  handleResponse<T>(
    promise: Promise<T>, 
    successCallback?: (data: any) => void, 
    errorCallback?: (error: string) => void
  ): Promise<T | null> {
    return promise.then((response: any) => {
      console.log('response', response);
      if (response.success) {
        console.log('response.message',response.message)
        this.messageDialogService.showSuccess(response.message);
        if(successCallback){
          successCallback(response.data);
        }
        return response;
      } else {
        this.messageDialogService.showError(response.message);
        if (errorCallback) {
          errorCallback(response.message);
        }
        return null;
      }
    }).catch((error) => {
      console.error('handleResponse::Error en la respuesta:', error);
      this.messageDialogService.showError(error.error?.message || 'Intentelo de nuevo más tarde2');
      if (errorCallback) {
        errorCallback(error.error?.message || 'Intentelo de nuevo más tarde3');
      }
      return null;
    });
  }
}
