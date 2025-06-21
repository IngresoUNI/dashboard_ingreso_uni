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
export class UsuarioService {

    private url: string = `${env.BACKEND_API_URL}/usuarios`

    constructor(
        private http: HttpClient,
        private userStorageService: UserStorageService,
    ) {}

    listarUsuarios(): Promise<Response<any[]>> {
        return lastValueFrom(this.http.get<Response<any[]>>(`${this.url}?tipoUsuario=${TIPO_USUARIO.ESTUDIANTE}`));
    }

    insertarUsuario(usuario: any): Promise<Response<any>> {
        return lastValueFrom(this.http.post<Response<any>>(`${this.url}`, usuario));
    }

    async actualizarEstadoAuditoria(idUsuario: number, estadoAuditoria: string): Promise<Response<any>> {
        return lastValueFrom(this.http.patch<Response<any>>(`${this.url}/${idUsuario}`,{estadoAuditoria}));
    }

}