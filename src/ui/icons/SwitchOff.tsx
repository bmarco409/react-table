import { FC, SVGProps, memo } from 'react';

const SwitchOff: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg className="mdc-switch__icon mdc-switch__icon--off" viewBox="0 0 24 24" {...props}>
        <path d="M20 13H4v-2h16v2z" />
    </svg>
);
export const SwitchOffIcon = memo(SwitchOff);
