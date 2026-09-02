// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import type { User, ShoppingList, ListItem } from "../../types/User";

// // ======================================================
// // ADD SHOPPING LIST DATA
// // ======================================================

// interface AddListData {
//   userId: string;
//   list: ShoppingList;
// }

// // ======================================================
// // DELETE SHOPPING LIST DATA
// // ======================================================

// interface DeleteListData {
//   userId: string;
//   listId: string;
// }

// // ⭐ CHANGED: DATA NEEDED TO ADD AN ITEM
// interface AddListItemData {
//   userId: string;
//   listId: string;
//   item: ListItem;
// }

// // ======================================================
// // SHOPPING LIST STATE
// // ======================================================

// interface ShoppingListState {
//   lists: ShoppingList[];
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: ShoppingListState = {
//   lists: [],
//   isLoading: false,
//   error: null,
// };

// // ======================================================
// // ADD SHOPPING LIST THUNK
// // ======================================================

// export const addShoppingList = createAsyncThunk<
//   User,
//   AddListData,
//   { rejectValue: string }
// >(
//   "shoppingList/add",

//   async ({ userId, list }, { rejectWithValue }) => {
//     try {
//       // Get the logged-in user
//       const response = await axios.get<User>(
//         `http://localhost:3000/users/${userId}`,
//       );

//       const user = response.data;

//       // Add the new list to that user's lists
//       const updatedUser: User = {
//         ...user,

//         lists: [...user.lists, list],
//       };

//       // Save the updated user
//       const updateResponse = await axios.put<User>(
//         `http://localhost:3000/users/${userId}`,
//         updatedUser,
//       );

//       return updateResponse.data;
//     } catch (error) {
//       console.error(error);

//       return rejectWithValue("Failed to create shopping list");
//     }
//   },
// );

// // ======================================================
// // GET SHOPPING LISTS THUNK
// // ======================================================

// export const getShoppingLists = createAsyncThunk<
//   User,
//   string,
//   { rejectValue: string }
// >(
//   "shoppingList/getAll",

//   async (userId, { rejectWithValue }) => {
//     try {
//       // Get the specific logged-in user
//       const response = await axios.get<User>(
//         `http://localhost:3000/users/${userId}`,
//       );

//       return response.data;
//     } catch (error) {
//       console.error(error);

//       return rejectWithValue("Failed to fetch shopping lists");
//     }
//   },
// );

// // ======================================================
// // DELETE SHOPPING LIST THUNK
// // ======================================================

// export const deleteShoppingList = createAsyncThunk<
//   User,
//   DeleteListData,
//   { rejectValue: string }
// >(
//   "shoppingList/delete",

//   async ({ userId, listId }, { rejectWithValue }) => {
//     try {
//       const response = await axios.get<User>(
//         `http://localhost:3000/users/${userId}`,
//       );

//       const user = response.data;

//       const updatedLists = user.lists.filter(
//         (list) => list.id !== listId,
//       );

//       const updatedUser: User = {
//         ...user,
//         lists: updatedLists,
//       };

//       const updateResponse = await axios.put<User>(
//         `http://localhost:3000/users/${userId}`,
//         updatedUser,
//       );

//       return updateResponse.data;
//     } catch (error) {
//       console.error(error);

//       return rejectWithValue("Failed to delete shopping list");
//     }
//   },
// );

// // ======================================================
// // ⭐ CHANGED: ADD ITEM TO SHOPPING LIST
// // ======================================================

// export const addListItem = createAsyncThunk<
//   User,
//   AddListItemData,
//   { rejectValue: string }
// >(
//   "shoppingList/addItem",

//   async (
//     { userId, listId, item },
//     { rejectWithValue },
//   ) => {
//     try {
//       // Get the logged-in user
//       const response = await axios.get<User>(
//         `http://localhost:3000/users/${userId}`,
//       );

//       const user = response.data;

//       // Find the specific shopping list
//       const updatedLists = user.lists.map((list) => {
//         if (list.id === listId) {
//           return {
//             ...list,

//             // ⭐ CHANGED: Add item to this list
//             items: [...(list.items || []), item],
//           };
//         }

//         return list;
//       });

//       // Create updated user
//       const updatedUser: User = {
//         ...user,
//         lists: updatedLists,
//       };

//       // Save to json-server
//       const updateResponse = await axios.put<User>(
//         `http://localhost:3000/users/${userId}`,
//         updatedUser,
//       );

//       return updateResponse.data;
//     } catch (error) {
//       console.error(error);

//       return rejectWithValue("Failed to add item");
//     }
//   },
// );

// // ======================================================
// // SHOPPING LIST SLICE
// // ======================================================

// const ShoppingListSlice = createSlice({
//   name: "shoppingList",

//   initialState,

//   reducers: {
//     clearLists(state) {
//       state.lists = [];
//     },
//   },

//   extraReducers: (builder) => {
//     // ==================================================
//     // GET SHOPPING LISTS
//     // ==================================================

//     builder
//       .addCase(getShoppingLists.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })

//       .addCase(getShoppingLists.fulfilled, (state, action) => {
//         state.isLoading = false;

//         state.lists = action.payload.lists;

//         state.error = null;
//       })

//       .addCase(getShoppingLists.rejected, (state, action) => {
//         state.isLoading = false;

//         state.error =
//           action.payload || "Failed to fetch shopping lists";
//       });

//     // ==================================================
//     // ADD SHOPPING LIST
//     // ==================================================

//     builder
//       .addCase(addShoppingList.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })

//       .addCase(addShoppingList.fulfilled, (state, action) => {
//         state.isLoading = false;

//         // API returns the updated user
//         state.lists = action.payload.lists;

//         state.error = null;
//       })

//       .addCase(addShoppingList.rejected, (state, action) => {
//         state.isLoading = false;

//         state.error =
//           action.payload || "Failed to create shopping list";
//       });

//     // ==================================================
//     // DELETE SHOPPING LIST
//     // ==================================================

//     builder
//       .addCase(deleteShoppingList.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })

//       .addCase(deleteShoppingList.fulfilled, (state, action) => {
//         state.isLoading = false;

//         // ⭐ CHANGED:
//         // Redux immediately receives the updated lists
//         state.lists = action.payload.lists;

//         state.error = null;
//       })

//       .addCase(deleteShoppingList.rejected, (state, action) => {
//         state.isLoading = false;

//         state.error =
//           action.payload || "Failed to delete shopping list";
//       });

//     // ==================================================
//     // ⭐ CHANGED: ADD ITEM
//     // ==================================================

//     builder
//       .addCase(addListItem.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })

//       .addCase(addListItem.fulfilled, (state, action) => {
//         state.isLoading = false;

//         // ⭐ CHANGED:
//         // Update Redux immediately after item is saved
//         state.lists = action.payload.lists;

//         state.error = null;
//       })

//       .addCase(addListItem.rejected, (state, action) => {
//         state.isLoading = false;

//         state.error =
//           action.payload || "Failed to add item";
//       });
//   },
// });

// // ======================================================
// // ACTIONS
// // ======================================================

// export const { clearLists } = ShoppingListSlice.actions;

// // ======================================================
// // REDUCER
// // ======================================================

// export default ShoppingListSlice.reducer;