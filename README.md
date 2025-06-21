
# Proyecto Angular

Este es un proyecto desarrollado con Angular. A continuación, se detallan los pasos para instalar y ejecutar el proyecto en tu entorno local.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:

- [Node.js](https://nodejs.org/) (LTS recomendado) - El cual incluye npm (Node Package Manager)
- [Angular CLI](https://angular.io/cli) - Herramienta de línea de comandos de Angular

Puedes verificar si tienes Node.js y npm instalados ejecutando los siguientes comandos en la terminal:

```bash
node -v
npm -v
```

Si no tienes Angular CLI, puedes instalarlo globalmente usando npm:

```bash
npm install -g @angular/cli
```

## Instalación del proyecto

1. **Clona el repositorio**:
   
   Si aún no has descargado el proyecto, clónalo desde GitHub:

   ```bash
   git clone https://github.com/IngresoUNI/dashboard_ingreso_uni
   ```

2. **Accede al directorio del proyecto**:

   ```bash
   cd repo-angular
   ```

3. **Instala las dependencias**:

   Ejecuta el siguiente comando para instalar las dependencias del proyecto:

   ```bash
   npm install
   ```

## Ejecución del proyecto

1. **Inicia el servidor de desarrollo**:

   Una vez que las dependencias estén instaladas, puedes iniciar el servidor de desarrollo con el siguiente comando:

   ```bash
   ng serve
   ```

2. **Accede a la aplicación**:

   Abre tu navegador y navega a [http://localhost:4200](http://localhost:4200). Deberías ver la aplicación Angular en ejecución.

## Generar un build para producción

Si deseas generar un build optimizado para producción, utiliza el siguiente comando:

```bash
ng build --prod
```

Esto creará una carpeta `dist/` con todos los archivos necesarios para desplegar en un servidor de producción.

## Contribuir

1. Realiza un fork de este repositorio.
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`).
3. Haz tus cambios y realiza un commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Envía tus cambios a tu repositorio (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
