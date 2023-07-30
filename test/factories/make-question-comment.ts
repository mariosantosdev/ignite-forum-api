import { UniqueEntityId } from '~/core/entities/unique-entity-ts'
import { faker } from '@faker-js/faker'
import {
  QuestionComment,
  QuestionCommentProps,
} from '~/domain/forum/enterprise/entities/question-comment'

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityId,
) {
  const questionComment = QuestionComment.create(
    {
      content: faker.lorem.text(),
      questionId: new UniqueEntityId(),
      authorId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return questionComment
}
