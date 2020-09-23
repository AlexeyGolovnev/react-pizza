import React, {useEffect} from 'react';
import SortPopup from "./SortPopup/SortPopup";
import Categories from "./Categories/Categories";
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getSortCriteria} from "../../redux/action";

function Navigation() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getSortCriteria())
    },[])

    const categories = useSelector(state => state.pizzas.categories);
    const currentCategory = useSelector(state => state.pizzas.currentCategory);
    const currentSortCriterion = useSelector(state => state.pizzas.currentSortCriterion);
    const sortCriteria = useSelector(state => state.pizzas.sortCriteria);

    return (
        <div className='navigation'>
            <div className="container">
                <div className="navigation__inner">
                    <Categories
                        dispatch = {dispatch}
                        categories = {categories}
                        currentCategory = {currentCategory}
                    />
                    <SortPopup
                        dispatch ={dispatch}
                        sortCriteria = {sortCriteria}
                        currentSortCriterion = {currentSortCriterion}
                    />
                </div>
            </div>
        </div>
    );
}

export default Navigation;