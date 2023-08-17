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
import { UserService } from 'src/user/user.service';

@WebSocketGateway({
  cors: {
    origin: ['https://fe-quizizz.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
})
export class QuizizzGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('MessageGateway');
  constructor(
    private quizAnserExamService: QuizizzExamAnswerService,
    private userService: UserService,
  ) {}

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

  /* lưu thông tin phòng chơi vào quiz-exam của người dùng */
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    client: Socket,
    payload: { roomId: string; useId: string },
  ) {
    /* kiểm tra xem người dùng đó có tồn tại hay không và add thêm vào quizExam đã chơi  */
    await this.userService.addQuizizzToUser(payload);
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
