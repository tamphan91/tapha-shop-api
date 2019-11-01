// tslint:disable-next-line:max-line-length
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Message } from './chat.message';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
    clients = new Map<string, string>();
    async handleConnection(client: Socket) {
        // this.server.emit('users', this.clientIds);
    }

    async handleDisconnect(client: Socket) {
        // this.server.emit('users', this.clientIds);
    }

    @SubscribeMessage('login')
    async login(client: Socket, name) {
        this.clients.set(name, client.id);
        Logger.log('login successfully');
        return { event: 'login', data: 'login successfully' };
    }

    @SubscribeMessage('logout')
    async logout(client: Socket, name) {
        Logger.log('logout successfully');
        return { event: 'logout', data: 'logout successfully' };
    }

    @SubscribeMessage('join-room')
    async joinRoom(client: Socket, roomName) {
        client.join(roomName);
        return 'joined room successfully';
    }

    @SubscribeMessage('chat')
    async onChat(client: Socket, message: Message) {
        // tslint:disable-next-line:no-console
        console.log(Object.keys(client.rooms));
        // tslint:disable-next-line:no-console
        console.log(message);
        if (message.type === 'single') {
            client.to(this.clients.get(message.recipient)).emit('chat', message);
        } else {
            client.to(message.recipient).emit('chat', message);
        }
        return { event: 'chat', data: 'sent message successfully' };
    }

    @SubscribeMessage('chat-all')
    async onChatAll(client: Socket, message) {
        // tslint:disable-next-line:no-console
        // console.log(client);
        client.broadcast.emit('chat-all', message);
        return { event: 'chat-all', data: 'sent message successfully' };
    }

}

// @WebSocketGateway()
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

//     @WebSocketServer() server;
//     users: number = 0;
//     // clients = [];
//     clients = new Set<{id: number, client: Socket}>();
//     index: number;
//     async handleConnection(client: Socket) {
//         // tslint:disable-next-line:no-console
//         console.log(client.id);
//         client.send();
//         // this.clients.add(client);
//         // client.send('hello');
//         // this.index = this.clients.push(client);
//         // A client has connected
//         this.users++;

//         // Notify connected clients of current users
//         this.server.emit('users', this.users);
//     }

//     async handleDisconnect(client: Socket) {
//         // this.clients.slice(this.index);
//         // A client has disconnected
//         // this.clients.delete(client);
//         this.users--;

//         // Notify connected clients of current users
//         this.server.emit('users', this.users);

//     }

//     @SubscribeMessage('connect')
//     async connect(client, id) {
//         // tslint:disable-next-line:no-console
//         console.log(id + ' is connected');
//         this.clients.add({id, client});
//     }

//     @SubscribeMessage('chat')
//     async onChat(client: Socket, message) {
//         // tslint:disable-next-line:no-console
//         // console.log(client);
//         client.broadcast.emit('chat', message);
//         return {event: 'events', data: 'chat hello'};
//     }

//     @SubscribeMessage('add')
//     async add(client, message) {
//         this.users++;
//         // tslint:disable-next-line:no-console
//         // console.log(client);
//         // client.broadcast.emit('chat', message);
//         // return {event: 'events', data: 'chat hello'};
//     }

//     @SubscribeMessage('events')
//     handleEvent(client: Socket, data: any): any {
//         // tslint:disable-next-line:no-console
//         console.log(data);
//         for (const e of this.clients) {
//             if (e.client !== client && data.id === e.id) {
//                 e.client.send(data.message);
//             }
//         }
//         return this.clients.size;
//     }

// }
