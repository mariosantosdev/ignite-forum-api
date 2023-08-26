import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityId } from '~/core/entities/unique-entity-ts'
import { NotAllowedError } from '~/core/errors/not-allowed-error'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()

    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    expect(inMemoryAnswerRepository.items[0].id).toBeTruthy()

    await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })

    expect(inMemoryAnswerRepository.items).toHaveLength(0)
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    expect(inMemoryAnswerRepository.items[0].id).toBeTruthy()

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
