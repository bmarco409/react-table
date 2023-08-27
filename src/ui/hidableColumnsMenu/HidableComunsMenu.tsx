import { always, anyPass, equals, filter, ifElse, propEq } from 'ramda';
import { ReactElement, memo } from 'react';
import { ICoulmDefinition } from '../../interfaces/column-def.interface';
import { Maybe } from '../../utils/customTypes';
import { Switch } from '../switch/Switch';
import { TextField } from '../textfield/TextField';
import './hidableCoumnsMenu.scss';

const OPEN_MENU_CLASS = 'mdc-menu-surface--open';

interface IHidableColumnsMenu <T>{
    readonly open?: boolean;
    readonly columnsDefinitions: ICoulmDefinition<T>[];
}

export const HidableColumsMenuComponent = <T,>({ open, columnsDefinitions }: IHidableColumnsMenu<T>): ReactElement => {
    const setOpenClass = ifElse(equals<Maybe<boolean>>(true), always(OPEN_MENU_CLASS), always(``));
    //const hidableCondition = either(where({ hidable: true}),where({ hidable: undefined}));
    const hidableCondition = anyPass([propEq('hidable', true), propEq('hidable', undefined)]);

    const columnsHidamble = filter(hidableCondition,columnsDefinitions );

    console.info(columnsHidamble)

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
