import { Injectable } from '@angular/core';
import { UsuarioSistema } from '../../core/models/usuario-sistema';

@Injectable({
    providedIn: 'root'
})
export class UserStorageService {

    private readonly USER_KEY = 'USER_INFO_STORAGE';
    private readonly EXPIRATION_DURATION = 30 * 60 * 1000; // minutos * segundos * milisegundos

    constructor() { }

    public saveUser(user: any): void {
        const userInfo = {
            ...user,
            tokenCreated: new Date().toISOString()
        };
        localStorage.setItem(this.USER_KEY, JSON.stringify(userInfo));
    }

    public getUsername(){
        return this.getUser().nombreUsuario;
    }

    public getUser(): any {
        const userInfo = localStorage.getItem(this.USER_KEY);
        console.log('getUser', userInfo);
        return userInfo ? JSON.parse(userInfo) : null;
    }

    public isUserPresent(): boolean {
        return !!this.getUser();
    }

    public isUserExpired(): boolean {
        const user = this.getUser();
        if (!user) {
            return true;
        }

        const tokenCreated = new Date(user.tokenCreated);
        const now = new Date();
        const diff = now.getTime() - tokenCreated.getTime();

        return diff > this.EXPIRATION_DURATION;

    }

    public clearUser(): void {
        localStorage.removeItem(this.USER_KEY);
    }
}
