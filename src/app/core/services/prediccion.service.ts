import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../shared/utils/env';
import { lastValueFrom } from 'rxjs';
import { Response } from '../../shared/models/response';
import { UserStorageService } from '../../shared/services/user-storage.service';
import { TIPO_USUARIO } from '../../shared/utils/constants';

@Injectable({
    providedIn: 'root'
})
export class PrediccionService {

    private url: string = `${env.BACKEND_API_URL}/predicciones`

    private  apiython = 'https://146.190.113.84/app2';

    constructor(
        private http: HttpClient,
        private userStorageService: UserStorageService,
    ) {}

    listarPredicciones(idUsuario: number): Promise<Response<any[]>> {
        return lastValueFrom(this.http.get<Response<any[]>>(`${this.url}?idUsuario=${idUsuario}`));
    }


    listarParametros(): Promise<Response<any>> {
        return lastValueFrom(this.http.get<any>(`${this.apiython}/opciones`));
    }

    predecir(body: any): Promise<Response<any>> {
        return lastValueFrom(this.http.post<any>(`${this.apiython}/predecir`,body));
    }

    insertarPrediccion(prediccion: any): Promise<Response<any>> {
        return lastValueFrom(this.http.post<Response<any>>(`${this.url}`, prediccion));
    }

    async actualizarEstadoAuditoria(idUsuario: number, estadoAuditoria: string): Promise<Response<any>> {
        return lastValueFrom(this.http.patch<Response<any>>(`${this.url}/${idUsuario}`,{estadoAuditoria}));
    }

}