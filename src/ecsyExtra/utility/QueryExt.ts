import { ComponentConstructor, Entity, NotComponent, System } from "ecsy";
import { cartesianProduct } from "ecsyExtra/utility/ArrayExt";



export interface SystemQuery {
    components: (ComponentConstructor<any> | NotComponent<any>)[],
    listen?: {
        added?: boolean,
        removed?: boolean,
        changed?: boolean | ComponentConstructor<any>[],
    },
}

export interface QuerySet {
    [key: string]: SystemQuery[]
}

export interface QueryInstance<T extends Entity> {
    results: T[];
    added?: T[] | undefined;
    removed?: T[] | undefined;
    changed?: T[] | undefined;
}

export interface QueryInstanceObject<T extends Entity> {
    [key: string]: QueryInstance<T>
}

export interface QueryTuple<T extends Entity> {
    (): T[][]
}
export interface QueryTupleSet<T extends Entity> {
    [key: string]: QueryTuple<T>
}


export function createQueryTuplesFromObject<T extends Entity>(system: System<T>, querySets: QuerySet) {
    return Object.entries(querySets).reduce((acc, [key, queries]) => {
        acc[key] = createQueryTuple(system, queries)
        return acc
    }, {} as QueryTupleSet<T>)
}
export function createQueryTuplesFromArray(system: System, querySets: [SystemQuery[]]) {
    return querySets.map(set => createQueryTuple(system, set))
}

export function createQueryTuple<T extends Entity>(system: System<T>, queries: SystemQuery[]): QueryTuple<T> {
    const queryInstances = queries
        .map(query => getQueryInstance(system, query))
        .map(([name, entity]) => entity.results)
    return () => cartesianProduct(queryInstances)
}

function getQueryInstance<T extends Entity>(system: System<T>, query: SystemQuery): [string, QueryInstance<T>] {
    const constructorQueries = (system.constructor as any).queries
    const queryName = Object.entries(constructorQueries).find(([key, value]) => value === query)?.[0]
    if (queryName === undefined)
        throw new Error(`query not found... ${query}`)
    return [queryName, system.queries[queryName]]
}