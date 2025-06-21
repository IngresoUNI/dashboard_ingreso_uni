import { Injectable } from "@angular/core";
import { env } from "../../shared/utils/env";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Response } from "../../shared/models/response";
import { Conversacion } from "../models/conversacion";

@Injectable({
    providedIn: 'root'
})
export class ConversacionService {
    private url: string = `${env.BACKEND_API_URL}/ChatBotAdministracion`

    constructor(
        private http: HttpClient
    ) {}

    
}