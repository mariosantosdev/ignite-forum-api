import { QuestionsRepository } from '../repostitories/question-repository'
import { CreateQuestionUseCase } from './create-question'

const mockQuestionsRepository: QuestionsRepository = {
  async create() {
    //
  },
}

test('Create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(mockQuestionsRepository)

  const { question } = await createQuestion.execute({
    content: 'Lorem impsun',
    authorId: '12',
    title: 'Titulo da pergunta',
  })

  expect(question.id).toBeTruthy()
  expect(question.title).toEqual('Titulo da pergunta')
})
