import {expect, test} from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('Create an answer', () => {
    const answerQuestion = new AnswerQuestionUseCase()

    const answer = answerQuestion.execute({
        content: 'Nova resposta',
        instructorId: '12',
        questionId: '1'
    })

    expect(answer.content).toEqual('Nova resposta')
})