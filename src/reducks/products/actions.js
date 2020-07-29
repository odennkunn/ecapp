export const FETCH_PRODUCTS = "FETCH_PRODUCTS";  //タイプの宣言
export const fetchProductsAction = (products) => {
  return {
    type: "FETCH_PRODUCTS",
    payload: products
  }
};

export const DELETE_PRODUCT = "DELETE_PRODUCT";  //タイプの宣言
export const deleteProductAction = (products) => {
  return {
    type: "DELETE_PRODUCT",
    payload: products
  }
};