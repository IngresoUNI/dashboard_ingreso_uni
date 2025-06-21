import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { UsuarioSistema } from '../../core/models/usuario-sistema';
import { Response } from '../../shared/models/response';
import { ResponseHandlerService } from '../../shared/services/response-handler.service';
import { UserStorageService } from '../../shared/services/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CardModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private responseHandlerService: ResponseHandlerService,
    private userStorageService: UserStorageService
  ){  }

  loading: boolean = false;
  username: string='';
  password: string='';
  showPassword: boolean = false;

  async login() {
    this.loading=true;
    await this.responseHandlerService.handleResponse(
      this.authService.login(this.username, this.password),
      (data:any)=>{
        console.log('Login successful', data);
        this.userStorageService.saveUser(data);
        this.router.navigate(['/principal/home']);
      }
    );
    this.loading=false;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


}
