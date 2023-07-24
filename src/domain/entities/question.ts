import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityId } from "../../core/entities/unique-entity-ts"

interface QuestionProps {
    authorId: UniqueEntityId
    bestAnswerId?: UniqueEntityId
    title: string
    slug: Slug
    content: string
    createdAt: Date
    updateAt?: Date
}

export class Question extends Entity<QuestionProps> {
}