import { DomainEvents } from '~/core/events/domain-events'
import { EventHandler } from '~/core/events/event-handler'
import { SendNotificationUseCase } from '../use-case/send-notification'
import { QuestionBestAnswerChooseEvent } from '~/domain/forum/enterprise/events/question-best-answer-choose'
import { AnswerRepository } from '~/domain/forum/application/repostitories/answer-repository'

export class OnQuestionBestAnswerChoose implements EventHandler {
  constructor(
    private answerRepository: AnswerRepository,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      QuestionBestAnswerChooseEvent.name,
    )
  }

  private async sendNewAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChooseEvent) {
    const answer = await this.answerRepository.findById(bestAnswerId.toString())

    if (answer) {
      const shortTile = question.title.substring(0, 20).concat('...')
      await this.sendNotificationUseCase.execute({
        recipientId: question.authorId.toString(),
        title: `Sua resposta foi escolhida!`,
        content: `A resposta que você enviou em "${shortTile}" foi escolhida como a melhor!`,
      })
    }
  }
}
