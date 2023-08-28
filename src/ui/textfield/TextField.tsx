import { MDCTextField } from '@material/textfield/component';
import { FC, ReactElement, memo, useEffect, useRef } from 'react';
import { Maybe } from '../../utils/customTypes';
import './textfield.scss';

interface ITextField {
    readonly hintText?: string;
    readonly placeHolder?: string;
}

const TextFieldComponent: FC<ITextField> = ({ hintText, placeHolder }): ReactElement => {
    const textfieldRef = useRef<HTMLLabelElement>(null);
    let textField: Maybe<MDCTextField> = undefined;

    useEffect(() => {
        if (textfieldRef.current) {
            textField = new MDCTextField(textfieldRef.current);
        }
    }, [textfieldRef]);

    const onFocus = (): void => {
        textField?.initialize();
    };
    return (
        <>
            <label
                className="mdc-text-field mdc-text-field--filled mdc-custom-textfield"
                ref={textfieldRef}
                onFocus={onFocus}
            >
                <span className="mdc-text-field__ripple"></span>
                <span className="mdc-floating-label" id="my-label-id">
                    {hintText}
                </span>
                <input className="mdc-text-field__input" type="text" placeholder={placeHolder} />
                <span className="mdc-line-ripple"></span>
            </label>
        </>
    );
};

export const TextField = memo(TextFieldComponent);
