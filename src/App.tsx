import { splitEvery } from 'ramda';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import './App.css';
import { fakeData } from './fakeData';
import { ICoulmDefinition } from './interfaces/column-def.interface';
import { Pagination } from './interfaces/pagination';
import { TableQueryParams } from './interfaces/tableQueryParam';
import { OutlinedButton } from './ui/button/OutLinedButton';
import { Table } from './ui/table/Table';

interface User {
    readonly id: number;
    readonly email: string;
    readonly name: string;
    readonly surname: string;
    readonly age: number;
}



function App(): ReactElement {
    const [paginationModel, setPaginationModel] = useState<Pagination>({ page: 0, pageSize: 2 });

    

    const [data, setData] = useState(splitEvery(paginationModel.pageSize,fakeData)[paginationModel.page]);

    const onPageChange = (model: Pagination): void =>{
        setPaginationModel(model);
    }

    const params: TableQueryParams = useMemo(
        () => ({
            pagination: {
                ...paginationModel,
            },
            queryOptions: [],
            orders: []
    
        }),
        [paginationModel],
    );

    useEffect(() =>{
        console.log('params ',params)
        setData(splitEvery(paginationModel.pageSize,fakeData)[paginationModel.page] ?? [])
    },[params])


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
    ];

    return (
        <>
            <div style={{ width: '100%' , marginBottom: 20 , display: 'flex'}}>
                 <OutlinedButton label={'Colonne'} />
            </div>
            
            <Table
                columnsDefinitions={columns}
                rows={data}
                pageSizeOptions={[1, 2, 4]}
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
