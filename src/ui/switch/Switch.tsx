import { MDCSwitch } from '@material/switch/component';
import { always, equals, ifElse } from 'ramda';
import { FC, ReactElement, memo, useEffect, useRef } from 'react';
import { Maybe } from '../../utils/customTypes';
import { SwitchOffIcon } from '../icons/SwitchOff';
import { SwitchOnIcon } from '../icons/SwitchOn';
import './switch.scss';

interface ISwitch {
    readonly disable?: boolean;
    readonly label?: string;
    readonly selected?: boolean;
    readonly showIcons?: boolean;
}

const SELECTED_CLASS = 'mdc-switch--selected';
const UNSELETED_CLASS = 'mdc-switch--unselected';

const SwitchComponent: FC<ISwitch> = ({ disable, label , selected, showIcons}): ReactElement => {
  
    const isSelected = equals<Maybe<boolean>>(true);
    const switchRef = useRef<HTMLButtonElement>(null);
    let button: Maybe<MDCSwitch> = undefined;
    const setSelectedClass = ifElse(isSelected,always(SELECTED_CLASS),always(UNSELETED_CLASS))(selected);
    const setAriaChecked = ifElse(isSelected, always(true),always(false))(selected);
    useEffect(() => {
        if (switchRef.current) {
            button = new MDCSwitch(switchRef.current);
            button.initialize();
        }
    }, [switchRef]);
    

    return (
        <>
            <button
                className={`mdc-switch ${setSelectedClass} mdc-custom-switch`}
                type="button"
                role="switch"
                aria-checked={setAriaChecked}
                ref={switchRef}
                disabled={disable ? disable : false}
            >
                <div className="mdc-switch__track"></div>
                <div className="mdc-switch__handle-track">
                    <div className="mdc-switch__handle">
                        <div className="mdc-switch__shadow">
                            <div className="mdc-elevation-overlay"></div>
                        </div>
                        <div className="mdc-switch__ripple"></div>
                        <div className="mdc-switch__icons">
                            {showIcons && <>
                                <SwitchOnIcon />
                                <SwitchOffIcon />
                            </>
                            }
                        </div>
                    </div>
                </div>
            </button>
            <label htmlFor="basic-switch">{label}</label>
        </>
    );
};
export const Switch = memo(SwitchComponent);
