import { Either, left, right } from '~/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repostitories/answer-repository'
import { QuestionsRepository } from '../repostitories/question-repository'
import { ResourceNotFoundError } from '~/core/errors/resource-not-found-error'
import { NotAllowedError } from '~/core/errors/not-allowed-error'

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

interface ChooseQuestionBestAnswerUseCaseResponseData {
  answer: Answer
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  ChooseQuestionBestAnswerUseCaseResponseData
>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionsRepository: QuestionsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return right({ answer })
  }
}
