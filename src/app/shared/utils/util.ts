import { MenuItem } from "primeng/api";

export class Util {

    static hasEmptyValues(obj: any): boolean {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                if (value === null || value === undefined || value === '') {
                    return true;
                }
            }
        }
        return false;
    }


    static getAvatarColor(name: string = 'D'): string {
        var hash = 0;
        var colors = [ '#2196F3', '#32c787', '#00BCD4', '#ff5652','#ffc107', '#ff85af', '#FF9800', '#39bbb0','#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
        '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6',
         '#f39c12', '#d35400', '#c0392b'];
        for (var i = 0; i < name.charAt(0).length; i++) {
          hash = 31 * hash + name.charCodeAt(i);
        }
        var index = Math.abs(hash % colors.length);
        return colors[index];
    }

    static getAvatarLabel(name: string = 'D'){
        return name.toUpperCase().charAt(0);
    }

    static convertUnicodeToEmoji(text: string): string {
        return text.replace(/#\[U\+([A-F0-9]+)\]/g, (_, code) => {
          return String.fromCodePoint(parseInt(code, 16));
        });
    }

    static getLabelTipoConversacionCabecera(tipo: string): string {
        switch (tipo) {
          case '1':
            return 'Incidencia';
          default:
            return 'Sin Tipo';
        }
    }

    static getLabelEstadoConversacionCabecera(estado: string): string {
      switch (estado) {
        case 'E':
          return 'En Curso';
        case 'A':
            return 'Abandonado';
        case 'T':
              return 'Terminado';
        default:
          return 'Desconocido';
      }
    }

    static getColorEstadoConversacionCabecera(estado: string): string {
      switch (estado) {
        case 'E':
          return '#ffc107';
        case 'A':
            return '#ff5652';
        case 'T':
              return '#32c787';
        default:
          return 'black';
      }
    }

    static filtrarMenuPorTipoUsuario(menuItems: MenuItem[], tipoUsuario: string): MenuItem[] {
      return menuItems
          .filter(item => {
              const tieneAcceso = item.automationId && item.automationId.includes(tipoUsuario);
              if (item.items) {
                  item.items = this.filtrarMenuPorTipoUsuario(item.items, tipoUsuario);
              }
              return tieneAcceso || (item.items && item.items.length > 0);
          });
  }

    static getLabelCategoriaConversacionCabecera(codigoSistema: string): string {
      const categorias =  [
        { descripcion: 'Requerimiento', codigoSistema: '2' },
        { descripcion: 'Accesos y Permisos', codigoSistema: '1722' },
        { descripcion: 'Correo Electronico', codigoSistema: '1723' },
        { descripcion: 'Buzón de correo lleno', codigoSistema: '1737' },
        { descripcion: 'No accede al correo', codigoSistema: '1725' },
        { descripcion: 'No recepciona correos', codigoSistema: '1736' },
        { descripcion: 'Cuenta de usuario', codigoSistema: '1738' },
        { descripcion: 'Cuenta de usuario bloqueada', codigoSistema: '1746' },
        { descripcion: 'Fileserver', codigoSistema: '1759' },
        { descripcion: 'Archivos eliminados', codigoSistema: '1878' },
        { descripcion: 'Unidad de red desconectada', codigoSistema: '1879' },
        { descripcion: 'Internet', codigoSistema: '1747' },
        { descripcion: 'Sin servicio a internet', codigoSistema: '1749' },
        { descripcion: 'Intranet', codigoSistema: '1750' },
        { descripcion: 'No accede a la intranet', codigoSistema: '1752' },
        { descripcion: 'Red inalámbrica ( Wi Fi)', codigoSistema: '1756' },
        { descripcion: 'No accede al Wi-Fi', codigoSistema: '1758' },
        { descripcion: 'Red privada virtual (VPN)', codigoSistema: '1753' },
        { descripcion: 'No accede al servicio VPN', codigoSistema: '1755' },
        { descripcion: 'Equipos Informáticos', codigoSistema: '1769' },
        { descripcion: 'Dispositivos portátiles', codigoSistema: '1770' },
        { descripcion: 'Celulares', codigoSistema: '1915' },
        { descripcion: 'Laptop', codigoSistema: '1771' },
        { descripcion: 'Tablet', codigoSistema: '1772' },
        { descripcion: 'Equipo de impresión y escaneo', codigoSistema: '1780' },
        { descripcion: 'Escaner', codigoSistema: '1781' },
        { descripcion: 'Impresora', codigoSistema: '1782' },
        { descripcion: 'Impresora Multifuncional', codigoSistema: '1783' },
        { descripcion: 'Plotter', codigoSistema: '1784' },
        { descripcion: 'Equipo Multimedia', codigoSistema: '1785' },
        { descripcion: 'Equipo de sonido', codigoSistema: '1786' },
        { descripcion: 'Proyector', codigoSistema: '1787' },
        { descripcion: 'Equipos Audiovisuales', codigoSistema: '1773' },
        { descripcion: 'Televisor', codigoSistema: '1774' },
        { descripcion: 'Equipos de Escritorio', codigoSistema: '1775' },
        { descripcion: 'CPU', codigoSistema: '1776' },
        { descripcion: 'Monitor', codigoSistema: '1777' },
        { descripcion: 'Mouse', codigoSistema: '1779' },
        { descripcion: 'Teclado', codigoSistema: '1778' },
        { descripcion: 'Equipos Telefónicos', codigoSistema: '1763' },
        { descripcion: 'Anexo Telefónico', codigoSistema: '1764' },
        { descripcion: 'Dispositivos Móviles', codigoSistema: '1768' },
        { descripcion: 'Evaluaciones Tecnicas', codigoSistema: '1891' },
        { descripcion: 'Programas y Aplicaciones', codigoSistema: '1788' },
        { descripcion: 'Aplicaciones externas', codigoSistema: '1789' },
        { descripcion: 'Adobe Acrobat', codigoSistema: '1810' },
        { descripcion: 'Adobe Creative Cloud', codigoSistema: '1809' },
        { descripcion: 'ArcGIS', codigoSistema: '1811' },
        { descripcion: 'AutoCAD', codigoSistema: '1812' },
        { descripcion: 'Bizagi', codigoSistema: '1813' },
        { descripcion: 'Bmatic', codigoSistema: '1821' },
        { descripcion: 'Control de Legajos', codigoSistema: '1823' },
        { descripcion: 'DataCard ID Works', codigoSistema: '1817' },
        { descripcion: 'DJI - Declaración Jurada de Intereses', codigoSistema: '1842' },
        { descripcion: 'ECCAIRS', codigoSistema: '1818' },
        { descripcion: 'Eviews', codigoSistema: '1819' },
        { descripcion: 'FirmaONPE', codigoSistema: '1836' },
        { descripcion: 'FirmaPeru', codigoSistema: '1837' },
        { descripcion: 'Google Earth Pro', codigoSistema: '1834' },
        { descripcion: 'IBM SPSS', codigoSistema: '1814' },
        { descripcion: 'Imagine Soft', codigoSistema: '1835' },
        { descripcion: 'LaserFiche', codigoSistema: '1820' },
        { descripcion: 'Llama.pe - Certificado Digital', codigoSistema: '1838' },
        { descripcion: 'Melissa', codigoSistema: '1822' },
        { descripcion: 'Narda', codigoSistema: '1815' },
        { descripcion: 'Otras Aplicaciones', codigoSistema: '1845' },
        { descripcion: 'PDT - SUNAT', codigoSistema: '1832' },
        { descripcion: 'PIDE', codigoSistema: '1833' },
        { descripcion: 'Radio Mobile', codigoSistema: '1816' },
        { descripcion: 'ReFirma', codigoSistema: '1841' },
        { descripcion: 'Registro de visitas', codigoSistema: '1843' },
        { descripcion: 'RENIEC - Certificado Digital', codigoSistema: '1839' },
        { descripcion: 'RENIEC - Consultas en linea', codigoSistema: '1840' },
        { descripcion: 'SIAF', codigoSistema: '1824' },
        { descripcion: 'SID', codigoSistema: '1825' },
        { descripcion: 'SIGA MEF', codigoSistema: '1826' },
        { descripcion: 'SIGNNET', codigoSistema: '1890' },
        { descripcion: 'SIGPRES', codigoSistema: '1827' },
        { descripcion: 'SISACO', codigoSistema: '1828' },
        { descripcion: 'SISGEDO', codigoSistema: '1829' },
        { descripcion: 'Sistema de colas', codigoSistema: '1844' },
        { descripcion: 'SPIJ', codigoSistema: '1830' },
        { descripcion: 'VUCE', codigoSistema: '1831' },
        { descripcion: 'Aplicaciones MTC', codigoSistema: '1790' },
        { descripcion: 'Agenda Ministerial', codigoSistema: '1791' },
        { descripcion: 'Aula Virtual', codigoSistema: '1792' },
        { descripcion: 'Casilla Electrónica', codigoSistema: '1793' },
        { descripcion: 'Ellipse', codigoSistema: '1794' },
        { descripcion: 'IGACC', codigoSistema: '1795' },
        { descripcion: 'MOREC', codigoSistema: '1796' },
        { descripcion: 'MPV - Mesa de partes virtual', codigoSistema: '1797' },
        { descripcion: 'RENAT', codigoSistema: '1798' },
        { descripcion: 'SIGA GESTOR', codigoSistema: '1799' },
        { descripcion: 'SIGA WEB', codigoSistema: '1800' },
        { descripcion: 'SIGIEP', codigoSistema: '1801' },
        { descripcion: 'SINARETT', codigoSistema: '1889' },
        { descripcion: 'SISGEC', codigoSistema: '1802' },
        { descripcion: 'SNC', codigoSistema: '1803' },
        { descripcion: 'SNS', codigoSistema: '1804' },
        { descripcion: 'SSO', codigoSistema: '1805' },
        { descripcion: 'STD', codigoSistema: '1806' },
        { descripcion: 'Incidencia', codigoSistema: '1' },
        { descripcion: 'TUPA Digital', codigoSistema: '1807' },
        { descripcion: 'Navegadores', codigoSistema: '1855' },
        { descripcion: 'Google Chrome', codigoSistema: '1856' },
        { descripcion: 'Microsoft Edge', codigoSistema: '1857' },
        { descripcion: 'Mozilla Firefox', codigoSistema: '1858' },
        { descripcion: 'Opera', codigoSistema: '1859' },
        { descripcion: 'Otros', codigoSistema: '1860' },
        { descripcion: 'Ofimática', codigoSistema: '1846' },
        { descripcion: 'Microsoft Excel', codigoSistema: '1847' },
        { descripcion: 'Microsoft Outlook', codigoSistema: '1848' },
        { descripcion: 'Microsoft Power BI', codigoSistema: '1849' },
        { descripcion: 'Microsoft Project', codigoSistema: '1850' },
        { descripcion: 'Microsoft Visio', codigoSistema: '1851' },
        { descripcion: 'Microsoft Windows', codigoSistema: '1852' },
        { descripcion: 'Microsoft Word', codigoSistema: '1853' },
        { descripcion: 'Otras Aplicaciones', codigoSistema: '1854' },
        { descripcion: 'Video conferencia', codigoSistema: '1861' },
        { descripcion: 'Cisco Webex', codigoSistema: '1862' },
        { descripcion: 'Google Meet', codigoSistema: '1863' },
        { descripcion: 'Zoom', codigoSistema: '1864' },
        { descripcion: 'Recursos Informáticos', codigoSistema: '1900' },
        { descripcion: 'Movimiento de Equipos', codigoSistema: '1911' },
        { descripcion: 'Anexo', codigoSistema: '1912' },
        { descripcion: 'Equipo de computo', codigoSistema: '1913' },
        { descripcion: 'Impresora', codigoSistema: '1914' },
        { descripcion: 'Servicios Informáticos', codigoSistema: '1865' },
        { descripcion: 'Sala de reuniones', codigoSistema: '1885' },
        { descripcion: 'Apagado de equipos audiovisuales', codigoSistema: '1886' },
        { descripcion: 'Encendido de equipo audiovisuales', codigoSistema: '1887' },
        { descripcion: 'Reuniones virtuales', codigoSistema: '1888' }
    ];
      return categorias.find(c => c.codigoSistema === codigoSistema)?.descripcion || 'Sin Categoria';
    }

   
}