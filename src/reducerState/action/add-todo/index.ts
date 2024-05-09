import { Action } from "../../action";
import { ActionsType } from "../../action-reducer";
import { State } from "../../reducer/inde";

export const ADD_TODO = 'ADD_TODO';

export function addTodoActionHandler(value: string) {
    return { type: ADD_TODO, payload:  value}
}

export type addTodoActionContent = ActionsType<any>



export class AddTodonAction extends Action<State, addTodoActionContent> {
    constructor() {
        super(ADD_TODO);
    }
    reducerFunc = (state: State, action: addTodoActionContent): State => ({
        ...state, todos: [...state.todos, action.payload] 
    })
}