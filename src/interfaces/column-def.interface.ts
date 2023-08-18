import { IActionItemCell } from '../ui/actionsItemCell/ActionItemCell';
import { primitive } from '../utils/customTypes';

export interface ICoulmDefinition<T> {
    readonly field: string;
    readonly headerName: string;
    readonly type?: ColumnType;
    readonly sortable?: boolean;
    readonly data?: T;
    readonly getActions?: (params: RowParams) => React.ReactElement<IActionItemCell>[];
    readonly cellClassName?: string;
    readonly valueGetter?: (value: ValueGetter<T>) => primitive;
    readonly maxWidth?: number;
    /**
     * @default 50
     */
    readonly minWidth?: number;
    /**
     * @default 100
     */
    readonly width?: number;
}

export type ColumnType =
    | 'string'
    | 'number'
    | 'date'
    | 'dateTime'
    | 'boolean'
    | 'singleSelect'
    | 'actions'
    | 'multiSelect';

export type RowId = string | number;

interface RowParams {
    readonly id: RowId;
    readonly row: number;
}

export interface ValueGetter<T> {
    readonly row: T;
}
