import { Either, left, right } from '~/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repostitories/question-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

interface GetQuestionBySlugUseCaseResponseData {
  question: Question
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  GetQuestionBySlugUseCaseResponseData
>

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({
      question,
    })
  }
}
