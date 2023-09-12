import { either, equals, isNil } from "ramda";
import { ReactElement, useState } from "react";
import { HideColumnValue, ICoulmDefinition } from "../interfaces/column-def.interface";
import { HeaderActionMenu } from "../ui/HeaderAction/HeaderActionMenu";
import { HidableColumsMenuComponent } from "../ui/hidableColumnsMenu/HidableComunsMenu";
import { Maybe } from "./customTypes";

interface IUseaHeaderActionMenu<T>{
    readonly columnsDefinitions: ICoulmDefinition<T>[],
    readonly hideColumnFilter?: boolean;
    readonly hideColumnSelector?: boolean
    readonly hideDensitySelector?: boolean;
    readonly onHideColumnChange?: (value: HideColumnValue) => void
}

export const UseaHeaderActionMenu = <T,>({
    columnsDefinitions,hideColumnFilter, hideColumnSelector, hideDensitySelector , onHideColumnChange}: IUseaHeaderActionMenu<T>): {
    actionMenu: ReactElement,
    columnHideableMenu: ReactElement
    
} =>{
    const [showHideableMenu, setHideableMenu] = useState<boolean>(false);
    const isVisibleActionHeader = either(equals<Maybe<boolean>>(false), isNil);

    const showActionHeader = isVisibleActionHeader(hideColumnFilter) || 
        isVisibleActionHeader(hideColumnSelector) || 
        isVisibleActionHeader(hideDensitySelector);

    const renderActionMenu = (): ReactElement =>{
        if(!showActionHeader){
            return <></>
        }

        const onColumnsClick = (): void =>{
            return setHideableMenu((prev) => !prev);
        }


        return (
            <HeaderActionMenu className="mdc-custom-header-menu" 
                hideColumnFilter={hideColumnFilter} 
                hideColumnSelector={hideColumnSelector} 
                hideDensitySelector={hideDensitySelector}
                onColumnsClick={onColumnsClick}
            />
        )
    }

    const renderColumnsHideableMenu = (): ReactElement =>{
        return (
            <>
            <div style={{ display: 'flex'}}>
                <HidableColumsMenuComponent columnsDefinitions={columnsDefinitions} open={showHideableMenu} 
                    onHideColumnChange={onHideColumnChange}/>
                </div>
            </>
        )
    }

    return { actionMenu: renderActionMenu(), columnHideableMenu: renderColumnsHideableMenu()}

}