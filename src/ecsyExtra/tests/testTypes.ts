import { ExtraSystem, iModule, ValueComponent } from "../types";
import { SystemQueries } from "ecsy";


export class TestValueComponent extends ValueComponent<TestValueComponent, number>{
}



export class TestSystem extends ExtraSystem {


    _onStart: () => void
    _onExecute: () => void
    _onDispose: () => void
    start() {
        this._onStart?.()
    }
    execute() {
        this.queries.entities.results
            .forEach(entity => {
                this._onExecute?.()
            })
    }
    dispose() {
        this._onDispose?.()
    }
    static queries: SystemQueries = {
        entities: {
            components: [TestValueComponent]
        }
    }
}



export const testModule: iModule = {
    components: [TestValueComponent],
    systemGroups: [{
        priority: 0,
        systems: [TestSystem]
    }]
}