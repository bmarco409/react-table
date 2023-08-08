import { SvgIconProps } from '@material-ui/core';
import { FC, memo } from 'react';

const UpArrow: FC<SvgIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" />
    </svg>
);
export const UpArrowIcon = memo(UpArrow);
