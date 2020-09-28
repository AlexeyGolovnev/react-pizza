import React, { useEffect, useMemo } from "react";
import ShoppingBasketItem from "./ShoppingBasketItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faShoppingBasket,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import emptyCart from "./../../assets/img/empty-cart.png";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { v1 } from "uuid";
import {
  addPizzaToBasket,
  calculateTotalData,
  clearBasket,
  deleteOnePizzaFromBasket,
  deletePizzaFromBasket,
} from "../../redux/action";

function ShoppingBasket() {
  const dispatch = useDispatch();
  const selectedPizzas = useSelector((state) => state.basket.selectedPizzas);
  const totalCount = useSelector((state) => state.basket.totalCount);
  const totalPrice = useSelector((state) => state.basket.totalPrice);
  const pizzas = useSelector((state) => state.pizzas.pizzas);
  const doughTypes = useSelector((state) => state.pizzas.doughTypes);
  const pizzaSizes = useSelector((state) => state.pizzas.pizzaSizes);

  useEffect(() => {
    dispatch(calculateTotalData());
  }, [selectedPizzas]);

  let selectedPizzasJsx = useMemo(
    () =>
      selectedPizzas.map((selectedPizza) => {
        let pizza = pizzas.find((pizza) => pizza.id === selectedPizza.pizzaId);
        let dough = doughTypes.find(
          (dough) => dough.id === selectedPizza.doughId
        );
        let size = pizzaSizes.find((size) => size.id === selectedPizza.sizeId);

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
              dispatch(
                addPizzaToBasket(
                  selectedPizza.pizzaId,
                  selectedPizza.doughId,
                  selectedPizza.sizeId,
                  selectedPizza.pizzasCount,
                  selectedPizza.price / selectedPizza.pizzasCount
                )
              )
            }
            deleteOnePizza={() =>
              dispatch(
                deleteOnePizzaFromBasket(
                  selectedPizza.pizzaId,
                  selectedPizza.doughId,
                  selectedPizza.sizeId
                )
              )
            }
            deletePizzas={() =>
              dispatch(
                deletePizzaFromBasket(
                  selectedPizza.pizzaId,
                  selectedPizza.doughId,
                  selectedPizza.sizeId
                )
              )
            }
          />
        );
      }),
    [selectedPizzas]
  );

  return (
    <div className="basket">
      <div className="container">
        {selectedPizzas.length === 0 ? (
          <div className="basket__empty-inner">
            <h2>Корзина пуста :(</h2>
            <span>Вероятнее всего, вы не заказывали пиццу.</span>
            <span>
              {" "}
              Для того, чтобы заказать пиццу, перейдите на главную страницу.
            </span>
            <img className="basket__empty-img" src={emptyCart} />
            <Button outline back classes="button_back">
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Вернуться назад</span>
            </Button>
          </div>
        ) : (
          <div className="basket__inner">
            <div className="basket__header">
              <div className="basket__header-left-part">
                <FontAwesomeIcon icon={faShoppingBasket} />
                <span>Корзина</span>
              </div>
              <div className="basket__header-right-part">
                <FontAwesomeIcon icon={faTrashAlt} />
                <span onClick={() => dispatch(clearBasket())}>
                  Очистить корзину
                </span>
              </div>
            </div>
            <div className="basket__content">
              <ul>{selectedPizzasJsx}</ul>
              <div className="basket__content-total">
                <span className="basket__content-total-count">
                  Всего пицц: <b>{totalCount} шт</b>.
                </span>
                <span className="basket__content-total-price">
                  Сумма заказа: <b>{totalPrice} руб</b>.
                </span>
              </div>
            </div>
            <div className="basket__footer">
              <Button outline back classes="button_back">
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Вернуться назад</span>
              </Button>
              <Button basket classes="button_pay">
                <span>Оплатить</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingBasket;
