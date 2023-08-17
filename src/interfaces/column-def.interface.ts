import { IActionItemCell } from "../ui/actionsItemCell/ActionItemCell";

export interface ICoulmDefinition<T> {
    readonly field: string;
    readonly headerName: string;
    readonly type?: ColumnType;
    readonly sortable?: boolean;
    readonly data?: T;
    readonly getActions?: (params: RowParams) => React.ReactElement<IActionItemCell>[];
    readonly cellClassName?: string;
    readonly valueGetter?: <K>(value: ValueGetter<T>) => K;
}


export type ColumnType = 'string' | 'number' | 'date' | 'dateTime' | 
    'boolean' | 'singleSelect' | 'actions' | 'multiSelect';

export type RowId = string | number;

interface RowParams{
    readonly id: RowId;
    readonly row: number;
}

export interface ValueGetter <T> {
    readonly value: T;
}