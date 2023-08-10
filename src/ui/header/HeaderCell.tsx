import { FC, ReactElement, memo } from 'react';
import { UpArrowIcon } from '../icons/UpArrow';
import { Menu } from '../menu/Menu';
import './headerCell.scss';

interface IHeaderCell {
    readonly label: string;
    readonly showSortable?: boolean;
    readonly showMenu?: boolean;
}

const HeaderCellComponent: FC<IHeaderCell> = ({ label, showSortable, showMenu}): ReactElement => {
    
    return (
        <>
            <div className="mdc-data-table__header-cell-wrapper mdc-custom-wrapper">
                <div className="mdc-data-table__header-cell-label">{label}</div>
                {showSortable && <button className="mdc-icon-button material-icons mdc-data-table__sort-icon-button mdc-custom-sort-button">
                        <UpArrowIcon width={18} height={'auto'} className="mdc-custom-sort-icon" />
                </button>}
               {showMenu && <Menu className='margin-left-auto'/>}
            </div>
        </>
    );
};
export const HeaderCell = memo(HeaderCellComponent);
