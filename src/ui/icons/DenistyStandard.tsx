import { FC, SVGProps, memo } from 'react';

const DensityStandard: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" {...props}>
        <path d="M21,8H3V4h18V8z M21,10H3v4h18V10z M21,16H3v4h18V16z" />
    </svg>
);
export const DensityStandardIcon = memo(DensityStandard);
