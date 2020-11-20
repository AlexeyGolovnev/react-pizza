import React, { useContext, useEffect, useMemo } from 'react';
import ShoppingBasketItem from './ShoppingBasketItem';
import emptyCart from '../../assets/img/empty-cart.png';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faShoppingBasket, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { v1 } from 'uuid';
import { addPizzaToBasket, calculateTotalData, clearBasket, deleteOnePizzaFromBasket, deletePizzaFromBasket } from '../../redux/action';
import { DispatchContext } from '../../context';

function ShoppingBasket () {
  const { dispatch } = useContext(DispatchContext);
  const selectedPizzas = useSelector((state) => state.basket.selectedPizzas);
  const totalCount = useSelector((state) => state.basket.totalCount);
  const totalPrice = useSelector((state) => state.basket.totalPrice);
  const pizzas = useSelector((state) => state.pizzas.pizzas);
  const doughTypes = useSelector((state) => state.pizzas.doughTypes);
  const pizzaSizes = useSelector((state) => state.pizzas.pizzaSizes);

  useEffect(() => {
    dispatch(calculateTotalData());
  }, [selectedPizzas]);

  const selectedPizzasJsx = useMemo(() => selectedPizzas.map((selectedPizza) => {
    const pizza = pizzas.find((pizza) => pizza.id === selectedPizza.pizzaId);
    const dough = doughTypes.find((dough) => dough.id === selectedPizza.doughId);
    const size = pizzaSizes.find((size) => size.id === selectedPizza.sizeId);
    return (
      <ShoppingBasketItem
        key={v1()}
        img={pizza.imageUrl}
        name={pizza.name}
        dough={dough.name}
        size={size.size}
        count={selectedPizza.pizzasCount}
        price={selectedPizza.price}
        addPizza={() =>
          dispatch(addPizzaToBasket(
            selectedPizza.pizzaId,
            selectedPizza.doughId,
            selectedPizza.sizeId,
            selectedPizza.pizzasCount,
            selectedPizza.price / selectedPizza.pizzasCount)
          )
        }
        deleteOnePizza={() =>
          dispatch(deleteOnePizzaFromBasket(
            selectedPizza.pizzaId,
            selectedPizza.doughId,
            selectedPizza.sizeId)
          )
        }
        deletePizzas={() =>
          dispatch(deletePizzaFromBasket(
            selectedPizza.pizzaId,
            selectedPizza.doughId,
            selectedPizza.sizeId)
          )
        }
      />
    );
  }),
  [selectedPizzas]
  );

  return (
    <div className='basket'>
      <div className='container'>
        {selectedPizzas.length === 0
          ? (
            <div className='basket__empty-inner'>
              <h2>Cart is empty :(</h2>
              <span>Most likely you did not order pizza.</span>
              <span>To order pizza, go to the home page.</span>
              <img className='basket__empty-img' src={emptyCart} alt=' ' />
              <Button outline path='/' classes='button_back'>
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Back to Home Page</span>
              </Button>
            </div>
          )
          : (
            <div className='basket__inner'>
              <div className='basket__header'>
                <div className='basket__header-left-part'>
                  <FontAwesomeIcon icon={faShoppingBasket} />
                  <span>Cart</span>
                </div>
                <div className='basket__header-right-part'>
                  <FontAwesomeIcon icon={faTrashAlt} />
                  <span onClick={() => dispatch(clearBasket())}>
                    Clear cart
                  </span>
                </div>
              </div>
              <div className='basket__content'>
                <ul>{selectedPizzasJsx}</ul>
                <div className='basket__content-total'>
                  <span className='basket__content-total-count'>Total: <b>{totalCount} items</b>
                  </span>
                  <span className='basket__content-total-price'>
                    Order price: <b>{totalPrice} $</b>
                  </span>
                </div>
              </div>
              <div className='basket__footer'>
                <div className='basket__footer-btnBox'>
                  <Button outline path='/' classes='button_back'>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>Back to Home Page</span>
                  </Button>
                </div>
                <div className='basket__footer-btnBox'>
                  <Button path='/order' classes='button_basket button_pay' >
                    <span>Order checkout</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default ShoppingBasket;
