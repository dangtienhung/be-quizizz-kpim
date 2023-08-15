import { Injectable, Logger } from '@nestjs/common';
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
import { QuizizzExamAnswerService } from 'src/quizizz-exam-answer/quizizz-exam-answer.service';

@WebSocketGateway({ cors: true })
export class QuizizzGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('MessageGateway');
  constructor(private quizAnserExamService: QuizizzExamAnswerService) {}

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
    /* kiểm tra câu hỏi đã được trả lời chưa */
    const data = {
      questionId: payload.quizizzExamQuestionId,
      answerId: payload.quizizzExamQuestionAnswerId,
    };
    const isAnswered = await this.quizAnserExamService.checkAnswer(data);
    /* thêm đáp án câu trả lời vào db */
    await this.quizAnserExamService.createAnswer(payload);
    /* gửi đáp án câu trả lời cho client */
    this.server.emit('answerResult', isAnswered);
  }
}
