import { FC, ReactElement, memo } from 'react';
import { RowId } from '../../interfaces/column-def.interface';
import { CheckBoxIcon } from '../icons/Checkbox';

interface ICheckBoxInput {
    readonly value: RowId;
    readonly checked?: boolean;
    readonly onChange?: (value: RowId) => void;
}

const CheckBoxInput: FC<ICheckBoxInput> = ({ value, checked, onChange }): ReactElement => {
    const onCheckBoxChange = (value: RowId): void => {
        onChange?.(value);
    };
    return (
        <>
            <input
                type="checkbox"
                className="mdc-checkbox__native-control"
                onChange={(): void => onCheckBoxChange(value)}
                value={value}
                checked={checked}
            />
            <div className="mdc-checkbox__background">
                <CheckBoxIcon />
                <div className="mdc-checkbox__mixedmark"></div>
            </div>
            <div className="mdc-checkbox__ripple"></div>
        </>
    );
};

export const CheckBoxInputComponent = memo(CheckBoxInput);
