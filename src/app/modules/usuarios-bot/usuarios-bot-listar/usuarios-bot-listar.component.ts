import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../core/models/usuario';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Response } from '../../../shared/models/response';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageDialogService } from '../../../shared/services/message-dialog.service';
import { TituloService } from '../../../shared/services/titulo.service';
import { ResponseHandlerService } from '../../../shared/services/response-handler.service';

@Component({
  selector: 'app-usuarios-bot-listar',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TableModule,
    ButtonModule,
    InputSwitchModule
  ],
  templateUrl: './usuarios-bot-listar.component.html',
  styleUrl: './usuarios-bot-listar.component.scss'
})
export class UsuariosBotListarComponent implements OnInit {

  usuariosBot: Usuario[] = [];
  loading: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private messageDialogService: MessageDialogService,
    private tituloService: TituloService,
    private responseHandlerService: ResponseHandlerService,
  ) {}

  ngOnInit(): void {
    this.tituloService.setTitulo('Usuarios BOT');
    this.loadUsuariosBot();
  }

  async loadUsuariosBot(){
    this.loading = true;
    await this.responseHandlerService.handleResponseSilence(
      this.usuarioService.listarUsuarios(),
      (data:any)=>{
        this.usuariosBot = data;
      }
    );
    this.loading = false;
  }

  async onChangeActivo(usuario: Usuario){
    // this.messageDialogService.confirm(
    //   async ()=>{
    //     this.responseHandlerService.handleResponse(
    //       this.usuarioService.actualizarEstado(usuario.idUsuario||0, usuario.esEliminado === '1' ? '0' : '1'),
    //       (data:any)=>{
    //         this.loadUsuariosBot();
    //       },
    //       (error:string)=>{
    //         this.loadUsuariosBot();
    //       }
    //     );
    //   },
    //   ()=>{
    //     this.loadUsuariosBot();
    //   }
    // );
  }

  

}
