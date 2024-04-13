import { createSlice } from "@reduxjs/toolkit";
import { foods } from "../delivery-components/foods-image/foodsData";
export const initialState = {
  openMenu: false,
  openLang: false,
  openDate: false,
  openPersonal: false,
  selectCategory: false,
  selectCategoryItem: {},
  activeCatgory: foods[0],
  totalPrice: "",
  items: [],
  foods: foods,
  sendOrder: false,
  deleteFood: false,
  exitUser: false,
};

export const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    OpenDeliveryMenu: (state, action) => {
      if (action.payload) {
        state.openMenu = action.payload;
      } else {
        state.openMenu = !state.openMenu;
      }
    },
    OpenLangMenu: (state, action) => {
      if (action.payload) {
        state.openLang = action.payload;
      } else state.openLang = !state.openLang;
    },
    SelectCategoryModal: (state, action) => {
      state.selectCategory = !state.selectCategory;
      state.selectCategoryItem = action.payload;
    },
    SelectCategoryActive: (state, action) => {
      const foodId = action.payload.food_id - 1;
      state.activeCatgory = state.foods[foodId];
      state.selectCategory = false;
    },
    AddProductItem: (state, action) => {
      const [foodId, categoryId] = action.payload;

      const categoryIndex = state.foods.findIndex(
        (food) => food.food_id === categoryId
      );

      if (categoryIndex !== -1) {
        const category = state.foods[categoryIndex];
        const findItemIndex = category.props.findIndex(
          (item) => item.id === foodId
        );
        if (findItemIndex !== -1) {
          // If item exists, increment its quantity
          const updatedFoods = state.foods.map((food, index) => {
            if (index === categoryIndex) {
              const updatedProps = food.props.map((item, itemIndex) => {
                if (itemIndex === findItemIndex) {
                  const newProps = {
                    ...item,
                    quantity: item.quantity + 1,
                  };
                  state.items.push({ ...newProps, categoryId: categoryId });
                  calculateTotalPrice(state);
                  return newProps;
                }
                return item;
              });
              state.activeCatgory = {
                ...state.activeCatgory,
                props: updatedProps,
              };
              return {
                ...food,
                props: updatedProps,
              };
            }
            return food;
          });
          state.foods = updatedFoods;
        } else {
          const newItem = {
            id: foodId,
            quantity: 1,
          };
          state.items.push(newItem); // Add the new item to the items state

          const updatedFoods = state.foods.map((food, index) => {
            if (index === categoryIndex) {
              state.activeCatgory = {
                ...state.activeCatgory,
                props: newItem,
              };
              return {
                ...food,
                props: [...food.props, newItem],
              };
            }
            return food;
          });

          state.foods = updatedFoods;
        }
      }
      return state;
    },
    MinusProductItem: (state, action) => {
      const [foodId, categoryId] = action.payload;
      const categoryIndex = state.foods.findIndex(
        (food) => food.food_id === categoryId
      );
      if (categoryIndex !== -1) {
        const category = state.foods[categoryIndex];
        const findItemIndex = category.props.findIndex(
          (item) => item.id === foodId
        );
        if (findItemIndex !== -1) {
          const updatedFoods = state.foods.map((food, index) => {
            if (index === categoryIndex) {
              const updatedProps = food.props.map((item, itemIndex) => {
                if (itemIndex === findItemIndex) {
                  const updatedItem = {
                    ...item,
                    quantity: item.quantity - 1,
                  };
                  if (updatedItem.quantity === 0) {
                    // Remove the item from the items state
                    state.items = state.items.filter(
                      (item) =>
                        !(item.id === foodId && item.categoryId === categoryId)
                    );
                    calculateTotalPrice(state);
                  }
                  return updatedItem;
                }
                return item;
              });
              state.activeCatgory = {
                ...state.activeCatgory,
                props: updatedProps,
              };
              return {
                ...food,
                props: updatedProps,
              };
            }
            return food;
          });
          state.foods = updatedFoods;
        }
      }
      return state;
    },

    SendOrderItem: (state, action) => {
      state.sendOrder = action.payload;
    },
    DeleteFoodItem: (state, action) => {
      state.deleteFood = action.payload;
    },
    ExitUserModal: (state, action) => {
      state.exitUser = action.payload;
    },
    OpenAwayDate: (state, action) => {
      state.openDate = action.payload;
    },
    openPersonalModal: (state, action) => {
      state.openPersonal = action.payload;
    },
    ClearBasket:(state, action) => {
      state.items = [];
      state.totalPrice = 0;
      state.foods=foods
    }
  },
});

export const {
  SelectCategoryActive,
  OpenDeliveryMenu,
  OpenLangMenu,
  SelectCategoryModal,
  AddProductItem,
  MinusProductItem,
  SendOrderItem,
  DeleteFoodItem,
  ExitUserModal,
  OpenAwayDate,
  openPersonalModal,
  ClearBasket
} = deliverySlice.actions;
export default deliverySlice.reducer;

function calculateTotalPrice(state) {
  let totalPrice = 0;
  state.items.forEach((item) => {
    totalPrice += item.quantity * item.price; // Assuming each item has a "price" property
  });
  state.totalPrice = totalPrice.toFixed(2); // Round to 2 decimal places
}
