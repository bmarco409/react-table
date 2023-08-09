import { FC, ReactElement, memo } from 'react';
import { UpArrowIcon } from '../icons/UpArrow';
import './sortButton.scss';

interface ISortButtonComponent {
    readonly label: string;
}

const SortButtonComponent: FC<ISortButtonComponent> = ({ label }): ReactElement => {
    return (
        <>
            <div className="mdc-data-table__header-cell-wrapper">
                <div className="mdc-data-table__header-cell-label">{label}</div>
                <UpArrowIcon width={18} height={'auto'} className="mdc-custom-sort-button" />
                <div className="mdc-data-table__sort-status-label" aria-hidden="true"></div>
            </div>
        </>
    );
};
export const SortButton = memo(SortButtonComponent);
