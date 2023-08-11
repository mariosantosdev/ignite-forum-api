import { UniqueEntityId } from '~/core/entities/unique-entity-ts'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repostitories/answer-repository'
import { Either, right } from '~/core/either'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
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
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    await this.answerRepository.create(answer)

    return right({ answer })
  }
}
