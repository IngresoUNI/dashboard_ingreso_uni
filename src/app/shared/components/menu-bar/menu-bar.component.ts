import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { ButtonModule } from 'primeng/button'
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../../core/services/auth.service';
import { TituloService } from '../../services/titulo.service';
import { SIDEBAR_ITEMS } from '../../utils/constants';
import { UsuarioSistema } from '../../../core/models/usuario-sistema';
import { Util } from '../../utils/util';
import { UserStorageService } from '../../services/user-storage.service';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [
    CommonModule,
    MenuModule,
    ButtonModule,
    MenubarModule
  ],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent implements OnInit {

  titulo: string = '';
  userMenuItems: MenuItem[] = [];
  menubarItems: MenuItem[] = []
  userStorage?: any;

  //user!: UserModel
  //loggedProfile!:UserTypeModel;

  constructor(
    //private dataService: DataService,
    private tituloService: TituloService,
    private authService: AuthService,
    private userStorageService: UserStorageService 
  ) { }

  async ngOnInit() {

    this.userStorage = this.userStorageService.getUser();

    this.tituloService.getTitulo().subscribe({
      next: (titulo: string) => {
        this.titulo = titulo;
      }
    });

    this.menubarItems = Util.filtrarMenuPorTipoUsuario(SIDEBAR_ITEMS,this.userStorage.tipoUsuario||'');

    this.userMenuItems = [
      /*{
        label: 'Mi cuenta',
        items: [
          { label: 'Mi perfil', icon: 'fas fa-id-badge' }
        ]
      },*/
      {
        label: 'Opciones',
        items: [
          {
            label: 'Salir', 
            icon: 'fas fa-sign-out', 
            command: () => {
              this.authService.logout()
            }
          }
        ]
      }
    ];
  }

  


}
