import { QueryOption } from './advancedFilter';
import { Order } from './order';
import { Pagination } from './pagination';

export interface BaseFilter {
    readonly pagination?: Pagination;
    readonly id?: number;
    readonly relations?: string[];
    readonly relationsId?: string[];
    readonly queryOptions?: QueryOption[];
    readonly orders?: Order[];
}
