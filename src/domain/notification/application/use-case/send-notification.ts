import { UniqueEntityId } from '~/core/entities/unique-entity-ts'

import { Either, right } from '~/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notification-repository'

interface SendNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}

interface SendNotificationUseCaseResponseData {
  notification: Notification
}

type SendNotificationUseCaseResponse = Either<
  null,
  SendNotificationUseCaseResponseData
>

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content,
    })

    await this.notificationsRepository.create(notification)

    return right({ notification })
  }
}
