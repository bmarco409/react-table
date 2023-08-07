import { SvgIconProps } from '@material-ui/core';
import { FC, memo } from 'react';

const PageLast: FC<SvgIconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z" />
    </svg>
);
export const PageLastIcon = memo(PageLast);
