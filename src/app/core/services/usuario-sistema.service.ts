import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { env } from '../../shared/utils/env';
import { lastValueFrom } from 'rxjs';
import { Response } from '../../shared/models/response';
import { UserStorageService } from '../../shared/services/user-storage.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioSistemaService {

    private url: string = `${env.BACKEND_API_URL}/usuario-sistemas`

    constructor(
        private http: HttpClient,
        private userStorageService: UserStorageService,
    ) {}

    async insertarUsuarioSistema(usuarioAD: string){
        return lastValueFrom(this.http.post<Response<Usuario[]>>(`${this.url}?usuarioAD=${usuarioAD}&usuarioAuditoria=${this.userStorageService.getUsername()}`,{}));
    }

    async listar(): Promise<Response<Usuario[]>> {
        return lastValueFrom(this.http.get<Response<Usuario[]>>(`${this.url}`));
    }

    async actualizarEstado(idUsuario: number, esEliminado: string): Promise<Response<Usuario>> {
        return lastValueFrom(this.http.patch<Response<Usuario>>(`${this.url}/${idUsuario}/estado?esEliminado=${esEliminado}&usuarioAuditoria=${this.userStorageService.getUsername()}`,null));
    }

    async actualizarTipoUsuario(idUsuario: number, tipoUsuario: string): Promise<Response<Usuario>> {
        return lastValueFrom(this.http.patch<Response<Usuario>>(`${this.url}/${idUsuario}/tipo-usuario?tipoUsuario=${tipoUsuario}&usuarioAuditoria=${this.userStorageService.getUsername()}`,null));
    }

}