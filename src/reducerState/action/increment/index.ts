import { Action } from "../../action";
import { ActionsType } from "../../action-reducer";
import { State } from "../../reducer/inde";

export const INCREMENT = 'INCREMENT';

export function incrementActionHandler() {
    return { type: INCREMENT, payload: '' }
}

export type incrementActionContent = ActionsType<number>



export class IncrementAction extends Action<State, incrementActionContent> {
    constructor() {
        super(INCREMENT);
    }
    reducerFunc = (state: State): State => ({
        ...state, count: state.count + 1
    })
}