import { ExtraSystem, iModule, ValueComponent } from "../types";
import { SystemQueries } from "ecsy";


export class TestValueComponent extends ValueComponent<TestValueComponent, number>{
}



export class TestSystem extends ExtraSystem {

    _onExecute: () => void
    execute() {
        this.queries.entities.results
            .forEach(entity => {
                this._onExecute()
            })
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