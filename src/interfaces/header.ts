export interface IHeader {
    readonly headerName: string;
    readonly sortable?: boolean;
    readonly field?: string;
    readonly ref?: React.RefObject<HTMLTableCellElement>;
}
