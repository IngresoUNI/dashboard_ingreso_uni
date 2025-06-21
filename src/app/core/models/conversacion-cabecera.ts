import { Conversacion } from "./conversacion";
import { Usuario } from "./usuario";

export class ConversacionCabecera {
    idConversacionCabecera?: number;
    hash?: string;
    idUsuario?: number;
    idUsuarioTelegram?: string;
    idTicket?: string;
    estado?: string;
    asunto?: string;
    descripcion?: string;
    categoria?: string;
    tipo?: string;
    estadoAuditoria?: string;
    fechaCreacionAuditoria?: string;
    conversaciones?: Conversacion[];
    usuario?: Usuario
}