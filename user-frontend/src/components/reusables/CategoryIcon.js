import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon';
import SchoolIcon from '@material-ui/icons/School';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import {ReactComponent as MagicIcon} from '../../assets/img/icons/magic.svg';
import {ReactComponent as BookIcon} from '../../assets/img/icons/Icon_Book.svg';

function CategoryIcon({category, labeled}) {
    return (
        <div className={`category-icon category-icon--${category}`}>
            <div className={`category-icon__icon-container category-icon__icon-container--${category}`}>
                {category === 'study' && <ColorLensIcon className='category-icon__img' />}
                {category === 'campus' && <SchoolIcon className='category-icon__img' />}                
                {category === 'class' && <SvgIcon component={BookIcon} className='MuiSvgIcon-root svg-icon category-icon__img' />}
                {category === 'research' && <SvgIcon component={MagicIcon} className='MuiSvgIcon-root svg-icon category-icon__img' />}
            </div>
            { labeled &&
                <small className="category-icon__label">
                    {category === 'study' && 'Studiprojekt'}
                    {category === 'campus' && 'Campus'}
                    {category === 'class' && 'Vorlesung'}
                    {category === 'research' && 'Forschung'}
                </small>
            }
        </div>
    )
}

export default CategoryIcon
