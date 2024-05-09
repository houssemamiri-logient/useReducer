import { ActionReducer, ActionsType } from "../action-reducer";

export interface State {
    count: number;
    todos: string[];
  }

  type actionActionsType = ActionsType<any>
  export const actionReducer = new ActionReducer<State, actionActionsType>();
