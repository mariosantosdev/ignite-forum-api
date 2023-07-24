import { UniqueEntityId } from "./unique-entity-ts"

export class Entity<Props extends any> {
    private _id: UniqueEntityId
    protected props: Props

    get id(){
        return this._id
    }

     constructor(props: Props, id?: string){
        this._id = new UniqueEntityId(id)
        this.props = props
     }
}