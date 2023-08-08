import { FC, ReactElement, ReactNode, memo } from "react";
import './paginatorButton.scss';


interface IPaginatorComponent {
    readonly children: ReactNode;
}

const PaginatorButtonComponent :FC<IPaginatorComponent> = ({ children }): ReactElement =>{
    return (
        <>
            <button className="mdc-data-table__pagination-button mdc-custom-pagination-button">
                {children}
            </button>   
        </>
    )
}

export const PaginatorButton = memo(PaginatorButtonComponent);