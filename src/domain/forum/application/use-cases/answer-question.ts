import { UniqueEntityId } from '~/core/entities/unique-entity-ts'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repostitories/answer-repository'
import { Either, right } from '~/core/either'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  attachmentsIds: string[]
  content: string
}

interface AnswerQuestionUseCaseResponseData {
  answer: Answer
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  AnswerQuestionUseCaseResponseData
>

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
    attachmentsIds,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    const answerAttachments = attachmentsIds.map((attachmentId) =>
      AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      }),
    )

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answerRepository.create(answer)

    return right({ answer })
  }
}
