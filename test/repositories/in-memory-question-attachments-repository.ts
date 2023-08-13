import { QuestionAttachmentsRepository } from '~/domain/forum/application/repostitories/question-attachments-repository'

import { QuestionAttachment } from '~/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const answers = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return answers
  }
}