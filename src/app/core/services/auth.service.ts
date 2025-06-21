import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { env } from '../../shared/utils/env';
import { Response } from '../../shared/models/response';
import { lastValueFrom } from 'rxjs';
import { UserStorageService } from '../../shared/services/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = `${env.BACKEND_API_URL}/auth`

  constructor(
    private http: HttpClient,
    private router: Router,
    private userStorageService: UserStorageService
  ) { }

  login(nombreUsuario: string, clave:string): Promise<Response<any>>{    
      return lastValueFrom(this.http.post<Response<any>>(`${this.url}/login`,{nombreUsuario, clave}));
  }

  async logout() {
    this.userStorageService.clearUser();
    this.router.navigate(['/login'])
  }


}
