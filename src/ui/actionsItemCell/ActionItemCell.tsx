import { FC, ReactElement, memo } from "react";
import { RowId } from "../../interfaces/column-def.interface";
import './actionItemCell.scss';

export interface IActionItemCell {
    readonly label: string;
    readonly icon?: ReactElement;
    readonly key?: RowId;
    readonly onClick?: (value: RowId) => void;
}

const ActionItemCellComponent : FC<IActionItemCell> = ({ label, icon, key , onClick}) : ReactElement =>{
    const onRowClick = (): void =>{
        key && onClick?.(key)
    }
    return (
            <div key={key} title={label} className="mdc-custom-action-cell" onClick={onRowClick}>
                {icon}
            </div>
    )
}

export const ActionItemCell = memo(ActionItemCellComponent);