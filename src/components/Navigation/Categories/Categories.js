import React from 'react';
import CategoryItem from "./CategoryItem";
import {changeCategory, clearSelectedOptions} from "../../../redux/action";

function Categories({dispatch, categories, currentCategory}) {

    const selectCategory = categoryId => {
        if(currentCategory !== categoryId) {
            dispatch(changeCategory(categoryId));
            dispatch(clearSelectedOptions());
        }

    }


    const categoriesJsx = categories.map( category => {
        return <CategoryItem
            key = {category.id}
            classes ={currentCategory === category.id && 'current'}
            name = {category.name}
            selectCategory = {() => selectCategory(category.id)}
            currentCategory ={currentCategory}

        />
    })
    return (
        <div className='categories'>
            {categoriesJsx}
        </div>
    );
}

export default Categories;