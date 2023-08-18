import { QueryOption } from './advancedFilter';
import { Order } from './order';
import { Pagination } from './pagination';

export interface TableQueryParams {
    readonly pagination: Pagination;
    readonly queryOptions: QueryOption[];
    readonly orders?: Order[];
}
