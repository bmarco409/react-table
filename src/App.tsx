import { ReactElement } from 'react';
import './App.css';
import { ICoulmDefinition } from './interfaces/column-def.interface';
import { Table } from './ui/table/Table';

function App(): ReactElement {
    const columns: ICoulmDefinition[] = [
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

    const data: object[] = [
        {
            id: 1,
            email: 'puddu@email.com',
            name: 'puddu',
            surname: 'mimmo3',
            age: 1,
        },
        {
            id: 2,
            email: 'puddu2@email.com',
            name: 'puddu22',
            surname: 'mimmo2',
            age: 2,
        },
        {
            id: 3,
            email: 'puddu3@email.com',
            name: 'puddu24',
            surname: 'mimmo1',
            age: 3,
        },
        {
            id: 4,
            email: 'puddu4@email.com',
            name: '4442e2',
            surname: 'ewewew',
            age: 4,
        },
    ];

    return (
        <>
            <Table columnsDefinitions={columns} data={data} pagSize={5} checkboxSelection showHeaderMenu></Table>
        </>
    );
}

export default App;
