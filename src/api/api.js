import { firebaseDb } from '../firebase';

export const getPizzasFromFirebase = (collection, categoryId, sortCriterion) => {
  const category = getCategoryFromFirebase(categoryId);
  return firebaseDb.collection(collection)
    .where('category', 'array-contains', category)
    .orderBy(sortCriterion.nameField, sortCriterion.nameField !== 'rating' ? 'asc' : 'desc')
    .get();
};
export const getCategoryFromFirebase = (categoryId) => {
  return firebaseDb.collection('categories').doc(categoryId.toString());
};

export const getCollectionFromFirebase = (collection) => {
  return firebaseDb.collection(collection).get();
};
