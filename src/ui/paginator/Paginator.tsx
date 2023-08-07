import { FC, ReactElement, memo } from 'react';
import { PageFirstIcon } from '../icons/PageFIrst';

interface IPaginator {
    readonly pageSize: number;
}

const Paginator: FC<IPaginator> = ({ pageSize }): ReactElement => {
    return (
        <>
            {/* <div className="mdc-data-table__pagination">paginator</div> */}

            <div className="mdc-data-table__pagination">
                <div className="mdc-data-table__pagination-trailing">
                    <div className="mdc-data-table__pagination-rows-per-page">
                        <div className="mdc-data-table__pagination-rows-per-page-label">Rows per page</div>

                        {/* <div className="mdc-select mdc-select--outlined mdc-select--no-label mdc-data-table__pagination-rows-per-page-select">
                            <div
                                className="mdc-select__anchor"
                                role="button"
                                aria-haspopup="listbox"
                                aria-labelledby="demo-pagination-select"
                                tabIndex={0}
                            >
                                <span className="mdc-select__selected-text-container">
                                    <span id="demo-pagination-select" className="mdc-select__selected-text">
                                        10
                                    </span>
                                </span>
                                <span className="mdc-select__dropdown-icon">
                                    <svg className="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">
                                        <polygon
                                            className="mdc-select__dropdown-icon-inactive"
                                            stroke="none"
                                            fillRule="evenodd"
                                            points="7 10 12 15 17 10"
                                        ></polygon>
                                        <polygon
                                            className="mdc-select__dropdown-icon-active"
                                            stroke="none"
                                            fillRule="evenodd"
                                            points="7 15 12 10 17 15"
                                        ></polygon>
                                    </svg>
                                </span>
                                <span className="mdc-notched-outline mdc-notched-outline--notched">
                                    <span className="mdc-notched-outline__leading"></span>
                                    <span className="mdc-notched-outline__trailing"></span>
                                </span>
                            </div>

                            <div
                                className="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth"
                                role="listbox"
                            >
                                <ul className="mdc-list">
                                    <li
                                        className="mdc-list-item mdc-list-item--selected"
                                        aria-selected="true"
                                        role="option"
                                        data-value="10"
                                    >
                                        <span className="mdc-list-item__text">10</span>
                                    </li>
                                    <li className="mdc-list-item" role="option" data-value="25">
                                        <span className="mdc-list-item__text">25</span>
                                    </li>
                                    <li className="mdc-list-item" role="option" data-value="100">
                                        <span className="mdc-list-item__text">100</span>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                    </div>

                    <div className="mdc-data-table__pagination-navigation">
                        <div className="mdc-data-table__pagination-total">1‑10 of 100</div>
                        <button className="mdc-data-table__pagination-button" style={{ background: 'none' }}>
                            <PageFirstIcon className="mdc-button__icon" width={'24'} height={'auto'} />
                        </button>
                        <button
                            className="mdc-icon-button material-icons mdc-data-table__pagination-button"
                            data-prev-page="true"
                            disabled
                        >
                            <div className="mdc-button__icon">chevron_left</div>
                        </button>
                        <button
                            className="mdc-icon-button material-icons mdc-data-table__pagination-button"
                            data-next-page="true"
                        >
                            <div className="mdc-button__icon">chevron_right</div>
                        </button>
                        <button
                            className="mdc-icon-button material-icons mdc-data-table__pagination-button"
                            data-last-page="true"
                        >
                            <div className="mdc-button__icon">last_page</div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export const PaginatorComponent = memo(Paginator);
