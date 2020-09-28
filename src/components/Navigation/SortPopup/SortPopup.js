import React, { useEffect, useState } from "react";
import classNames from "classnames";
import SortPopupItem from "./SortPopupItem";
import {
  changeSortCriterion,
  clearSelectedOptions,
} from "../../../redux/action";

function SortPopup({ sortCriteria, dispatch, currentSortCriterion }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSortCriterionObj, setCurrentSortCriterionObj] = useState({});

  useEffect(() => {
    setCurrentSortCriterionObj(
      sortCriteria.find((criterion) => criterion.id === currentSortCriterion)
    );
  }, [sortCriteria, currentSortCriterion]);

  const changeCriterion = (sortCriterionId) => {
    setIsOpen(!isOpen);
    if (sortCriterionId !== currentSortCriterion) {
      dispatch(changeSortCriterion(sortCriterionId));
      dispatch(clearSelectedOptions());
    }
  };

  const sortCriteriaJsx = sortCriteria.map((criterion) => {
    return (
      <SortPopupItem
        key={criterion.id}
        changeCategory={() => changeCriterion(criterion.id)}
        text={criterion.name}
      ></SortPopupItem>
    );
  });
  return (
    <div className={classNames("sort", { open: isOpen })}>
      <span className="sort__label ">Сортировка по:</span>
      <span className="sort__name" onClick={() => setIsOpen(!isOpen)}>
        {currentSortCriterionObj && currentSortCriterionObj.name}
      </span>
      <ul className={classNames("sort__popup", { open: isOpen })}>
        {sortCriteriaJsx}
      </ul>
    </div>
  );
}

export default SortPopup;
