import {
    addIndex,
    always,
    anyPass,
    append,
    curry,
    equals,
    evolve,
    find,
    ifElse,
    isNil,
    isNotNil,
    map,
    pick,
    pipe,
    pluck,
    reject,
    whereEq
} from 'ramda';
import { CSSProperties, ReactElement, memo, useCallback, useEffect, useRef, useState } from 'react';
import { ICoulmDefinition, RowId } from '../../interfaces/column-def.interface';
import { Order } from '../../interfaces/order';
import { Pagination } from '../../interfaces/pagination';
import { CELL_DEFAULT_MIN_WIDTH, CELL_DEFAULT_WIDTH, TABLE_SCROLL_HORIZZONTAL } from '../../utils/const';
import { Maybe, primitive } from '../../utils/customTypes';
import { found } from '../../utils/function';
import { HeaderCell } from '../header/HeaderCell';
import { CheckBoxInputComponent } from '../input/CheckBoxInput';
import { Paginator } from '../paginator/Paginator';
import { LinearProgressBar } from '../progressBar/LinearProgressBar';
import './table.scss';

export interface ITableComponent<T> {
    readonly columnsDefinitions: ICoulmDefinition<T>[];
    readonly rows: object[];
    readonly pageSizeOptions: number[];
    readonly paginationModel: Pagination;
    readonly checkboxSelection?: boolean;
    readonly showHeaderMenu?: boolean;
    readonly loading?: boolean;
    readonly rowCount?: number;
    readonly onPaginationModelChange?: (model: Pagination) => void;
    readonly scrollHorizzontal?: boolean;
    readonly onSortClick?: (value: Order) => void;
    readonly onRowSelectionModelChange? : (rows: RowId[]) => void;
}
interface IHeader {
    readonly headerName: string;
    readonly sortable?: boolean;
    readonly field?: string;
    readonly ref?: React.RefObject<HTMLTableCellElement>
}

