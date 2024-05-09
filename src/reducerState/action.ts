
export abstract class Action<S, A> {
	type: string;
	constructor(type: string) {
		this.type = type;
	}
	getType() {
		return this.type;
	}
	abstract reducerFunc(state: S, action: A): S;
}
