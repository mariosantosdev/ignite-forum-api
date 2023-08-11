import { UniqueEntityId } from '~/core/entities/unique-entity-ts'

import { QuestionsRepository } from '../repostitories/question-repository'
import { Question } from '../../enterprise/entities/question'
import { Either, right } from '~/core/either'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponseData {
  question: Question
}

type CreateQuestionUseCaseResponse = Either<
  null,
  CreateQuestionUseCaseResponseData
>

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    await this.questionsRepository.create(question)

    return right({ question })
  }
}
