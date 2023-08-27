import { always, equals, ifElse } from 'ramda';
import { FC, ReactElement, memo } from 'react';
import { Maybe } from '../../utils/customTypes';
import { Switch } from '../switch/Switch';
import { TextField } from '../textfield/TextField';
import './hidableCoumnsMenu.scss';

const OPEN_MENU_CLASS = 'mdc-menu-surface--open';

interface IHidableColumnsMenu {
    readonly open?: boolean;
}

const HidableColumsMenuComponent: FC<IHidableColumnsMenu> = ({ open }): ReactElement => {
    const setOpenClass = ifElse(equals<Maybe<boolean>>(true), always(OPEN_MENU_CLASS), always(``));

    return (
        <>
            <div className={`mdc-menu mdc-menu-surface ${setOpenClass(open)}`}>
            <ul className="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabIndex={-1}>
            <li className="mdc-list-item" role="menuitem">
            <TextField hintText="Trova colonna" placeHolder="Nome Colonna" />
            </li>
            
            <li className="mdc-list-item" role="menuitem">
            <Switch></Switch>
            </li>
                </ul>
                
               
            </div>
        </>
    );
};

export const HidableColumsMenu = memo(HidableColumsMenuComponent);
