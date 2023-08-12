import { always, equals, ifElse } from 'ramda';
import { FC, ReactElement, memo, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { BaseComponentInterface } from '../../shared/baseComponentInterface';
import { DotsIcon } from '../icons/DotsIcon';
import './menu.scss';

type IMenuComponent = BaseComponentInterface;

const OPEN_MENU_CLASS = 'mdc-menu-surface--is-open-below mdc-menu-surface--open';

const MenuComponent: FC<IMenuComponent> = ({ className }): ReactElement => {
    const refMenu = useRef<HTMLDivElement>(null);

    const handleClickOutside = (): void => {
        setOpen(false);
    };

    const [open, setOpen] = useState<boolean>(false);

    const setOpenClass = ifElse(equals(true), always(OPEN_MENU_CLASS), always(``));

    const openMenu = (): void => {
        setOpen((prevState) => !prevState);
    };

    useOnClickOutside(refMenu, handleClickOutside);

    return (
        <>
            <div className="mdc-custom-manu-container" ref={refMenu}>
                <button onClick={openMenu} className={`mdc-custom-dots-button ${className}`}>
                    <DotsIcon width={18} height={'auto'} />
                </button>
                <div className="mdc-menu-surface--anchor--absolute">
                    <div
                        className={`mdc-menu mdc-menu-surface ${setOpenClass(open)}`}
                        id="demo-menu"
                        ref={refMenu}
                        style={{ left: '70px !important' }}
                    >
                        <ul
                            className="mdc-list"
                            role="menu"
                            aria-hidden="true"
                            aria-orientation="vertical"
                            tabIndex={-1}
                        >
                            <li>
                                <ul className="mdc-menu__selection-group">
                                    <li className="mdc-list-item" role="menuitem">
                                        <span className="mdc-list-item__ripple"></span>
                                        <span className="mdc-list-item__graphic mdc-menu__selection-group-icon">
                                            ...
                                        </span>
                                        <span className="mdc-list-item__text">Filtra</span>
                                    </li>
                                </ul>
                            </li>
                            <li className="mdc-list-divider" role="separator"></li>
                            <li>
                                <ul className="mdc-menu__selection-group">
                                    <li className="mdc-list-item" role="menuitem">
                                        <span className="mdc-list-item__ripple"></span>
                                        <span className="mdc-list-item__graphic mdc-menu__selection-group-icon">
                                            ...
                                        </span>
                                        <span className="mdc-list-item__text">Nascondi</span>
                                    </li>
                                    <li className="mdc-list-item" role="menuitem">
                                        <span className="mdc-list-item__ripple"></span>
                                        <span className="mdc-list-item__graphic mdc-menu__selection-group-icon">
                                            ...
                                        </span>
                                        <span className="mdc-list-item__text">Gestisci colonne</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export const Menu = memo(MenuComponent);
