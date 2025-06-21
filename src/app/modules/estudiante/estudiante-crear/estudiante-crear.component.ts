import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ResponseHandlerService } from '../../../shared/services/response-handler.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsuarioService } from '../../../core/services/usuario.service';
import { LISTA_SEXOS, TIPO_USUARIO } from '../../../shared/utils/constants';
import { DropdownModule } from 'primeng/dropdown';
import { Util } from '../../../shared/utils/util';
import { UserStorageService } from '../../../shared/services/user-storage.service';

@Component({
  selector: 'app-estudiante-crear',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
  ],
  templateUrl: './estudiante-crear.component.html',
  styleUrl: './estudiante-crear.component.scss'
})
export class EstudianteCrearComponent implements OnInit {
  loading: boolean = false;
  estudiante: any = {}
  listaSexos: any[] = LISTA_SEXOS;
  errorMessage: string = '';

  constructor(
    private responseHandlerService: ResponseHandlerService,
    private ref: DynamicDialogRef,
    private usuarioService: UsuarioService,
    private userStorageService: UserStorageService,
  ){

  }
  ngOnInit(): void {
    const userStorage = this.userStorageService.getUser();

    this.estudiante = {
      nombreUsuario: '',
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      correo: '',
      telefono: '',
      sexo: '',
      fechaNacimiento: '',
      anioEgresoColegio: '',
      colegio: {
        idColegio: userStorage?.colegio?.idColegio || 0,
      },
      tipoUsuario: TIPO_USUARIO.ESTUDIANTE,
      clave: '123456',
    };
  }

  async onClickRegistrar(){

    this.errorMessage = '';

    console.log('onClickRegistrar', this.estudiante);

    if(Util.hasEmptyValues(this.estudiante)){
      this.errorMessage = 'Por favor, complete todos los campos requeridos.';
      return;
    }


    this.loading=true;
    await this.responseHandlerService.handleResponse(
      this.usuarioService.insertarUsuario(this.estudiante),
      ()=>{
        this.ref.close();
      }
    )
    this.loading=false;
  }

}
