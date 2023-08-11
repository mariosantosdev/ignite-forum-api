import { Either, left, right } from '~/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repostitories/question-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title?: string
  content?: string
}

interface EditQuestionUseCaseResponseData {
  question: Question
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  EditQuestionUseCaseResponseData
>

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    if (title) question.title = title
    if (content) question.content = content

    await this.questionRepository.save(question)

    return right({ question })
  }
}
