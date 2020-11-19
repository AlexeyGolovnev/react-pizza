import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import AddBtn from '../Button/AddBtn';
import PizzasItemOptions from './PizzasItemOptions';
import { addPizzaToBasket, calculateTotalData } from '../../redux/action';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { DispatchContext } from '../../context';

PizzasItem.propTypes = {
  pizzaId: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  composition: PropTypes.string.isRequired,
  doughs: PropTypes.arrayOf(PropTypes.object).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.object).isRequired,
  price: PropTypes.number.isRequired,
  currentCategoryId: PropTypes.number.isRequired,
  currentSortCriterionId: PropTypes.number.isRequired
};

function PizzasItem ({
  pizzaId,
  imageUrl,
  name,
  composition,
  doughs,
  sizes,
  price,
  currentCategoryId,
  currentSortCriterionId
}) {
  const { dispatch } = useContext(DispatchContext);
  const addToBasket = (e, pizzaId) => {
    e.preventDefault();
    selectedOptions.forEach((option) => {
      if (option.pizzaId === pizzaId) {
        dispatch(addPizzaToBasket(option.pizzaId, option.doughId, option.sizeId, 1, option.currentPrice));
        if (option.doughId && option.sizeId) setCurrentCount(currentCount + 1);
      }
    });
    dispatch(calculateTotalData());
  };

  const selectedOptions = useSelector((state) => state.pizzas.selectedOptions);
  const doughTypes = useSelector((state) => state.pizzas.doughTypes);
  const pizzaSizes = useSelector((state) => state.pizzas.pizzaSizes);
  const selectedDoughsId = createSelector(
    (state) => state.pizzas.selectedOptions,
    (selectedOptions) => selectedOptions.map((option) => {
      if (pizzaId === option.pizzaId) {
        if (option.doughId) return option.doughId;
      }
    }));

  const selectedSizesId = createSelector(
    (state) => state.pizzas.selectedOptions,
    (selectedOptions) => selectedOptions.map((option) => {
      if (pizzaId === option.pizzaId) {
        if (option.sizeId) return option.sizeId;
      }
    }));

  const selectedDoughs = useSelector(selectedDoughsId);
  const selectedSizes = useSelector(selectedSizesId);
  const [currentCount, setCurrentCount] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    setCurrentCount(0);
  }, [currentCategoryId, currentSortCriterionId]);

  useEffect(() => {
    selectedOptions.forEach((option) => {
      if (option.pizzaId === pizzaId) setCurrentPrice(option.currentPrice);
    });
  }, [selectedSizes]);

  useEffect(() => {
    if (!selectedOptions.length) setCurrentPrice(0);
  }, [selectedOptions]);
  return (
    <div className='pizzas__item'>
      <div className='pizzas__item-img-box'>
        <img
          className='pizzas__item-img'
          src={imageUrl}
          alt={name}
        />
      </div>
      <span className='pizzas__item-name'>{name}</span>
      <span className='pizzas__item-composition'>{composition}</span>
      <PizzasItemOptions
        pizzaId={pizzaId}
        doughs={doughs}
        sizes={sizes}
        selectedDoughs={selectedDoughs}
        selectedSizes={selectedSizes}
        setCurrentCount={setCurrentCount}
        doughTypes={doughTypes}
        pizzaSizes={pizzaSizes}
      />
      <div className='pizzas__item-footer'>
        {currentPrice > 0
          ? <span className='pizzas__item-price'>{ currentPrice } $</span>
          : <span className='pizzas__item-price'>from { price } $</span>
        }
        <Button
          outline
          children={(
            <AddBtn
              currentCount={currentCount}
              classes={currentCount === 0 && 'hidden'}
            />
          )}
          action={(e) => addToBasket(e, pizzaId)}
        />
      </div>
    </div>
  );
}

export default PizzasItem;
