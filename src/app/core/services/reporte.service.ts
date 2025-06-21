import { Injectable } from "@angular/core";
import { env } from "../../shared/utils/env";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Response } from "../../shared/models/response";

@Injectable({
    providedIn: 'root'
})
export class ReporteService {
    private url: string = `${env.BACKEND_API_URL}/reportes`

    constructor(
        private http: HttpClient
    ) {}

    public async listarContadores(){
        return lastValueFrom(this.http.get<Response<any[]>>(`${this.url}/contadores`));
    }

    public async listarConversacionesPorHora(){
        return lastValueFrom(this.http.get<Response<any[]>>(`${this.url}/conversaciones-por-hora`));
    }
}
