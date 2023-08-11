import { always, equals, ifElse } from 'ramda';
import { ReactElement, memo, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import './select.scss';

const OPEN_SELECT_LIST_CLASS = `mdc-menu-surface--open`;
const OPEN_SELECT_CLASS = `mdc-select--activated`;

const SelectComponent = (): ReactElement => {
    const refSelect = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const setSelectClassName = ifElse(equals(true), always(OPEN_SELECT_CLASS),always(``));
    const setListClassName = ifElse(equals(true), always(OPEN_SELECT_LIST_CLASS),always(``));


    const handleClickOutside = (): void => {
        setOpen(false);
    };

    const onClickSelect = (): void =>{
        setOpen((oldState) => !oldState)
    }

    useOnClickOutside(refSelect, handleClickOutside);
    return (
        <>
            <div
                className={`mdc-select mdc-select--no-label mdc-data-table__pagination-rows-per-page-select 
                mdc-custom-select ${setSelectClassName(open)}`} onClick={onClickSelect} ref={refSelect}
            >
                <div className="mdc-select__anchor" role="button" aria-haspopup="listbox" tabIndex={0}>
                    <span className="mdc-select__selected-text-container">
                        <span className="mdc-select__selected-text">10</span>
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
                    <span className="mdc-notched-outline mdc-notched-outline--notched">
                        <span className="mdc-notched-outline__leading"></span>
                        <span className="mdc-notched-outline__trailing"></span>
                    </span>
                </div>

                <div className={`mdc-select__menu mdc-menu mdc-menu-surface
                 mdc-menu-surface--fullwidth ${setListClassName(open)}`} role="listbox">
                    <ul className="mdc-list">
                        <li
                            className="mdc-list-item mdc-list-item--selected"
                            aria-selected="true"
                            role="option"
                            data-value="10"
                        >
                            <span className="mdc-list-item__text">10</span>
                        </li>
                        <li className="mdc-list-item" role="option" data-value="25">
                            <span className="mdc-list-item__text">25</span>
                        </li>
                        <li className="mdc-list-item" role="option" data-value="100">
                            <span className="mdc-list-item__text">100</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export const Select = memo(SelectComponent);
