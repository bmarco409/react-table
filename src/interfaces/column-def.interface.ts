export interface ICoulmDefinition<T> {
    readonly field: string;
    readonly headerName: string;
    readonly type?: string;
    readonly sortable?: boolean;
    readonly data?: T;
}
