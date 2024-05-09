import { Action } from './action';


export type ActionsType<P> =
	{
		readonly type: string;
		readonly payload: P;
	};

export class ActionReducer<S, A extends ActionsType<unknown>> {
	private _actions: Map<string, Action<S, A>> = new Map();

	addAction(actionHandler: Action<S, A>) {
		this._actions.set(actionHandler.getType(), actionHandler);
	}
	getReducer() {
		return (state: S, action: A): S => {
			const value = this._actions.get(action.type);
			if (value) {
				return value.reducerFunc(state, action);
			} else {
				return state;
			}
		};
	}
}
