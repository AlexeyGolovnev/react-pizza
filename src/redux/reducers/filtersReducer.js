import {
  CHANGE_CATEGORY, CHANGE_SORT_CRITERION, GET_CATEGORIES, GET_SORT_CRITERIA
} from '../actionTypes';

const initialState = {
  categories: [],
  sortCriteria: [],
  currentCategory: 0,
  currentSortCriterion: 1
};

export const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES: {
      const categories = action.categories.map(category => {
        return {
          id: +category.id,
          ...category.data()
        };
      });
      return {
        ...state,
        categories: categories
      };
    }
    case GET_SORT_CRITERIA: {
      const sortCriteria = action.sortCriteria.map(criterion => {
        return {
          id: +criterion.id,
          ...criterion.data()
        };
      });
      return {
        ...state,
        sortCriteria: sortCriteria
      };
    }
    case CHANGE_CATEGORY: {
      return {
        ...state,
        currentCategory: action.categoryId
      };
    }
    case CHANGE_SORT_CRITERION: {
      return {
        ...state,
        currentSortCriterion: action.sortCriterionId
      };
    }
    default:
      return state;
  }
};
