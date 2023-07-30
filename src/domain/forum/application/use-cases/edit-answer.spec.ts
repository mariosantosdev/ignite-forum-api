import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityId } from '~/core/entities/unique-entity-ts'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-1',
      content: 'New content',
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'New content',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    expect(inMemoryAnswerRepository.items[0].id).toBeTruthy()

    await expect(() =>
      sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'author-2',
        content: 'New content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
