import { splitEvery } from 'ramda';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import './App.css';
import { User, fakeData } from './fakeData';
import { ICoulmDefinition, ValueGetter } from './interfaces/column-def.interface';
import { Pagination } from './interfaces/pagination';
import { TableQueryParams } from './interfaces/tableQueryParam';
import { ActionItemCell } from './ui/actionsItemCell/ActionItemCell';
import { OutlinedButton } from './ui/button/OutLinedButton';
import { LeftIcon, RightIcon } from './ui/icons';
import { TableComponent } from './ui/table/Table';

function App(): ReactElement {
    const [paginationModel, setPaginationModel] = useState<Pagination>({ page: 0, pageSize: 10 });

    const [data, setData] = useState(splitEvery(paginationModel.pageSize, fakeData)[paginationModel.page]);

    const onPageChange = (model: Pagination): void => {
        setPaginationModel(model);
    };

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

    const columns: ICoulmDefinition<User>[] = [
        {
            field: 'id',
            headerName: 'id',
            type: 'number',
        },
        {
            field: 'email',
            headerName: 'email',
            type: 'string',
            sortable: false,
        },
        {
            field: 'name',
            headerName: 'name',
            type: 'string',
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
                return data.row.details.address;
            },
        },
        {
            field: 'details.city',
            headerName: 'city',
            type: 'string',
            valueGetter: (data: ValueGetter<User>): string => {
                return data.row.details.city;
            },
        },
        {
            field: 'details.cap',
            headerName: 'cap',
            type: 'string',
            valueGetter: (data: ValueGetter<User>): number => {
                return data.row.details.cap;
            },
        },
        {
            field: 'actions',
            headerName: 'actions',
            type: 'actions',
            cellClassName: 'puddu',
            getActions: ({ id, row }): ReactElement[] => {
                const onLeftClick = (): void => {
                    console.log('Left click');
                };
                return [
                    <ActionItemCell
                        label="test"
                        key={`${id}_0`}
                        rowId={id}
                        icon={<LeftIcon width={'24'} height={'auto'} onClick={onLeftClick} />}
                    />,
                    <ActionItemCell label="test2" key={`${id}_1`} icon={<RightIcon width={'24'} height={'auto'} />} />,
                ];
            },
        },
    ];

    return (
        <>
            <div style={{ width: '100%', marginBottom: 20, display: 'flex' }}>
                <OutlinedButton label={'Colonne'} />
            </div>

            <TableComponent
                columnsDefinitions={columns}
                rows={data}
                pageSizeOptions={[5, 10, 15]}
                checkboxSelection
                showHeaderMenu
                rowCount={fakeData.length}
                paginationModel={params.pagination}
                onPaginationModelChange={onPageChange}
            />
        </>
    );
}

export default App;
