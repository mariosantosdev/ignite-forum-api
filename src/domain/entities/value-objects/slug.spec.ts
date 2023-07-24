import { Slug } from "./slug";

test('Slug value objects', () => {
    it('it should be able to create a new slug from text', () => {
        const slug = Slug.createFromText('Question title example')
    
        expect(slug.value).toEqual('question-title-example')
    })
})
