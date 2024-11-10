import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'], 
    });

    this.socket.on('connect', () => {
      console.log('Conectado ao servidor Socket.IO:', this.socket.id);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Erro de conexão com o Socket.IO:', error);
    });
  }

  emit(event: string, data?: any): void {
    this.socket.emit(event, data);
  }

  on(event: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      });

      return () => {
        this.socket.off(event);
      };
    });
  }
}
