import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '~/domain/repostitories/answer-repository'

const mockAnswerRepository: AnswerRepository = {
    async create(_answer) {
        return 
    },
}

test('Create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(mockAnswerRepository)

    const answer = await answerQuestion.execute({
        content: 'Nova resposta',
        instructorId: '12',
        questionId: '1'
    })

    expect(answer.content).toEqual('Nova resposta')
})