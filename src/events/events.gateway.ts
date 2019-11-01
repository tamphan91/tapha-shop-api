import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    users: number = 0;
    // clients = [];
    clients = new Set<{id: number, client: Socket}>();
    index: number;
    async handleConnection(client: Socket) {
        // tslint:disable-next-line:no-console
        // console.log(client.id);
        // this.clients.add(client);
        // client.send('hello');
        // this.index = this.clients.push(client);
        // A client has connected
        this.users++;
        this.server.to(client.id).emit('events', 'welcome');

        // Notify connected clients of current users
        this.server.emit('users', this.users);
    }

    async handleDisconnect(client: Socket) {
        // this.clients.slice(this.index);
        // A client has disconnected
        // this.clients.delete(client);
        this.users--;

        // Notify connected clients of current users
        this.server.emit('users', this.users);

    }

    @SubscribeMessage('events')
    findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
        return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    }

    @SubscribeMessage('identity') // response without event
    async identity(@MessageBody() data: number): Promise<number> {
        return data + 20;
    }

    @SubscribeMessage('identity2') // response event
    async identity2(@MessageBody() data: number): Promise<any> {
        return  {event: 'events', data: 'event hello'};
    }
}
