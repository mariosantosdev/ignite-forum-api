import { Entity } from "../../core/entities/entity"
import { UniqueEntityId } from "../../core/entities/unique-entity-ts"

interface AnswerProps {
    content: string
    authorId: UniqueEntityId
    questionId: UniqueEntityId
    createdAt: Date
    updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
    get content() {
        return this.props.content
    }
}