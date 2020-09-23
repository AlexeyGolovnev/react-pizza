import React, {useEffect} from 'react';
import PizzasItem from "./PizzasItem";
import {getDoughTypes, getPizzas, getPizzaSizes} from "../../redux/action";
import {useDispatch, useSelector} from "react-redux";

function Pizzas() {

    const dispatch = useDispatch();

    const pizzas = useSelector(state => state.pizzas.pizzas);

    const currentCategory = useSelector(state => state.pizzas.currentCategory);
    const currentSortCriterion = useSelector(state => state.pizzas.currentSortCriterion);
    const categories = useSelector (state => state.pizzas.categories);

    const selectedOptions = useSelector(state => state.pizzas.selectedOptions);

    useEffect(() => {
        dispatch(getPizzas());
        dispatch(getDoughTypes());
        dispatch(getPizzaSizes());
    },[]);

    const filteredPizzas = pizzas.filter(pizza => {
        return pizza.category.includes(currentCategory);
    })

    const pizzasJsx = filteredPizzas.map( pizza => {
        return (
            <PizzasItem
                key = {pizza.id}
                pizzaId = {pizza.id}
                imageUrl = {pizza.imageUrl}
                name = {pizza.name}
                doughs = {pizza.doughs}
                sizes = {pizza.sizes}
                price = {pizza.price}
                category = {pizza.category}
                rating = {pizza.rating}
                dispatch = {dispatch}
                selectedOptions = {selectedOptions}
                currentCategory = {currentCategory}
                currentSortCriterion = {currentSortCriterion}
            />
        );
    });

    const category = categories.find(category => category.id === currentCategory);

    return (
        <div className='pizzas'>
            <div className="container">
                <div className="pizzas__inner">
                    <h2>{category && category.name + ' пиццы'} </h2>
                    <div className="pizzas__items-box">
                        {pizzasJsx}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Pizzas;