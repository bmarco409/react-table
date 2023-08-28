import { FC, SVGProps, memo } from 'react';

const Columns: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 24 24"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        {...props}
    >
        <rect fill="none" height="24" width="24" />
        <g>
            <path d="M14.67,5v14H9.33V5H14.67z M15.67,19H21V5h-5.33V19z M8.33,19V5H3v14H8.33z" />
        </g>
    </svg>
);
export const ColumnsIcon = memo(Columns);
