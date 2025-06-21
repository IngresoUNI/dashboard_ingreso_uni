import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SidebarService } from '../../services/sidebar.service';
import { SIDEBAR_ITEMS } from '../../utils/constants';
import { Util } from '../../utils/util';
import { UsuarioSistema } from '../../../core/models/usuario-sistema';
import { UserStorageService } from '../../services/user-storage.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private userStorageService: UserStorageService
  ) { }

  sidebarExpanded: boolean = false;
  userStorage?: any;
  sidebarItems: MenuItem[] = []

  ngOnInit(): void {
    this.userStorage = this.userStorageService.getUser();
    this.sidebarItems = Util.filtrarMenuPorTipoUsuario(SIDEBAR_ITEMS,this.userStorage.tipoUsuario||'');
    this.updateActiveItem(this.router.url)
    this.sidebarExpanded=this.sidebarService.isSidebarExpanded();
  }

  

  clickItem(item: any) {
    console.log('clickItem', item);
    if(item.items){
      if (item.expanded == false) {
        this.sidebarItems.forEach(it => {
          it.expanded = false
        })
        item.expanded = true
      } else {
        item.expanded = false
      }
    }else{
      this.router.navigateByUrl(item.url)
      this.updateActiveItem(item.url)
    }
  }

  clickSubitem(subitem:any){
    if(subitem.url){
      this.router.navigateByUrl(subitem.url)
      this.updateActiveItem(subitem.url)
    }
    
  }

  clickExpand() {
    this.sidebarExpanded = !this.sidebarExpanded;
    this.sidebarService.saveSidebarExpanded(this.sidebarExpanded);
  }

  setExpandedSidebarItems(value:boolean){
    this.sidebarItems.forEach(item => {
     item.expanded=value;
    });
  }

  setDisabledSidebarItems(value:boolean){
    this.sidebarItems.forEach(item => {
     item.disabled=value;
     if(item.items){
       item.items.forEach(subitem=>{
         subitem.disabled=value
       })
     }
    });
  }

  updateActiveItem(currentRoute:string){
    this.setExpandedSidebarItems(false);  //bandera para expandir items hijos en vista 
    this.setDisabledSidebarItems(true); //mostrar style de deseleccionado (automatico) en base a id, default=true
    this.sidebarItems.forEach(item=>{
      if(!item.items && item.url==currentRoute){
        item.disabled=false
      }else{
        item?.items?.forEach(subitem=>{
          if(subitem.url==currentRoute){
            item.disabled=false
            item.expanded=true
            subitem.disabled=false
          }
        });
      }
    })
  }

}
