import React from 'react';
import PizzasOptionsItem from "./PizzasOptionsItem";
import {selectOptions} from "../../redux/action";

function PizzasItemOptions(
    {
        pizzaId,
        doughs,
        selectedDoughs,
        sizes,
        selectedSizes,
        setCurrentCount,
        pizzaSizes,
        doughTypes,
        dispatch,
    }) {

    const handlerOptionsSelection = (pizzaId, doughId, sizeId) => {
        dispatch(selectOptions(pizzaId, doughId, sizeId));
        setCurrentCount(0);
    }

    const doughsJsx = doughTypes.map(item => {
        return <PizzasOptionsItem
            key={item.id}
            isDisabled={!doughs.includes(item.id)}
            isSelected={selectedDoughs.includes(item.id)}
            text={item.name}
            handlerOptionsSelection={() => handlerOptionsSelection(pizzaId, item.id, '')}
        />
    })
    const sizesJsx = pizzaSizes.map(item => {
        return <PizzasOptionsItem
            key={item.id}
            isDisabled={!sizes.includes(item.id)}
            isSelected={selectedSizes.includes(item.id)}
            text={item.size + ' см.'}
            handlerOptionsSelection={() => handlerOptionsSelection(pizzaId, '', item.id)}
        />
    })

    return (
        <div className="pizzas__item-options">
            <div className="pizzas__dough-box">
                {doughsJsx}
            </div>
            <div className="pizzas__size-box">
                {sizesJsx}
            </div>
        </div>
    );
}

export default PizzasItemOptions;