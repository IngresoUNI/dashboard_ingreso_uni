import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatMensajesComponent } from '../chat-mensajes/chat-mensajes.component';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { Util } from '../../../shared/utils/util';
import { TituloService } from '../../../shared/services/titulo.service';
import { ConversacionCabeceraService } from '../../../core/services/conversacion-cabecera.service';
import { ConversacionCabecera } from '../../../core/models/conversacion-cabecera';
import { Response } from '../../../shared/models/response';
import { AvatarModule } from 'primeng/avatar';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    ChatMensajesComponent,
    SkeletonModule,
    InputTextModule,
    AvatarModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy{
  loading:boolean=false;
  conversacionCabeceras:ConversacionCabecera[]=[];
  conversacionCabeceraSelected?: ConversacionCabecera;
  private interval: any;


  constructor(
    private tituloService: TituloService,
    private conversacionCabeceraService: ConversacionCabeceraService,
  ) { }

  ngOnInit(): void {
    this.tituloService.setTitulo('Historial de Chats');
    this.loadConversacionCabeceras();
    this.interval = setInterval(() => {
      this.loadConversacionCabeceras();
    }, 10*1000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  async loadConversacionCabeceras(){
    this.loading=true;
    const response: Response<ConversacionCabecera[]> = await this.conversacionCabeceraService.listarUltimasConversacionCabeceras()
      .catch(
        error => {
          console.error(error);
          return { success: false, data: [] };
        }
      );
    this.loading = false;
    console.log('response',response);
    if(response.success){
      this.conversacionCabeceras = response.data || [];
    }
  }

  

  showConversacion(conversacionCabecera: ConversacionCabecera){
    console.log('showConversacion',conversacionCabecera);
    this.conversacionCabeceraSelected=conversacionCabecera;
  }

  getPhoneNumberMask(phoneNumber: string):string {
    //return getPhoneNumberMaskPublic(phoneNumber);
    return phoneNumber;
  }

  toEmoji = Util.convertUnicodeToEmoji;
  getAvatarColor = Util.getAvatarColor;
  getAvatarLabel = Util.getAvatarLabel;
 
}
