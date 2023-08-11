import { MDCMenu } from '@material/menu/component';
import { FC, ReactElement, memo, useRef } from 'react';
import { BaseComponentInterface } from '../../shared/baseComponentInterface';
import { DotsIcon } from '../icons/DotsIcon';
import './menu.scss';

type IMenuComponent = BaseComponentInterface;

const MenuComponent: FC<IMenuComponent> = ({ className }): ReactElement => {
    const refMenu = useRef<HTMLDivElement>(null);
    const refButton = useRef<HTMLButtonElement>(null);

    const openMenu = (): void => {
        if (refMenu.current && refButton.current) {
            const menu = new MDCMenu(refMenu.current);
            menu.open = true;
        }
    };

    return (
        <>
            <button onClick={openMenu} className={`mdc-custom-dots-button ${className}`} ref={refButton}>
                <DotsIcon width={18} height={'auto'} />
            </button>
            <div className="mdc-menu-surface--anchor">
                <div
                    className="mdc-menu mdc-menu-surface"
                    id="demo-menu"
                    ref={refMenu}
                    style={{ left: '70px !important' }}
                >
                    <ul className="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabIndex={-1}>
                        <li>
                            <ul className="mdc-menu__selection-group">
                                <li className="mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="mdc-list-item__graphic mdc-menu__selection-group-icon">...</span>
                                    <span className="mdc-list-item__text">Filtra</span>
                                </li>
                            </ul>
                        </li>
                        <li className="mdc-list-divider" role="separator"></li>
                        <li>
                            <ul className="mdc-menu__selection-group">
                                <li className="mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="mdc-list-item__graphic mdc-menu__selection-group-icon">...</span>
                                    <span className="mdc-list-item__text">Nascondi</span>
                                </li>
                                <li className="mdc-list-item" role="menuitem">
                                    <span className="mdc-list-item__ripple"></span>
                                    <span className="mdc-list-item__graphic mdc-menu__selection-group-icon">...</span>
                                    <span className="mdc-list-item__text">Gestisci colonne</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export const Menu = memo(MenuComponent);
