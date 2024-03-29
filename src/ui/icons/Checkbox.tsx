import { FC, SVGProps, memo } from 'react';

const CheckBoxComponent: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24" {...props}>
        <path className="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
    </svg>
);
export const CheckBoxIcon = memo(CheckBoxComponent);
