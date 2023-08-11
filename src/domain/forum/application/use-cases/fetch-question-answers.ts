import { Either, right } from '~/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repostitories/answer-repository'

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionAnswersUseCaseResponseData {
  answers: Answer[]
}

type FetchQuestionAnswersUseCaseResponse = Either<
  null,
  FetchQuestionAnswersUseCaseResponseData
>

export class FetchQuestionAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return right({
      answers,
    })
  }
}