export const TableComponent = <T,>({
    columnsDefinitions,
    rows,
    paginationModel,
    checkboxSelection,
    pageSizeOptions,
    showHeaderMenu,
    loading,
    rowCount,
    onPaginationModelChange,
    scrollHorizzontal,
    onSortClick,
    onRowSelectionModelChange,
}: ITableComponent<T>): ReactElement => {


    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const tableElement = useRef<HTMLTableElement>(null);

    const [allRowsSelected,setAllRowsSelected] = useState<boolean>(false);
    const [selectedRows , setSelectedRows] = useState<RowId[]>([]);

    const mapRowsWithIndex = addIndex<object, number>(map);

    const  rowsIndexValues = useCallback(() => {
        return mapRowsWithIndex((_val: object, index: number) => index, rows);
      }, [rows]);

    /***render header (HeaderComponent) */

    const pickHeaderData: (data: ICoulmDefinition<T>) => IHeader = pick(['headerName', 'sortable', 'field']);

    const setRefonHeaderCell = evolve({ ref: useRef<HTMLTableCellElement>}) as (header: IHeader) => IHeader;

    const getHeaderInfo = map(pipe(pickHeaderData,setRefonHeaderCell))(columnsDefinitions);

    const isSortable = anyPass([isNil, equals(true)]) as (value: Maybe<boolean>) => boolean;

    const setSortableClass = ifElse(isSortable, always('mdc-data-table__header-cell--with-sort'), always(''));

    const tableStyle: CSSProperties = {
        overflowX: scrollHorizzontal ? 'auto' : TABLE_SCROLL_HORIZZONTAL,
    };

    const onCheckBoxChange = (value: RowId): void =>{
        ifElse(
            isNotNil,
            always(setSelectedRows(reject<RowId, RowId[]>(equals(value), selectedRows))),
            always(setSelectedRows(append(value,selectedRows)))
        )(found<RowId>(value, selectedRows))
   

    }

    const onHeaderCheckBoxChange = (_value: RowId): void =>{
        setAllRowsSelected((oldValue) => !oldValue)
    }

    useEffect(() =>{
        allRowsSelected ? setSelectedRows(rowsIndexValues()) :setSelectedRows([])
    },[allRowsSelected])

    useEffect(() => {
        onRowSelectionModelChange?.(selectedRows);
    },[selectedRows])

    const renderHeaderCell = (data: IHeader, index: number): ReactElement => (
        <th
            className={`mdc-data-table__header-cell ${setSortableClass(data.sortable)} mdc-custom-header-cell`}
            role="columnheader"
            scope="col"
            key={data.headerName}
            ref={data.ref}
        >
            <HeaderCell
                label={data.headerName}
                showSortable={isSortable(data.sortable)}
                showMenu={showHeaderMenu}
                field={data.field}
                onSortClick={onSortClick}
                className={`resize-handle ${
                    activeIndex === index ? "active" : "idle"
                  }`}

                onMove={ (): void =>mouseDown(index)}
            />
        </th>
    );

    const mapHeadersWithIndex = addIndex<IHeader, ReactElement>(map);

    const headers = getHeaderInfo;
    
    const renderHeader = mapHeadersWithIndex(renderHeaderCell, headers);

    const headerCheckBox = (): ReactElement => {
        return (
            <th
                className="mdc-data-table__header-cell mdc-data-table__header-cell--checkbox"
                role="columnheader"
                scope="col"
            >
                <div className={`mdc-checkbox mdc-data-table__header-row-checkbox mdc-checkbox`}>
                    <CheckBoxInputComponent  value={'ALL'} onChange={onHeaderCheckBoxChange}/>
                </div>
            </th>
        );
    };

    /**** render Body (BodyComponent)*/

    const rowCheckBox = (_element: object, rowIndex: number): ReactElement => {
        const setSelected = ifElse(isNil,always(false),always(true));
        return (
            <td className="mdc-data-table__cell mdc-data-table__cell--checkbox">
                <div className="mdc-checkbox mdc-data-table__row-checkbox">
                    <CheckBoxInputComponent value={rowIndex} checked={setSelected(found(rowIndex,selectedRows))} onChange={onCheckBoxChange}/>
                </div>
            </td>
        );
    };

    const valueKeys = pluck('field', columnsDefinitions);

    const renderCell = (element: object, row: number, field: string): ReactElement => {
        const column = find(whereEq({ field: field }), columnsDefinitions);
        const isValueGetter = isNotNil(column?.valueGetter);

        const cellValue = element[field as keyof typeof element] as Maybe<primitive>;
        const renderActions = column?.getActions?.({ id: row, row: row });

        const renderValue = ifElse(
            equals(true),
            always(column?.valueGetter?.({ element: element as T })),
            always(cellValue),
        )(isValueGetter);

        const isActions = ifElse(equals('actions'), always(renderActions), always(renderValue));

        const style: CSSProperties = {
            maxWidth: column?.maxWidth ?? CELL_DEFAULT_WIDTH,
            width: column?.maxWidth ?? CELL_DEFAULT_WIDTH,
            minWidth: column?.minWidth ?? CELL_DEFAULT_MIN_WIDTH,
        };

        return (
            <td
                className={`mdc-data-table__cell ${column?.cellClassName}`}
                key={`${field}_${cellValue}`}
                title={cellValue?.toString()}
                style={style}
            >
                {isActions(field)}
            </td>
        );
    };

    const curriedRenderCell = curry(renderCell);

    const prepareRow = (obj: object, row: number): unknown => map(curriedRenderCell(obj, row), valueKeys);

    const renderRows = rows.map((element, index) => {
        return (
            <tr className="mdc-data-table__row" key={index}>
                {checkboxSelection && rowCheckBox(element, index)}
                <>{prepareRow(element, index)}</>
            </tr>
        );
    });

    /****** */


    /****resize column */
        
       
    
        const mouseMove = useCallback(
            (e: MouseEvent) => {
              const gridColumns = headers.map((col, i) => {
                const column = find(whereEq({ field: col.field }), columnsDefinitions);
              
                if (i === activeIndex) {
                    console.info('column',column);
                  const width = e.clientX -  (col.ref?.current?.offsetLeft ?? 0);
                    console.log(width);
                  if (width >= (column?.minWidth ?? CELL_DEFAULT_MIN_WIDTH)) {
                        return `${width}px`;
                  }
                }
                return `${(col.ref?.current?.offsetLeft ?? 0)}px`;
              });
                if( tableElement.current){
                    console.log('setto')
                    tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
                        " "
                      )}`;
                }
              
            },
            [activeIndex, headers]
          );
        
          const removeListeners = useCallback(() => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseup", removeListeners);
          }, [mouseMove]);
        
          const mouseUp = useCallback(() => {
            setActiveIndex(null);
            removeListeners();
          }, [setActiveIndex, removeListeners]);
        
          useEffect(() => {
            if (activeIndex !== null) {
              window.addEventListener("mousemove", mouseMove);
              window.addEventListener("mouseup", mouseUp);
            }
        
            return () => {
              removeListeners();
            };
          }, [activeIndex, mouseMove, mouseUp, removeListeners]);

          const mouseDown = (index: number): void => {
            setActiveIndex(index);
          };
    
        /******** */

    return (
        <>
            <div className="mdc-data-table">
                <div className="mdc-data-table__table-container" style={tableStyle}>
                    <table className="mdc-data-table__table" ref={tableElement}>
                        <thead>
                            <tr className="mdc-data-table__header-row">
                                {checkboxSelection && headerCheckBox()}
                                {renderHeader}
                            </tr>
                        </thead>
                        <tbody className="mdc-data-table__content">{renderRows}</tbody>
                    </table>
                </div>
                {loading && <LinearProgressBar />}
                <Paginator
                    total={rowCount ?? 0}
                    pagination={paginationModel}
                    pageSizeOptions={pageSizeOptions}
                    onPaginationModelChange={onPaginationModelChange}
                />
            </div>
        </>
    );
};

export const Table = memo(TableComponent);


