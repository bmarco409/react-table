export type OrderValue = 'ASC' | 'DESC' | null;

export interface Order {
    readonly key: string;
    readonly value: OrderValue;
}
