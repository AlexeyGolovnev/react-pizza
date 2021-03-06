import React, { useCallback, useContext } from 'react';
import PizzasOptionsItem from './PizzasOptionsItem';
import PropTypes from 'prop-types';
import { DispatchContext } from '../../context';
import { selectOptions } from '../../redux/action';

PizzasItemOptions.propTypes = {
  pizzaId: PropTypes.number.isRequired,
  doughs: PropTypes.arrayOf(PropTypes.object).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedDoughs: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  setCurrentCount: PropTypes.func.isRequired,
  pizzaSizes: PropTypes.arrayOf(PropTypes.object).isRequired,
  doughTypes: PropTypes.arrayOf(PropTypes.object).isRequired
};

function PizzasItemOptions ({
  pizzaId,
  doughs,
  selectedDoughs,
  sizes,
  selectedSizes,
  setCurrentCount,
  pizzaSizes,
  doughTypes
}) {
  const { dispatch } = useContext(DispatchContext);
  const handlerOptionsSelection = useCallback((pizzaId, doughId, sizeId) => {
    dispatch(selectOptions(pizzaId, doughId, sizeId));
    setCurrentCount(0);
  }, []);
  const doughsJsx = doughTypes.map((item) => (
    <PizzasOptionsItem
      key={item.id}
      isDisabled={!doughs.map(dough => +dough.id).includes(item.id)}
      isSelected={selectedDoughs.includes(item.id)}
      text={item.name}
      handlerOptionsSelection={() => handlerOptionsSelection(pizzaId, item.id, '')}
    />
  ));
  const sizesJsx = pizzaSizes.map((item) => (
    <PizzasOptionsItem
      key={item.id}
      isDisabled={!sizes.map(size => +size.id).includes(item.id)}
      isSelected={selectedSizes.includes(item.id)}
      text={item.size + ' cm.'}
      handlerOptionsSelection={() => handlerOptionsSelection(pizzaId, '', item.id)}
    />
  ));

  return (
    <div className='pizzas__item-options'>
      <div className='pizzas__dough-box'>
        {doughsJsx}
      </div>
      <div className='pizzas__size-box'>
        {sizesJsx}
      </div>
    </div>
  );
}

export default PizzasItemOptions;
