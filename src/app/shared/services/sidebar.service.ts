import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private KEY_SIDEBAREXPANDED:string='KEY_SIDEBAREXPANDED';

  constructor() { }

  saveSidebarExpanded(expanded:boolean) {
    localStorage.setItem(this.KEY_SIDEBAREXPANDED,`${expanded}`);
  }

  isSidebarExpanded(): boolean {
    return (localStorage.getItem(this.KEY_SIDEBAREXPANDED) || 'false') == 'true';
  }
}