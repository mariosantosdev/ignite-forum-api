import { UniqueEntityId } from '~/core/entities/unique-entity-ts'
import {
  Question,
  QuestionProps,
} from '~/domain/forum/enterprise/entities/question'
import { faker } from '@faker-js/faker'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      content: faker.lorem.text(),
      title: faker.lorem.sentence(),
      authorId: new UniqueEntityId('1'),
      ...override,
    },
    id,
  )

  return question
}
