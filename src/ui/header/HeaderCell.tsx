import { always, cond, either, equals, ifElse } from 'ramda';
import { CSSProperties, FC, ReactElement, memo, useState } from 'react';
import { Order, OrderValue } from '../../interfaces/order';
import { DownArrowIcon } from '../icons';
import { UpArrowIcon } from '../icons/UpArrow';
import { Menu } from '../menu/Menu';
import './headerCell.scss';



interface IHeaderCell {
    readonly label: string;
    readonly showSortable?: boolean;
    readonly showMenu?: boolean;
    readonly field?: string;
    readonly onSortClick?: (value: Order) => void;
}


const HeaderCellComponent: FC<IHeaderCell> = ({ label, showSortable, showMenu , field , onSortClick}): ReactElement => {
    const [order, setOrder] = useState<OrderValue>(null);

    const orderEqualsTo = equals<OrderValue>;

    const isAscOrNull = either(orderEqualsTo(null),orderEqualsTo('ASC'))

    const setOrderState : (a: OrderValue) => OrderValue = cond([
        [orderEqualsTo('ASC'),  always('DESC')],
        [orderEqualsTo(null),  always('ASC')],
        [orderEqualsTo('DESC'),  always(null)],
    ]);
    
    const onArrowClick = (): void =>{
        const newOrder = setOrderState(order);
        field && onSortClick?.({
            key: field,
            value: newOrder

        });
        setOrder(newOrder);
    }

    const renderArrowIcon = (): ReactElement =>{
      
        return ifElse(equals(true),
            always(<UpArrowIcon width={18} height={'100%'} className="mdc-custom-sort-icon" onClick={onArrowClick}/>),
            always(<DownArrowIcon width={18} height={'100%'} className="mdc-custom-sort-icon" onClick={onArrowClick}/>)
        )(isAscOrNull(order))   
    }

    const setStyle  = ():CSSProperties =>({
        visibility: order !== null ? 'visible' : undefined
    })

    return (
        <>
            <div className="mdc-data-table__header-cell-wrapper mdc-custom-wrapper">
                <div className="mdc-data-table__header-cell-label">{label}</div>
                {showSortable && (
                    <button className="mdc-custom-sort-button" style={setStyle()}>
                        {renderArrowIcon()}
                    </button>
                )}
                {showMenu && <Menu className="margin-left-auto" />}
            </div>
        </>
    );
};
export const HeaderCell = memo(HeaderCellComponent);
