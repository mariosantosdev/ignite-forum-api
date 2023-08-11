import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, string> {
  return shouldSuccess ? right('success') : left('error')
}

test('success result', () => {
  const successResult = doSomething(true)

  expect(successResult.isLeft()).toBe(false)
  expect(successResult.isRight()).toBe(true)
})

test('error result', () => {
  const errorResult = doSomething(false)

  expect(errorResult.isLeft()).toBe(true)
  expect(errorResult.isRight()).toBe(false)
})
