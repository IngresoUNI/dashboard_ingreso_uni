import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TituloService {
    private tituloSource = new Subject<string>();
    private currentTitulo = this.tituloSource.asObservable();


    constructor() { }

    setTitulo(titulo: string) {
        this.tituloSource.next(titulo);
    }

    getTitulo() {
        return this.currentTitulo;
    }

}   