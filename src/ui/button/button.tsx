import { ReactElement } from 'react';
import './button.scss';

const ButtonComponent = (): ReactElement => {
    return (
        <>
            <div className="mdc-touch-target-wrapper">
                <button className="mdc-button mdc-button--touch">
                    <span className="mdc-button__ripple"></span>
                    <span className="mdc-button__touch"></span>
                    <span className="mdc-button__label">My Accessible Button</span>
                </button>
            </div>
        </>
    );
};
