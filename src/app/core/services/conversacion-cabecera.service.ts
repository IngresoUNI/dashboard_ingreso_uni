import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "../../shared/utils/env";
import { Response } from "../../shared/models/response";
import { ConversacionCabecera } from "../models/conversacion-cabecera";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ConversacionCabeceraService {

    private url: string = `${env.BACKEND_API_URL}/conversacion-cabeceras`

    constructor(
        private http: HttpClient
    ) {}

    listarUltimasConversacionCabeceras(): Promise<Response<ConversacionCabecera[]>> {
        return lastValueFrom(this.http.get<Response<ConversacionCabecera[]>>(`${this.url}/usuarios/ultima`));
    }

    filtrarConversacionCabeceras(idUsuarioTelegram: string): Promise<Response<ConversacionCabecera[]>> {
        return lastValueFrom(this.http.get<Response<ConversacionCabecera[]>>(`${this.url}/usuario/${idUsuarioTelegram}`));
    }


}