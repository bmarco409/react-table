import { always, any, clone, equals, ifElse, length, reject, splitEvery, whereEq } from 'ramda';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import './App.css';
import { User, fakeData } from './fakeData';
import { HideColumnValue, ICoulmDefinition, RowId, ValueGetter } from './interfaces/column-def.interface';
import { Order } from './interfaces/order';
import { Pagination } from './interfaces/pagination';
import { TableQueryParams } from './interfaces/tableQueryParam';
import { OutlinedButton } from './ui/button/OutLinedButton';
import { TableComponent } from './ui/table/Table';
import { Maybe } from './utils/customTypes';

const testColumns: ICoulmDefinition<User>[] = [
    {
        field: 'id',
        headerName: 'id',
        type: 'number',
        // width: 200,
        // minWidth: 200,
        hideable: false,
    },
    {
        field: 'email',
        headerName: 'email',
        type: 'string',
        sortable: false,
        // width: 200,
        // minWidth: 200
    },
    {
        field: 'name',
        headerName: 'name',
        type: 'string',
        sortable: false,
        //width: 200,
    },
    {
        field: 'surname',
        headerName: 'surname',
        type: 'string',
    },
    {
        field: 'age',
        headerName: 'age',
        type: 'number',
    },
    {
        field: 'details.address',
        headerName: 'address',
        type: 'string',
        valueGetter: (data: ValueGetter<User>): string => {
            return data.element.details.address;
        },
    },
    {
        field: 'details.city',
        headerName: 'city',
        type: 'string',
        valueGetter: (data: ValueGetter<User>): string => {
            return data.element.details.city;
        },
    },
    // {
    //     field: 'details.cap',
    //     headerName: 'cap',
    //     type: 'string',
    //     valueGetter: (data: ValueGetter<User>): number => {
    //         return data.element.details.cap;
    //     },
    // },
    // {
    //     field: 'actions',
    //     headerName: 'actions',
    //     type: 'actions',
    //     cellClassName: 'puddu',
    //     getActions: ({ id, row }): ReactElement[] => {
    //         const onLeftClick = (): void => {
    //             console.log('Left click');
    //         };
    //         return [
    //             <ActionItemCell
    //                 label="test"
    //                 key={`${id}_0`}
    //                 rowId={id}
    //                 icon={<LeftIcon width={'24'} height={'100%'} onClick={onLeftClick} />}
    //             />,
    //             <ActionItemCell label="test2" key={`${id}_1`} icon={<RightIcon width={'24'} height={'100%'} />} />,
    //         ];
    //     },
    // },
];

function App(): ReactElement {
    const [paginationModel, setPaginationModel] = useState<Pagination>({ page: 0, pageSize: 10 });
    const [order, setOrder] = useState<Maybe<Order[]>>(undefined);
    const [columns, setColumns] = useState(testColumns);
    const [data, setData] = useState(splitEvery(paginationModel.pageSize, fakeData)[paginationModel.page]);

    const onPageChange = (model: Pagination): void => {
        setPaginationModel(model);
    };

    const removeOrderByKey = (key: string, orders: Order[]): Order[] => reject(whereEq({ key }), orders);
    const orderIsInArray = (key: string, orders: Order[]): boolean => any(whereEq({ key }), orders);

    const onSortClick = (order: Order): void => {
        setOrder((oldState) => {
            let state = clone(oldState);

            if (orderIsInArray(order.key, oldState ?? [])) {
                state = removeOrderByKey(order.key, oldState ?? []);
            }

            if (order.value !== null) {
                return [...(state ?? []), order];
            }

            return ifElse(equals(0), always(undefined), always([]))(length(state ?? []));
        });
    };

    // useEffect(() => {
    //     console.info(order);
    // }, [order]);

    const onSelectionchange = (values: RowId[]): void => {
        //  console.info('selected ',values);
    };

    const hideColumn = (value: HideColumnValue): void =>{
        console.log('value',value)

        const updated = columns.map((column) => {
            if(column.field === value.field){
                return {
                    ...column,
                    hide: value.state
                }
            }
            return column;
        })

        setColumns(updated);
    
    }

    const params: TableQueryParams = useMemo(
        () => ({
            pagination: {
                ...paginationModel,
            },
            queryOptions: [],
            orders: [],
        }),
        [paginationModel],
    );

    useEffect(() => {
        setData(splitEvery(paginationModel.pageSize, fakeData)[paginationModel.page] ?? []);
    }, [params]);

    
    

    return (
        <>
            <div style={{ width: '100%', marginBottom: 20, display: 'flex' }}>
                <OutlinedButton label={'Colonne'} />
                {/* <HidableColumsMenuComponent columnsDefinitions={columns} open={true} />
                 */}
            </div>

            <TableComponent<User>
                columnsDefinitions={columns}
                rows={data}
                pageSizeOptions={[5, 10, 15]}
                checkboxSelection
                showHeaderMenu
                rowCount={fakeData.length}
                paginationModel={params.pagination}
                onPaginationModelChange={onPageChange}
                onSortClick={onSortClick}
                onRowSelectionModelChange={onSelectionchange}
                scrollHorizzontal={false}
                onHideColumnChange={hideColumn}
            />
        </>
    );
}

export default App;
