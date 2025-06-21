import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ChatComponent } from './modules/chat/chat/chat.component';
import { UsuariosBotListarComponent } from './modules/usuarios-bot/usuarios-bot-listar/usuarios-bot-listar.component';
import { AuthGuard } from './core/guards/auth.guard';
import { EstudianteListarComponent } from './modules/estudiante/estudiante-listar/estudiante-listar.component';
import { PrediccionListarComponent } from './modules/predicciones/prediccion-listar/prediccion-listar.component';

export const routes: Routes = [
    { path: '', redirectTo: '/principal', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'principal', component: MainLayoutComponent, canActivate:[AuthGuard], children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
            { path: 'estudiantes', component: EstudianteListarComponent, canActivate:[AuthGuard] },
            { path: 'predicciones', component: PrediccionListarComponent, canActivate:[AuthGuard] },
            { path: 'chat', component: ChatComponent, canActivate:[AuthGuard] }
        ]
    },
    { path: '**', redirectTo: '/principal' } 
];
