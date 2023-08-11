import { UniqueEntityId } from '~/core/entities/unique-entity-ts'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repostitories/question-comments-repository'
import { QuestionsRepository } from '../repostitories/question-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Either, left, right } from '~/core/either'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponseData {
  questionComment: QuestionComment
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  CommentOnQuestionUseCaseResponseData
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return right({ questionComment })
  }
}
