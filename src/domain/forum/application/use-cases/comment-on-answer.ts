import { UniqueEntityId } from '~/core/entities/unique-entity-ts'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repostitories/answer-comments-repository'
import { AnswerRepository } from '../repostitories/answer-repository'
import { ResourceNotFoundError } from '~/core/errors/resource-not-found-error'
import { Either, left, right } from '~/core/either'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponseData {
  answerComment: AnswerComment
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  CommentOnAnswerUseCaseResponseData
>

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const question = await this.answerRepository.findById(answerId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({ answerComment })
  }
}
