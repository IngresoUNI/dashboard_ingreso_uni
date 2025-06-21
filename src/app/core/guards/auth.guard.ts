import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserStorageService } from "../../shared/services/user-storage.service";
import { SIDEBAR_ITEMS } from "../../shared/utils/constants";

export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {


    const router: Router = inject(Router);
    const userStorage: UserStorageService = inject(UserStorageService);

    if (userStorage.isUserExpired()) {
        console.log('redirigiendo a login');
        return router.navigate(['login']);
    }

    // const user = userStorage.getUser();


    // const canAccess = checkUserAccess(state.url, user.tipoUsuario);

    // if (!canAccess) {
    //     console.log('Rol no permitido para la ruta, redirigiendo a login');
    //     return router.navigate(['']);
    // }

    return true;

}

function checkUserAccess(url: string, userRole: string): boolean {
    console.log('checkUserAccess',url,userRole)
    for (const item of SIDEBAR_ITEMS) {
      if (compareRoutes(item.url, url) && item.automationId.includes(userRole)) {
        return true;
      }
  
      // Verificar subitems si existen
      if (item.items) {
        for (const subItem of item.items) {
          if (compareRoutes(subItem.url, url) && subItem.automationId.includes(userRole)) {
            return true;
          }
        }
      }
    }
  
    return false; // No hay acceso
  }

  function compareRoutes(itemUrl: string | undefined, currentUrl: string): boolean {
    return itemUrl ? currentUrl.startsWith(itemUrl) : false;
  }

  /*
  import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SESSION_STORAGE_USUARIO_SISTEMA, SIDEBAR_ITEMS } from '../../shared/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const usuarioSistema = JSON.parse(localStorage.getItem(SESSION_STORAGE_USUARIO_SISTEMA) || '{}');
    const isAuthenticated = !!usuarioSistema;
    const tipoUsuario = usuarioSistema.tipoUsuario;

    if (!isAuthenticated) {
      localStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }

    // Validar si el tipo de usuario tiene acceso a la ruta completa (ruta completa desde el state.url)
    const rutaPermitida = this.validarAccesoRuta(state.url, tipoUsuario);

    if (!rutaPermitida) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

  private validarAccesoRuta(url: string, tipoUsuario: string): boolean {
    // Filtrar los items del menú basado en el tipo de usuario
    const items = this.filtrarMenuPorTipoUsuario(SIDEBAR_ITEMS, tipoUsuario);

    // Comparar la URL completa de la ruta solicitada con las rutas del menú
    return items.some(item => 
      this.compararRutas(item, url) || 
      (item.items && item.items.some((subItem:any) => this.compararRutas(subItem, url)))
    );
  }

  // Función para comparar la ruta actual con la ruta del menú
  private compararRutas(item: any, url: string): boolean {
    return item.url && url.startsWith(item.url);
  }

  private filtrarMenuPorTipoUsuario(menuItems: any[], tipoUsuario: string): any[] {
    return menuItems.filter(item => {
      const tieneAcceso = item.automationId && item.automationId.includes(tipoUsuario);

      if (item.items) {
        item.items = this.filtrarMenuPorTipoUsuario(item.items, tipoUsuario);
      }

      return tieneAcceso || (item.items && item.items.length > 0);
    });
  }
}

  
  
  */


  