import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { CreateQuizizzExamAnswerDto } from 'src/quizizz-exam-answer/dto/create.dto';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class QuizizzGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('MessageGateway');

  constructor() {
    console.log(this.logger);
  }

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {}

  async handleConnection(client: Socket) {
    this.logger.log(client.id, 'Connected..............................');
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('answerSubmitted')
  async handleAnswerSubmitted(
    client: Socket,
    payload: CreateQuizizzExamAnswerDto,
  ) {
    console.log('🚀 ~ file: quizizz.gateway.ts:33 ~ client:', client);
    console.log('answerSubmitted', payload);
    const isAnswered = true; /* kiểm tra câu hỏi đã được trả lời chưa */
    /* thêm đáp án câu trả lời vào db */
    console.log('🚀 ~ file: quizizz.gateway.ts:35 ~ isAnswered:', isAnswered);
  }
}
