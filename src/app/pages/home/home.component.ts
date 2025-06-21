import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { TituloService } from '../../shared/services/titulo.service';
import { ReporteService } from '../../core/services/reporte.service';
import { Response } from '../../shared/models/response';
import { CardInfoComponent } from '../../shared/components/card-info/card-info.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { UserStorageService } from '../../shared/services/user-storage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ChartModule,
    CardModule,
    ButtonModule,
    CardInfoComponent,
    TimelineModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  userStorage?: any;

  constructor(
    private tituloService: TituloService,
    private userStorageService: UserStorageService,
    private router: Router,
  ) {
    
    

   }

  async ngOnInit() {

    this.tituloService.setTitulo('Inicio');
    this.userStorage = this.userStorageService.getUser();
    
  }

  onClickNuevaPrediccion() {
    //navigate and reload page
    this.router.navigate(['/principal/predicciones']).then(() => {
      window.location.reload();
    });
  }

  




  

}


