import { CommonModule, DatePipe } from '@angular/common';
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
import { PrediccionService } from '../../../core/services/prediccion.service';

@Component({
  selector: 'app-prediccion-crear',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    DatePipe
  ],
  templateUrl: './prediccion-crear.component.html',
  styleUrl: './prediccion-crear.component.scss'
})
export class PrediccionCrearComponent implements OnInit {
  loading: boolean = false;
  
  listaSexos: any[] = LISTA_SEXOS;
  errorMessage: string = '';
  userStorage: any;

  prediccion: any = {}
  usuario: any = {};
  queryParam: any = {};

  sexos: any[] = LISTA_SEXOS;

  parametros: any = {
    departamentos: [],
    provincias: [],
    distritos: [],
    especialidades: [],
    modalidades: [],
    domiciliosDepartamentos: [],
  }

  respuestaPrediccion: any = null;


  constructor(
    private responseHandlerService: ResponseHandlerService,
    private ref: DynamicDialogRef,
    private usuarioService: UsuarioService,
    private userStorageService: UserStorageService,
    private prediccionService: PrediccionService
  ){

  }
  async ngOnInit() {
    this.userStorage = this.userStorageService.getUser();

    this.queryParam = {
      colegioDistrito: '',
      colegioProvincia: '',
      colegioDepartamento: '',
      domicilioDepartamento:  '',
    }

    this.prediccion = {
      especialidad: '',
      usuario: this.userStorage,
      modalidad: '',
      anioPostula: '',
      anioNacimiento: '',
      horasMatematica: '',
      horasFisicaQuimica: '',
      horasAptitud: '',
      horasTotalSemana: '',
      calificacion: '',
    };

    this.loading = true;

    const data: any = await this.prediccionService.listarParametros();
     this.parametros = {
          departamentos: data.COLEGIO_DEPA.map((item:string) => ({label: item, value: item})),
          provincias: data.COLEGIO_PROV.map((item:string) => ({label: item, value: item})),
          distritos: data.COLEGIO_DIST.map((item:string) => ({label: item, value: item})),
          especialidades: data.ESPECIALIDAD.map((item:string) => ({label: item, value: item})),
          modalidades: data.MODALIDAD.map((item:string) => ({label: item, value: item})),
          domiciliosDepartamentos: data.DOMICILIO_DEPA.map((item:string) => ({label: item, value: item})),
        }

    this.loading = false;


  }

  formatDate(date: string): string {

    const parsedDate = new Date(date);
    //convert date to dd/mm/yyyy format
    const year = parsedDate.getFullYear();

    return `${year}`;
  }

  async onClickRegistrar(){

    this.errorMessage = '';
    this.prediccion.anioNacimiento = this.formatDate(this.prediccion.usuario.fechaNacimiento);
    this.prediccion.anioEgresoColegio = this.prediccion.usuario.anioEgresoColegio;

    console.log('onClickRegistrar', this.prediccion);

    if(Util.hasEmptyValues(this.prediccion)){
      this.errorMessage = 'Por favor, complete todos los campos requeridos.';
      return;
    }

    const payloadApi = {
            COLEGIO: `${this.prediccion.usuario.colegio.nombre}`,
            COLEGIO_DIST: `${this.queryParam.colegioDistrito}`,
            COLEGIO_PROV: `${this.queryParam.colegioProvincia}`,
            COLEGIO_DEPA: `${this.queryParam.colegioDepartamento}`,
            DOMICILIO_DEPA: `${this.queryParam.domicilioDepartamento}`,
            ESPECIALIDAD: `${this.prediccion.especialidad}`,
            MODALIDAD: `${this.prediccion.modalidad}`,
            SEXO: `${this.prediccion.usuario.sexo === 'M' ? 'MASCULINO' : 'FEMENINO'}`,

           COLEGIO_ANIO_EGRESO: parseInt(this.prediccion.usuario.anioEgresoColegio),
          ANIO_POSTULA: parseInt(this.prediccion.anioPostula),
          ANIO_NACIMIENTO: parseInt(this.prediccion.anioNacimiento),

          h_e_Matemática: parseFloat(this.prediccion.horasMatematica),
          h_e_fisica_quimica: parseFloat(this.prediccion.horasFisicaQuimica),
          h_e_Aptitud: parseFloat(this.prediccion.horasAptitud),
          h_total_semana: parseInt(this.prediccion.horasTotalSemana),
          calificacion: parseFloat(this.prediccion.calificacion),
        }

    console.log('payloadApi', payloadApi);

    this.respuestaPrediccion = await this.prediccionService.predecir(payloadApi);
    
    console.log('respuestaPrediccion', this.respuestaPrediccion);


    const respuestaFinal = await this.prediccionService.insertarPrediccion({
      ...this.prediccion,
      probabilidadIngreso: this.respuestaPrediccion.probabilidad_ingreso,
      prediccion: this.respuestaPrediccion.prediccion,
      riesgo: this.respuestaPrediccion.riesgo,
    })

    console.log('respuestaFinal', respuestaFinal);

  }

}
