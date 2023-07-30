import { UniqueEntityId } from '~/core/entities/unique-entity-ts'
import {
  Question,
  QuestionProps,
} from '~/domain/forum/enterprise/entities/question'

export function makeQuestion(override: Partial<QuestionProps>) {
  const question = Question.create({
    content: 'Lorem ipsum',
    title: 'Title',
    authorId: new UniqueEntityId('1'),
    ...override,
  })

  return question
}
