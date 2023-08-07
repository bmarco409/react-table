import { SvgIconProps } from '@material-ui/core';
import { FC, memo } from 'react';

const Left: FC<SvgIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>
);
export const LeftIcon = memo(Left);
