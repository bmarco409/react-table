import { always, equals, ifElse, map } from 'ramda';
import { ReactElement, memo } from 'react';
import { ICoulmDefinition } from '../../interfaces/column-def.interface';
import { Maybe } from '../../utils/customTypes';
import { TextButton } from '../button/TextButton';
import { Switch } from '../switch/Switch';
import { TextField } from '../textfield/TextField';
import './hidableCoumnsMenu.scss';

const OPEN_MENU_CLASS = 'mdc-menu-surface--open';

interface IHidableColumnsMenu<T> {
    readonly open?: boolean;
    readonly columnsDefinitions: ICoulmDefinition<T>[];
}

export const HidableColumsMenuComponent = <T,>({ open, columnsDefinitions }: IHidableColumnsMenu<T>): ReactElement => {
    const setOpenClass = ifElse(equals<Maybe<boolean>>(true), always(OPEN_MENU_CLASS), always(``));

    const isHidable = (column: ICoulmDefinition<T>): boolean => {
        return column.hideable === true || column.hideable === undefined;
    };

    const renderSwitch = (value: ICoulmDefinition<T>): ReactElement => {
        return (
            <li className="mdc-list-item" role="menuitem" key={value.field}>
                <Switch key={value.field} label={value.field} disable={!isHidable(value)} selected />
            </li>
        );
    };

    return (
        <>
            <div className={`mdc-menu mdc-menu-surface ${setOpenClass(open)}`}>
                <ul className="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabIndex={-1}>
                    <li className="mdc-list-item" role="menuitem">
                        <TextField hintText="Trova colonna" placeHolder="Nome Colonna" />
                    </li>

                    {map(renderSwitch, columnsDefinitions)}
                </ul>
                <div>
                    <TextButton size='medium' label='nascondi tutte'/>
                    <TextButton size='medium' label='visualizza tutte'/>
                </div>
            </div>
        </>
    );
};

export const HidableColumsMenu = memo(HidableColumsMenuComponent);
