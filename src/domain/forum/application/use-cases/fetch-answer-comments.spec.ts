import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { UniqueEntityId } from '~/core/entities/unique-entity-ts'

import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comment-repository'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answers', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )

    const { answerComments } = await sut.execute({
      page: 1,
      answerId: 'answer-1',
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated recent answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
      )
    }

    const { answerComments } = await sut.execute({
      page: 2,
      answerId: 'answer-1',
    })

    expect(answerComments).toHaveLength(2)
  })
})