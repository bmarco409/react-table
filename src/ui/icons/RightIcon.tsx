import { SvgIconProps } from '@material-ui/core';
import { FC, memo } from 'react';

const Right: FC<SvgIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
    </svg>
);
export const RightIcon = memo(Right);
