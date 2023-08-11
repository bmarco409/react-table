import { FC, ReactElement, memo } from 'react';
import './linearProgressbar.scss';

const LinearProgressBarComonent: FC = (): ReactElement => {
    return (
        <>
            <div
                role="progressbar"
                className="mdc-linear-progress mdc-linear-progress--indeterminate mdc-linear-progress--animation-ready"
                aria-label="Progress Bar"
            >
                <div className="mdc-linear-progress__buffer">
                    <div className="mdc-linear-progress__buffer-bar"></div>
                    <div className="mdc-linear-progress__buffer-dots"></div>
                </div>
                <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
                    <span className="mdc-linear-progress__bar-inner"></span>
                </div>
                <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
                    <span className="mdc-linear-progress__bar-inner"></span>
                </div>
            </div>
        </>
    );
};

export const LinearProgressBar = memo(LinearProgressBarComonent);
