import React from 'react';
import Button from "../Button/Button";
import AddBtn from "../Button/AddBtn";

function PizzaItem(props) {
    return (
        <div className="pizzas__item">
            <div className="pizzas__item-img-box">
                <img className='pizzas__item-img'
                     src='https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/7d2d57ef-1e81-4e96-9558-a1e0321471e7.jpg'/>
            </div>
            <span className='pizzas__item-name'>Чизбургер-пицца</span>
            <div className="pizzas_item-options">

            </div>
            <div className="pizzas__item-footer">
                <span className='pizza__item-price'>от 365$</span>
                <Button add children={<AddBtn/>}/>
            </div>
        </div>
    );
}

export default PizzaItem;