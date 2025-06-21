import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit  {
  title = 'front-admin-bot';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {

    //console.log = () => {}

    this.primengConfig.setTranslation({
      startsWith: 'Empieza por',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Termina en',
      equals: 'Es igual a',
      notEquals: 'No es igual a',
      lt: 'Menor que',
      lte: 'Menor o igual que',
      gt: 'Mayor que',
      gte: 'Mayor o igual que',
      is: 'Es',
      isNot: 'No es',
      before: 'Antes de',
      after: 'Después de',
      dateIs: 'Fecha es',
      dateIsNot: 'Fecha no es',
      dateBefore: 'Fecha es antes de',
      dateAfter: 'Fecha es después de',
      clear: 'Limpiar',
      apply: 'Aplicar',
      matchAll: 'Coincidir todo',
      matchAny: 'Coincidir cualquiera',
      addRule: 'Agregar regla',
      removeRule: 'Eliminar regla',
      noFilter: 'Sin filtro'
    });
  }

}
