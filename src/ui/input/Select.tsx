import { addIndex, always, equals, ifElse, map } from 'ramda';
import { FC, ReactElement, memo, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { OPEN_SELECT_CLASS, OPEN_SELECT_LIST_CLASS, SELECT_ITEM_CLASS } from '../../utils/const';
import { Maybe, primitive } from '../../utils/customTypes';
import './select.scss';

interface ISelectComponent {
    readonly values: number[];
    readonly selectedValue: number;
    readonly onValueChange?: (value: number) => void;
}

const SelectComponent: FC<ISelectComponent> = ({ values, onValueChange, selectedValue }): ReactElement => {
    const refSelect = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const setSelectClassName = ifElse(equals(true), always(OPEN_SELECT_CLASS), always(``));
    const setListClassName = ifElse(equals(true), always(OPEN_SELECT_LIST_CLASS), always(``));

    const [selected, setSelected] = useState<Maybe<primitive>>(selectedValue);

    const handleClickOutside = (): void => {
        setOpen(false);
    };

    const onClickSelect = (): void => {
        setOpen((oldState) => !oldState);
    };
    const setItemSelectedClassName = ifElse(equals(true), always(SELECT_ITEM_CLASS), always(``));

    const onClickItem = (value: number): void => {
        setSelected(value);
        onValueChange?.(value);
    };

    const generateListItem = (value: number, index: number): ReactElement => {
        const selectedClass = setItemSelectedClassName(value === selected);
        return (
            <li
                className={`mdc-list-item ${selectedClass}`}
                role="option"
                key={index}
                onClick={(): void => onClickItem(value)}
            >
                <span className="mdc-list-item__text">{value}</span>
            </li>
        );
    };

    const mapIndex = addIndex<number, ReactElement>(map);

    const renderItems: ReactElement[] = mapIndex(generateListItem, values);

    useOnClickOutside(refSelect, handleClickOutside);
    return (
        <>
            <div
                className={`mdc-select mdc-select--no-label mdc-data-table__pagination-rows-per-page-select 
                mdc-custom-select ${setSelectClassName(open)}`}
                onClick={onClickSelect}
                ref={refSelect}
            >
                <div className="mdc-select__anchor" role="button" aria-haspopup="listbox" tabIndex={0}>
                    <span className="mdc-select__selected-text-container">
                        <span className="mdc-select__selected-text">{selected}</span>
                    </span>
                    <span className="mdc-select__dropdown-icon">
                        <svg className="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">
                            <polygon
                                className="mdc-select__dropdown-icon-inactive"
                                stroke="none"
                                fillRule="evenodd"
                                points="7 10 12 15 17 10"
                            ></polygon>
                            <polygon
                                className="mdc-select__dropdown-icon-active"
                                stroke="none"
                                fillRule="evenodd"
                                points="7 15 12 10 17 15"
                            ></polygon>
                        </svg>
                    </span>
                </div>

                <div
                    className={`mdc-select__menu mdc-menu mdc-menu-surface items ${setListClassName(open)}`}
                    role="listbox"
                >
                    <ul className="mdc-list">{renderItems}</ul>
                </div>
            </div>
        </>
    );
};

export const Select = memo(SelectComponent);
