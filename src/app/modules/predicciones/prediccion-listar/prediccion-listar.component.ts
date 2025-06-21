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
import { PrediccionCrearComponent } from '../prediccion-crear/prediccion-crear.component';
import { UserStorageService } from '../../../shared/services/user-storage.service';
import { PrediccionService } from '../../../core/services/prediccion.service';

@Component({
  selector: 'app-prediccion-listar',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TableModule,
    ButtonModule,
    InputSwitchModule,
    DropdownModule
  ],
  templateUrl: './prediccion-listar.component.html',
  styleUrl: './prediccion-listar.component.scss'
})
export class PrediccionListarComponent implements OnInit {

  predicciones: any[] = [];
  loading: boolean = false;
  ref: DynamicDialogRef | undefined;

  userStorage: any;


  constructor(
    private responseHandlerService: ResponseHandlerService,
    private messageDialogService: MessageDialogService,
    private dialogService: DialogService,
    private userStorageService: UserStorageService,
    private prediccionService: PrediccionService
  ){
    
  }

  ngOnInit(): void {
    this.userStorage = this.userStorageService.getUser();
    this.loadPrediccionesEstudiante();
  }

  async loadPrediccionesEstudiante(){
    this.loading = true;
    
    await this.responseHandlerService.handleResponseSilence(
      this.prediccionService.listarPredicciones(this.userStorage.idUsuario),
      (data:any)=>{
        console.log(data);
        this.predicciones = data;
      }
    );
    this.loading = false;
  }


  

  clickIniciarPrediccion(){
    this.ref = this.dialogService.open(PrediccionCrearComponent, 
      { 
        header: 'Iniciar una nueva predicción',
        width: '400px',
      });
    this.ref.onClose.subscribe(()=>{
      this.loadPrediccionesEstudiante();
    })
  }

}
