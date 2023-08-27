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
import { QuizActivityService } from 'src/quiz-activity/quiz-activity.service';
import { QuizizzExamAnswerService } from 'src/quizizz-exam-answer/quizizz-exam-answer.service';
import { QuizizzExamService } from 'src/quizizz-exam/quizizz-exam.service';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({
  cors: {
    origin: ['https://fe-quizizz.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  },
})
export class QuizizzGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('MessageGateway');
  constructor(
    private quizAnserExamService: QuizizzExamAnswerService,
    private userService: UserService,
    private quizActivityService: QuizActivityService,
    private quizizzExamService: QuizizzExamService,
  ) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized..............................');
  }

  /* connect socket */
  async handleConnection(client: Socket) {
    this.logger.log(client.id, 'Connected..............................');
    console.log(`Client connected: ${client.id}`);
  }

  /* disconnect socket */
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
    /* gửi bài thi về */
    const quizizzExam = await this.quizizzExamService.getOne(payload.roomId);
    console.log('🚀 ~ file: quizizz.gateway.ts:63 ~ quizizzExam:', quizizzExam);
    /* reset player */
    // await this.quizizzExamService.resetPlayers(payload.roomId);
    /* lấy ra điểm của những người khác */
    const scores = await this.quizActivityService.findAllScoreByQuizizzExamId(
      payload.roomId,
      payload.useId.toString(),
    );
    /* gửi điểm cho client */
    this.server.emit('scores', scores);
    /* gửi bài thi về cho client */
    this.server.emit('quizizzExam', quizizzExam);
  }

  /* nhận câu hỏi người dùng gửi lên */
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
    /* gửi đáp án câu trả lời cho client */
    this.server.emit('answerResult', isAnswered);
  }

  /* thêm hoạt động người dùng vào */
  @SubscribeMessage('addQuizizzActivity')
  async handleAddQuizizzActivity(client: Socket, data: any) {
    const quizizzActivity = await this.quizActivityService.create(data);
    this.server.emit('quizizzActivity', quizizzActivity);
  }

  /* mutiple game players */
  /* cập nhật tên người dùng */
  @SubscribeMessage('updateName')
  async handleUpdateName(
    client: Socket,
    data: { userId: string; name: string },
  ) {
    const result = await this.userService.updateNameInQuizizzExam(
      data.userId,
      data.name,
    );
    this.server.emit('updateName', result);
  }
  /* lấy ra danh sách người chơi */
  /* cập nhật người dùng */
  @SubscribeMessage('addPlayerToExam')
  async handleUpdatePlayer(
    client: Socket,
    data: { roomId: string; idPlayer: string },
  ) {
    const result = await this.quizizzExamService.addPlayer(
      data.roomId,
      data.idPlayer,
    );
    /* nếu mà có trả data về exam về cho người dùng */
    if (result) {
      const quizizzExam = await this.quizizzExamService.getOne(data.roomId);
      this.server.emit('quizizzExam', quizizzExam);
    }
  }
  /* lấy ra điểm của những người khác */
  /* kích người chơi ra khỏi phòng chơi */
  @SubscribeMessage('kickOutGame')
  async handleKickOutGame(
    client: Socket,
    data: { roomId: string; idPlayer: string },
  ) {
    console.log(data.idPlayer);
    await this.quizizzExamService.removePlayer(data.roomId, data.idPlayer);
    const quizizzExam = await this.quizizzExamService.getOne(data.roomId);
    this.server.emit('quizizzExam', quizizzExam);
    /* gửi thông báo cho người bị kích là out game */
    this.server.emit('outGame', data.idPlayer);
  }
}
