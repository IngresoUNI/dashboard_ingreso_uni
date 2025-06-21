import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ConversacionCabecera } from '../../../core/models/conversacion-cabecera';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { Conversacion } from '../../../core/models/conversacion';
import { ConversacionService } from '../../../core/services/conversacion.service';
import { Response } from '../../../shared/models/response';
import { Util } from '../../../shared/utils/util';
import { ConversacionCabeceraService } from '../../../core/services/conversacion-cabecera.service';

@Component({
  selector: 'app-chat-mensajes',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    ButtonModule,
    InputTextModule,
    SkeletonModule
  ],
  templateUrl: './chat-mensajes.component.html',
  styleUrl: './chat-mensajes.component.scss'
})
export class ChatMensajesComponent implements OnChanges, OnDestroy {
  
  @Input() conversacionCabecera?: ConversacionCabecera;
  @ViewChild('chatscroll', { static: false }) private chatscroll?: ElementRef;


  loading: boolean = false;
  conversacionCabeceras: ConversacionCabecera[] = [];
  private interval: any;

  constructor(
    private conversacionCabeceraService: ConversacionCabeceraService
  ) { }

  async ngOnChanges() {
    console.log('conversacionCabecera',this.conversacionCabecera);
    if(this.conversacionCabecera){
      await this.loadConversaciones(this.conversacionCabecera.idUsuarioTelegram || '0');
      setTimeout(((this.scrollToBottom.bind(this))), 100);
      this.interval = setInterval(() => {
        this.loadConversaciones(this.conversacionCabecera?.idUsuarioTelegram || '0');
      }, 10*1000);
    }
  }
  
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  scrollToBottom(): void {
    try {
      console.log('scrollToBottom', this.chatscroll);
      if (this.chatscroll && this.chatscroll.nativeElement) {
        this.chatscroll.nativeElement.scrollTop = this.chatscroll.nativeElement.scrollHeight;
      } else {
        console.log('chatscroll is not defined or nativeElement is missing');
      }
    } catch(err) { 
      console.error(err);
    }                 
  }

  async loadConversaciones(idUsuarioTelegram: string){
    //this.loading = true;
    console.log('loadConversaciones',idUsuarioTelegram)
    const response: Response<ConversacionCabecera[]> = await this.conversacionCabeceraService.filtrarConversacionCabeceras(idUsuarioTelegram).catch(
      error => {
        console.error(error);
        return { success: false, data: [] };
      }
    );
    //this.loading = false;
    //
    console.log('response',response);
    if(response.success){
      this.conversacionCabeceras = response.data || [];
    }
  }

  canBeObject(value: string){
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  }

  toObject(value: string){
    return JSON.parse(value);
  }

  toEmoji = Util.convertUnicodeToEmoji;
  getAvatarColor = Util.getAvatarColor;
  getAvatarLabel = Util.getAvatarLabel;
  getLabelTipoConversacionCabecera = Util.getLabelTipoConversacionCabecera;
  getLabelEstadoConversacionCabecera = Util.getLabelEstadoConversacionCabecera;
  getColorEstadoConversacionCabecera = Util.getColorEstadoConversacionCabecera;
  getLabelCategoriaConversacionCabecera = Util.getLabelCategoriaConversacionCabecera;

}
