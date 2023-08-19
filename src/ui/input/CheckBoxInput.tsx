import { FC, ReactElement, memo } from 'react';
import { primitive } from '../../utils/customTypes';
import { CheckBoxIcon } from '../icons/Checkbox';

export type CheckboxValue  = primitive | 'ALL';

interface ICheckBoxInput {
    readonly value: CheckboxValue ;
    readonly onChange?: (value: CheckboxValue) => void;
}

const CheckBoxInput: FC<ICheckBoxInput> = ({ value, onChange }): ReactElement => {
    const onCheckBoxChange = (value: CheckboxValue): void => {
        onChange?.(value);
    };
    return (
        <>
            <input
                type="checkbox"
                className="mdc-checkbox__native-control"
                onChange={(): void => onCheckBoxChange(value)}
                value={value}
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
