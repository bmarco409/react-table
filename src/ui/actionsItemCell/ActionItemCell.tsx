import { FC, ReactElement, memo } from 'react';
import { RowId } from '../../interfaces/column-def.interface';
import './actionItemCell.scss';

export interface IActionItemCell {
    readonly label: string;
    readonly icon?: ReactElement;
    readonly rowId?: RowId;
    readonly onClick?: (value: RowId) => void;
}

const ActionItemCellComponent: FC<IActionItemCell> = ({ label, icon, rowId, onClick }): ReactElement => {
    const onRowClick = (): void => {
        rowId && onClick?.(rowId);
    };
    return (
        <div key={rowId} title={label} className="mdc-custom-action-cell" onClick={onRowClick}>
            {icon}
        </div>
    );
};

export const ActionItemCell = memo(ActionItemCellComponent);
