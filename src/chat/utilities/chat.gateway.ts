import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({})
export class ChatGateway {
  @SubscribeMessage('message')
  handleMessage(client: Socket, message: any) {
    console.log('Message received: ', message);
    client.emit('reply', 'Hello from server');
  }
}
