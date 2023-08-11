import { MDCLinearProgress } from '@material/linear-progress/component';
import { FC, ReactElement, memo, useEffect, useRef } from 'react';
import './linearProgressbar.scss';


interface ILinearProgressBarComonent {
    readonly open: boolean;

}


const LinearProgressBarComonent : FC<ILinearProgressBarComonent> = ({ open }): ReactElement => {
    const refProgressBar = useRef<HTMLDivElement>(null);
    let progressBar: MDCLinearProgress | null = null;
    console.log('seee',refProgressBar.current);

    useEffect(() =>{
        if(refProgressBar.current){
            console.log('dddd')
            progressBar = new MDCLinearProgress(refProgressBar.current);
        }
    },[open])
   


    if(progressBar && open){
        progressBar.open();
    }
    

    return (
        <>
            <div
                role="progressbar"
                className="mdc-linear-progress mdc-linear-progress--indeterminate"
                aria-label="Progress Bar"
                ref={refProgressBar}
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
            {/* <div className="mdc-data-table__progress-indicator" >
                <div className="mdc-data-table__scrim"></div>
                <div
                    className="mdc-linear-progress mdc-linear-progress--indeterminate mdc-data-table__linear-progress"
                    role="progressbar"
                    aria-label="Data is being loaded..."
                    ref={refProgressBar}
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
            </div> */}
        </>
    );
};

export const LinearProgressBar = memo(LinearProgressBarComonent);
