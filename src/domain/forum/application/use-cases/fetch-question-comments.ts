import { Either, right } from '~/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repostitories/question-comments-repository'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionCommentsUseCaseResponseData {
  questionComments: QuestionComment[]
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  FetchQuestionCommentsUseCaseResponseData
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComments,
    })
  }
}
