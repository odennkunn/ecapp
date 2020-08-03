//初期のstateを全て記述,reducerに渡すためのもの
const initialState = {
  products: {
    list: []
  },
  users: {
    isSignedIn: false,
    uid: "",
    username: "",
    role: "",
    cart: [],
    orders: [],
    likes: []
  }
};

export default initialState