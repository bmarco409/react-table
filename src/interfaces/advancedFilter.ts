import { primitive, primitiveArray } from '../utils/customTypes';

/**
 * advanced filter operat0r
 */
export enum Operator {
    EQ = 0,
    GT,
    LT,
    GTE,
    LTE,
    LIKE,
    IN,
}

/**
 * condition interfacez. Example { 'EQ' : 'hello word'}
 *
 */
export interface Condition {
    readonly operator: Operator;
    readonly value: primitive | Date | primitiveArray;
}

export interface FindOption {
    readonly key: string;
    readonly condition: Condition;
}

export interface Column {
    readonly identifier: string;
    readonly name?: string;
    readonly type?: string;
    readonly options?: primitive[];
}

export interface FilterOperator {
    readonly identifier: Operator;
    readonly name: string;
}

export interface QueryOption {
    readonly column?: Column;
    readonly operator?: Operator;
    readonly value?: primitive | primitive[] | Date;
    readonly objectIdValue?: string;
}

/****Operator touse in filter panel */

export const stringOperators: FilterOperator[] = [
    {
        identifier: Operator.EQ,
        name: 'Uguale',
    },
    {
        identifier: Operator.LIKE,
        name: 'Contiene',
    },
];

export const numberOperators: FilterOperator[] = [
    {
        identifier: Operator.EQ,
        name: '=',
    },
    {
        identifier: Operator.GT,
        name: '>',
    },
    {
        identifier: Operator.GTE,
        name: '>=',
    },
    {
        identifier: Operator.LT,
        name: '<',
    },
    {
        identifier: Operator.LTE,
        name: '<=',
    },

    {
        identifier: Operator.IN,
        name: 'Contenuto',
    },
];
