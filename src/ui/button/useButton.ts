import { MDCRipple } from '@material/ripple/component';
import { T, always, cond, equals } from 'ramda';
import { CSSProperties, useEffect, useRef } from 'react';
import { Maybe } from '../../utils/customTypes';
import { Size } from './button';

interface IUseButton {
    readonly size?: Size;
}

export const UseButton = ({
    size,
}: IUseButton): {
    buttonRef: React.RefObject<HTMLButtonElement>;
    style: CSSProperties;
} => {
    const isSmall = equals<Maybe<Size>>('small');
    const isMedium = equals<Maybe<Size>>('medium');
    //const isLarge = equals<Size>('large');

    const buttonRef = useRef<HTMLButtonElement>(null);
    let button: Maybe<MDCRipple> = undefined;

    useEffect(() => {
        if (buttonRef.current) {
            button = new MDCRipple(buttonRef.current);
            button.initialize();
        }
    }, [buttonRef]);

    const setHeight = cond([
        [isSmall, always(30)],
        [isMedium, always(36)],
        [T, always(undefined)],
    ]);

    const setFontsize = cond([
        [isSmall, always('0.8125rem')],
        [isMedium, always('0.875rem')],
        [T, always(undefined)],
    ]);

    const generateCustomStyle = (): CSSProperties => {
        return {
            height: setHeight(size),
            fontSize: setFontsize(size),
        };
    };

    return { buttonRef, style: generateCustomStyle() };
};
