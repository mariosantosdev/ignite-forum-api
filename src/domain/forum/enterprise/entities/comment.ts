import { Entity } from '~/core/entities/entity'
import { UniqueEntityId } from '~/core/entities/unique-entity-ts'

export interface CommentProps {
  authorId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export abstract class Comment<
  Props extends CommentProps,
> extends Entity<Props> {
  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
