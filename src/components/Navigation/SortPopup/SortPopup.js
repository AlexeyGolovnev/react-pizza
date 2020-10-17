import React, {useContext, useEffect, useState} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SortPopupItem from './SortPopupItem';
import {
  changeSortCriterion,
  clearSelectedOptions
} from '../../../redux/action';
import {DispatchContext} from '../../../context';

import {RectangleLoader} from '../../Loaders/RectangleLoader';

SortPopup.propTypes = {
  sortCriteria: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentSortCriterionId: PropTypes.number.isRequired,
  pizzasCount: PropTypes.number.isRequired
};
function SortPopup ({ sortCriteria, currentSortCriterionId, pizzasCount }) {
  const { dispatch } = useContext(DispatchContext);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSortCriterionObj, setCurrentSortCriterionObj] = useState({});
  useEffect(() => {
    setCurrentSortCriterionObj(
      sortCriteria.find((criterion) => criterion.id === currentSortCriterionId)
    );
  }, [sortCriteria, currentSortCriterionId]);

  const changeCriterion = (sortCriterionId) => {
    setIsOpen(!isOpen);
    if (sortCriterionId !== currentSortCriterionId) {
      dispatch(changeSortCriterion(sortCriterionId));
      dispatch(clearSelectedOptions());
    }
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const sortCriteriaJsx = sortCriteria.map((criterion) => {
    return (
      <SortPopupItem
        key={criterion.id}
        changeCategory={() => changeCriterion(criterion.id)}
        text={criterion.name}
      />
    );
  });
  return (
    <div className={classNames('sort', { 'open': isOpen })}>
      {pizzasCount > 0
        ? <>
          <span className='sort__label'>Сортировка по:</span>
          <span className='sort__name' onClick={togglePopup}>
            {currentSortCriterionObj && currentSortCriterionObj.name}
          </span>
          <ul className={classNames('sort__popup', { 'open': isOpen })}>
            {sortCriteriaJsx}
          </ul>
        </>
        : <RectangleLoader />
      }

    </div>
  );
}

export default SortPopup;
