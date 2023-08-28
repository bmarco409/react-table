import { ReactElement, memo } from 'react';
import { TextButton } from '../button/TextButton';
import { ColumnsIcon } from '../icons/Columns';
import { DensityStandardIcon } from '../icons/DenistyStandard';
import './headerActionMenu.scss';

const HeaderActionMenuComponent = (): ReactElement => {
    return (
        <>
            <div className="header-row-menu">
                <TextButton key={'columns'} icon={<ColumnsIcon fill="#6200ee" />} label="colonne" size="small" />
                <TextButton key={'columns'} icon={<DensityStandardIcon fill="#6200ee" />} label="densità" size="small" />
            </div>
        </>
    );
};

export const HeaderActionMenu = memo(HeaderActionMenuComponent);
