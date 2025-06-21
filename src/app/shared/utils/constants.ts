import { MenuItem } from "primeng/api";

export enum TIPO_USUARIO {
    ADMIN_COLEGIO = 'C',
    ESTUDIANTE = 'E',
}

export const LISTA_SEXOS = [
    { label: 'Masculino', value: 'M' },
    { label: 'Femenino', value: 'F' },
]

export const SIDEBAR_ITEMS: MenuItem[] = [
    {
        url: '/principal/home',
        label: 'Inicio',
        icon: 'fa fa-home fa-2x',
        visible: true,
        automationId: [TIPO_USUARIO.ESTUDIANTE,TIPO_USUARIO.ADMIN_COLEGIO],
    },
    {
        label: 'Predicciones',
        icon: 'fa fa-chart-line fa-2x',
        visible: true,
        automationId: [TIPO_USUARIO.ESTUDIANTE],
        url: '/principal/predicciones',
        // items: [
        //     {
        //         url: '/principal/usuarios-bot',
        //         label: 'Gestión Estudiantes',
        //         icon: 'fa-solid fa-users',
        //         visible: true,
        //         automationId: [TIPO_USUARIO_ESTUDIANTE,TIPO_USUARIO_COLEGIO],
        //     },
        //     {
        //         url: '/principal/chat',
        //         label: 'Historial Chats',
        //         icon: 'fa-brands fa-telegram',
        //         visible: true,
        //         automationId: [TIPO_USUARIO_ESTUDIANTE,TIPO_USUARIO_COLEGIO],
        //     }
        // ]
    },
    {
        label: 'Mantenimiento',
        icon: 'fa fa-tools fa-2x',
        visible: true,
        automationId: [TIPO_USUARIO.ADMIN_COLEGIO],
        items: [
            {
                url: '/principal/estudiantes',
                label: 'Estudiantes',
                icon: 'fa-solid fa-users',
                visible: true,
                automationId: [TIPO_USUARIO.ADMIN_COLEGIO],
            },
        ]
    }
];