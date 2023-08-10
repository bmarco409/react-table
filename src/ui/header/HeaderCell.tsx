import { FC, ReactElement, memo } from 'react';
import { UpArrowIcon } from '../icons/UpArrow';
import { Menu } from '../menu/Menu';
import './headerCell.scss';

export interface IHeaderCell {
    readonly label: string;
    readonly sortable?: boolean;
    readonly showMenu?: boolean;
}

const HeaderCellComponent: FC<IHeaderCell> = ({ label }): ReactElement => {
    return (
        <>
            <div className="mdc-data-table__header-cell-wrapper">
                <div className="mdc-data-table__header-cell-label">{label}</div>
                <UpArrowIcon width={18} height={'auto'} className="mdc-custom-sort-button" />
                <div className="mdc-data-table__sort-status-label" aria-hidden="true"></div>
                <Menu  />
            </div>
        </>
    );
};
export const HeaderCell = memo(HeaderCellComponent);
