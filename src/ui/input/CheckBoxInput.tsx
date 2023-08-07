import { FC, ReactElement, memo } from 'react';
import { CheckBoxIcon } from '../icons/Checkbox';

const CheckBoxInput: FC = (): ReactElement => {
    return (
        <>
            <input type="checkbox" className="mdc-checkbox__native-control" />
            <div className="mdc-checkbox__background">
                <CheckBoxIcon />
                <div className="mdc-checkbox__mixedmark"></div>
            </div>
            <div className="mdc-checkbox__ripple"></div>
        </>
    );
};

export const CheckBoxInputComponent = memo(CheckBoxInput);
