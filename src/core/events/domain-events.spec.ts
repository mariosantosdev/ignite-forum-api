import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityId } from '../entities/unique-entity-ts'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

class CustomEventCreated implements DomainEvent {
  public ocurredAt: Date
  // eslint-disable-next-line no-use-before-define
  private _aggregate: CustomAggregate

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this._aggregate = aggregate
  }

  public getAggregateId(): UniqueEntityId {
    return this._aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomEventCreated(aggregate))

    return aggregate
  }
}

describe('Domain events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Register a new subscriber to listen the event "CustomEventCreated"
    DomainEvents.register(callbackSpy, CustomEventCreated.name)

    // Create a new response without store on database
    const aggregate = CustomAggregate.create()

    // I expect that the event has been created and didn't dispatch
    expect(aggregate.domainEvents).toHaveLength(1)

    // Store the response on database
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // Subscriber listen the event and do the action
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
