import { either, equals, isNil } from 'ramda';
import { FC, ReactElement, memo } from 'react';
import { Maybe } from '../../utils/customTypes';
import { TextButton } from '../button/TextButton';
import { ColumnsIcon } from '../icons/Columns';
import { DensityStandardIcon } from '../icons/DenistyStandard';
import './headerActionMenu.scss';

interface IHeaderActionMenu {
    readonly className?: string;
    readonly onColumnsClick?: () => void;
    readonly onDensityClick?: () => void;
    readonly hideColumnFilter?: boolean;
    readonly hideColumnSelector?: boolean;
    readonly hideDensitySelector?: boolean;
}

const HeaderActionMenuComponent: FC<IHeaderActionMenu> = ({
    className,
    onColumnsClick,
    onDensityClick,
    hideColumnFilter,
    hideColumnSelector,
    hideDensitySelector,
}): ReactElement => {
    const isVisible = either(equals<Maybe<boolean>>(false), isNil);


    return (
        <>
            <div className={`header-row-menu ${className}`}>
                {isVisible(hideColumnSelector) && (
                    <TextButton
                        key={'columns'}
                        icon={<ColumnsIcon fill="#6200ee" width={18} height={'100%'} />}
                        label="colonne"
                        size="small"
                        onClick={onColumnsClick}
                    />
                )}
                {isVisible(hideDensitySelector) && (
                    <TextButton
                        key={'density'}
                        icon={<DensityStandardIcon fill="#6200ee" width={18} height={'100%'} />}
                        label="densità"
                        size="small"
                        onClick={onDensityClick}
                    />
                )}
            </div>
        </>
    );
};

export const HeaderActionMenu = memo(HeaderActionMenuComponent);
