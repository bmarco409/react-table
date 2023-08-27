import { FC, SVGProps, memo } from 'react';

const SwitchOn: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg className="mdc-switch__icon mdc-switch__icon--on" viewBox="0 0 24 24" {...props}>
        <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
    </svg>
);
export const SwitchOnIcon = memo(SwitchOn);
