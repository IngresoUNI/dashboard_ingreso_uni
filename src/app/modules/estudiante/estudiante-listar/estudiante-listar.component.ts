import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioSistema } from '../../../core/models/usuario-sistema';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { UsuarioService } from '../../../core/services/usuario.service';
import { ResponseHandlerService } from '../../../shared/services/response-handler.service';
import { MessageDialogService } from '../../../shared/services/message-dialog.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EstudianteCrearComponent } from '../estudiante-crear/estudiante-crear.component';

@Component({
  selector: 'app-estudiante-listar',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TableModule,
    ButtonModule,
    InputSwitchModule,
    DropdownModule
  ],
  templateUrl: './estudiante-listar.component.html',
  styleUrl: './estudiante-listar.component.scss'
})
export class EstudianteListarComponent implements OnInit {

  estudiantes: any[] = [];
  loading: boolean = false;
  ref: DynamicDialogRef | undefined;


  constructor(
    private usuarioService: UsuarioService,
    private responseHandlerService: ResponseHandlerService,
    private messageDialogService: MessageDialogService,
    private dialogService: DialogService
  ){
    
  }

  ngOnInit(): void {
    this.loadUsuarioSistemas();
  }

  async loadUsuarioSistemas(){
    this.loading = true;
    await this.responseHandlerService.handleResponseSilence(
      this.usuarioService.listarUsuarios(),
      (data:any)=>{
        this.estudiantes = data;
      }
    );
    this.loading = false;
  }

  async onChangeActivo(usuarioSistema: UsuarioSistema){
    // this.messageDialogService.confirm(
    //   async ()=>{
    //     this.responseHandlerService.handleResponse(
    //       this.usuarioService.actualizarEstado(usuarioSistema.idUsuarioSistema||0, usuarioSistema.esEliminado === '1' ? '0' : '1'),
    //       (data:any)=>{
    //         this.loadUsuarioSistemas();
    //       },
    //       (error:string)=>{
    //         this.loadUsuarioSistemas();
    //       }
    //     );
    //   },
    //   ()=>{
    //     this.loadUsuarioSistemas();
    //   }
    // );
  }

  async onChangeTipoUsuario(usuarioSistema: UsuarioSistema) {
    console.log('usuarioSistema',usuarioSistema);
    // this.messageDialogService.confirm(
    //   async ()=>{
    //     this.responseHandlerService.handleResponse(
    //       this.usuarioService.actualizarTipoUsuario(usuarioSistema.idUsuarioSistema||0, usuarioSistema.tipoUsuario||''),
    //       (data:any)=>{
    //         this.loadUsuarioSistemas();
    //       },
    //       (error:string)=>{
    //         this.loadUsuarioSistemas();
    //       }
    //     );
    //   },
    //   ()=>{
    //     this.loadUsuarioSistemas();
    //   }
    // );
  }

  clickAgregarUsuarioSistema(){
    this.ref = this.dialogService.open(EstudianteCrearComponent, 
      { 
        header: 'Registrar Nuevo Estudiante',
        width: '400px',
      });
    this.ref.onClose.subscribe(()=>{
      this.loadUsuarioSistemas();
    })
  }

}
