import { MDCSwitch } from '@material/switch/component';
import { ReactElement, memo, useEffect, useRef } from 'react';
import { Maybe } from '../../utils/customTypes';
import './switch.scss';

const SwitchComponent = (): ReactElement => {
    const switchRef = useRef<HTMLButtonElement>(null);
    let button: Maybe<MDCSwitch>  =  undefined;
    useEffect(() =>{
        if( switchRef.current){
            button = new MDCSwitch(switchRef.current)
            button.initialize()
        }
    },[switchRef])
    return (
        <>
            <button
                id="basic-switch"
                className="mdc-switch mdc-switch--unselected"
                type="button"
                role="switch"
                aria-checked="false"
                ref={switchRef}
            >
                <div className="mdc-switch__track"></div>
                <div className="mdc-switch__handle-track">
                    <div className="mdc-switch__handle">
                        <div className="mdc-switch__shadow">
                            <div className="mdc-elevation-overlay"></div>
                        </div>
                        <div className="mdc-switch__ripple"></div>
                        <div className="mdc-switch__icons">
                            <svg className="mdc-switch__icon mdc-switch__icon--on" viewBox="0 0 24 24">
                                <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
                            </svg>
                            <svg className="mdc-switch__icon mdc-switch__icon--off" viewBox="0 0 24 24">
                                <path d="M20 13H4v-2h16v2z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </button>
            <label htmlFor="basic-switch">off/on</label>
        </>
    );
};
export const Switch = memo(SwitchComponent);
