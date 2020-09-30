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
      return {
        ...state,
        categories: action.categories
      };
    }
    case GET_SORT_CRITERIA: {
      return {
        ...state,
        sortCriteria: action.sortCriteria
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
