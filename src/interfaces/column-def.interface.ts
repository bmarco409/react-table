export interface ICoulmDefinition<T> {
    readonly field: string;
    readonly headerName: string;
    readonly type?: string;
    readonly sortable?: boolean;
    readonly data?: T;
    readonly getActions: (params: RowParams) => React.ReactElement<ActionsCellItemProps>[];
}


export type ColumnType = 'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'singleSelect' | 'actions';

interface ActionsCellItemProps{
    readonly label: string;
    readonly icon?: React.ReactElement;
}

interface RowParams{
    readonly id: number | string;
    readonly row: number;
}