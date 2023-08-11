import { Either, right } from '~/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repostitories/question-repository'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

interface FetchRecentQuestionsUseCaseResponseData {
  questions: Question[]
}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  FetchRecentQuestionsUseCaseResponseData
>

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({
      page,
    })

    return right({
      questions,
    })
  }
}
