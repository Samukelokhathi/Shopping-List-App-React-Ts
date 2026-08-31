// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import type { User, ShoppingList, ListItem } from "../../types/User";

// // DATA NEEDED TO ADD A SHOPPING LIST

// interface AddListData {
//     userId: string;
//     list: ShoppingList;
// }

// // DELETE LIST DATA

// interface DeleteListData {
//     userId: string;
//     listId: string;
// }

// // EDIT LIST DATA

// interface EditListData {
//     userId: string;
//     listId: string;
//     name: string;
//     note?: string;
// }

// // ADD ITEM DATA

// interface AddItemData {
//     userId: string;
//     listId: string;
//     item: ListItem;
// }

// // EDIT ITEM DATA

// interface EditItemData {
//     userId: string;
//     listId: string;
//     itemId: string;
//     updates: Partial<Omit<ListItem, "id">>;
// }

// // DELETE ITEM DATA

// interface DeleteItemData {
//     userId: string;
//     listId: string;
//     itemId: string;
// }

// // SHOPPING LIST STATE

// interface ShoppingListState {
//     lists: ShoppingList[];
//     isLoading: boolean;
//     error: string | null;
// }

// const initialState: ShoppingListState = {
//     lists: [],
//     isLoading: false,
//     error: null,
// };

// // ADD SHOPPING LIST THUNK

// export const addShoppingList = createAsyncThunk
// User,
//     AddListData,
//     { rejectValue: string }
//     > (
//         "shoppingList/add",

//         async ({ userId, list }, { rejectWithValue }) => {
//             try {
//                 // Get the logged-in user
//                 const response = await axios.get<User>(
//                     `http://localhost:3000/users/${userId}`,
//                 );

//                 const user = response.data;

//                 // Add the new list to that user's lists
//                 const updatedUser: User = {
//                     ...user,

//                     lists: [...user.lists, list],
//                 };

//                 // Save the updated user
//                 const updateResponse = await axios.put<User>(
//                     `http://localhost:3000/users/${userId}`,
//                     updatedUser,
//                 );

//                 return updateResponse.data;
//             } catch (error) {
//                 console.error(error);

//                 return rejectWithValue("Failed to create shopping list");
//             }
//         },
// );

// // GET SHOPPING LISTS THUNK

// export const getShoppingLists = createAsyncThunk
// User,
//     string,
//     { rejectValue: string }
//     > (
//         "shoppingList/getAll",

//         async (userId, { rejectWithValue }) => {
//             try {
//                 // Get the specific logged-in user
//                 const response = await axios.get<User>(
//                     `http://localhost:3000/users/${userId}`,
//                 );

//                 return response.data;
//             } catch (error) {
//                 console.error(error);

//                 return rejectWithValue("Failed to fetch shopping lists");
//             }
//         },
// );

// // DELETE SHOPPING LIST THUNK

// export const deleteShoppingList = createAsyncThunk
// User,
//     DeleteListData,
//     { rejectValue: string }
//     > ("shoppingList/delete", async ({ userId, listId }, { rejectWithValue }) => {
//         try {
//             const response = await axios.get<User>(
//                 `http://localhost:3000/users/${userId}`,
//             );
//             const user = response.data;

//             const updatedLists = user.lists.filter((list) => list.id !== listId);

//             const updatedUser: User = {
//                 ...user,
//                 lists: updatedLists,
//             };

//             const updateResponse = await axios.put<User>(
//                 `http://localhost:3000/users/${userId}`,
//                 updatedUser,
//             );
//             return updateResponse.data;
//         } catch (error) {
//             console.error(error);
//             return rejectWithValue("Failed to delete shopping list");
//         }
//     });

// // EDIT SHOPPING LIST THUNK

// export const editShoppingList = createAsyncThunk
// User,
//     EditListData,
//     { rejectValue: string }
//     > (
//         "shoppingList/edit",

//         async ({ userId, listId, name, note }, { rejectWithValue }) => {
//             try {
//                 const response = await axios.get<User>(
//                     `http://localhost:3000/users/${userId}`,
//                 );

//                 const user = response.data;

//                 // Update only the matching list, leave the rest untouched
//                 const updatedLists = user.lists.map((list) =>
//                     list.id === listId ? { ...list, name, note } : list,
//                 );

//                 const updatedUser: User = {
//                     ...user,
//                     lists: updatedLists,
//                 };

//                 const updateResponse = await axios.put<User>(
//                     `http://localhost:3000/users/${userId}`,
//                     updatedUser,
//                 );

//                 return updateResponse.data;
//             } catch (error) {
//                 console.error(error);

//                 return rejectWithValue("Failed to edit shopping list");
//             }
//         },
// );

// // ADD ITEM TO LIST THUNK

// export const addItemToList = createAsyncThunk
// User,
//     AddItemData,
//     { rejectValue: string }
//     > (
//         "shoppingList/addItem",

//         async ({ userId, listId, item }, { rejectWithValue }) => {
//             try {
//                 const response = await axios.get<User>(
//                     `http://localhost:3000/users/${userId}`,
//                 );

//                 const user = response.data;

//                 // Push the new item into the matching list's items array
//                 const updatedLists = user.lists.map((list) =>
//                     list.id === listId
//                         ? { ...list, items: [...(list.items || []), item] }
//                         : list,
//                 );

//                 const updatedUser: User = {
//                     ...user,
//                     lists: updatedLists,
//                 };

//                 const updateResponse = await axios.put<User>(
//                     `http://localhost:3000/users/${userId}`,
//                     updatedUser,
//                 );

//                 return updateResponse.data;
//             } catch (error) {
//                 console.error(error);

//                 return rejectWithValue("Failed to add item");
//             }
//         },
// );

// // EDIT ITEM IN LIST THUNK
// // Used for both editing an item's details and toggling "completed"

// export const editItemInList = createAsyncThunk
// User,
//     EditItemData,
//     { rejectValue: string }
//     > (
//         "shoppingList/editItem",

//         async ({ userId, listId, itemId, updates }, { rejectWithValue }) => {
//             try {
//                 const response = await axios.get<User>(
//                     `http://localhost:3000/users/${userId}`,
//                 );

//                 const user = response.data;

//                 const updatedLists = user.lists.map((list) => {
//                     if (list.id !== listId) return list;

//                     const updatedItems = (list.items || []).map((item) =>
//                         item.id === itemId ? { ...item, ...updates } : item,
//                     );

//                     return { ...list, items: updatedItems };
//                 });

//                 const updatedUser: User = {
//                     ...user,
//                     lists: updatedLists,
//                 };

//                 const updateResponse = await axios.put<User>(
//                     `http://localhost:3000/users/${userId}`,
//                     updatedUser,
//                 );

//                 return updateResponse.data;
//             } catch (error) {
//                 console.error(error);

//                 return rejectWithValue("Failed to update item");
//             }
//         },
// );

// // DELETE ITEM FROM LIST THUNK

// export const deleteItemFromList = createAsyncThunk
// User,
//     DeleteItemData,
//     { rejectValue: string }
//     > (
//         "shoppingList/deleteItem",

//         async ({ userId, listId, itemId }, { rejectWithValue }) => {
//             try {
//                 const response = await axios.get<User>(
//                     `http://localhost:3000/users/${userId}`,
//                 );

//                 const user = response.data;

//                 const updatedLists = user.lists.map((list) => {
//                     if (list.id !== listId) return list;

//                     const updatedItems = (list.items || []).filter(
//                         (item) => item.id !== itemId,
//                     );

//                     return { ...list, items: updatedItems };
//                 });

//                 const updatedUser: User = {
//                     ...user,
//                     lists: updatedLists,
//                 };

//                 const updateResponse = await axios.put<User>(
//                     `http://localhost:3000/users/${userId}`,
//                     updatedUser,
//                 );

//                 return updateResponse.data;
//             } catch (error) {
//                 console.error(error);

//                 return rejectWithValue("Failed to delete item");
//             }
//         },
// );

// // SHOPPING LIST SLICE

// const ShoppingListSlice = createSlice({
//     name: "shoppingList",

//     initialState,

//     reducers: {
//         clearLists(state) {
//             state.lists = [];
//         },
//     },

//     // GetShoppingLists
//     extraReducers: (builder) => {
//         builder
//             .addCase(getShoppingLists.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(getShoppingLists.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.lists = action.payload.lists;
//                 state.error = null;
//             })
//             .addCase(getShoppingLists.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload || "Failed to fetch shopping lists";
//             });

//         // ADD SHOPPING LIST
//         builder
//             .addCase(addShoppingList.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(addShoppingList.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 // The API returns the updated user.
//                 // Get the updated lists from that user.
//                 state.lists = action.payload.lists;
//                 state.error = null;
//             })
//             .addCase(addShoppingList.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload || "Failed to create shopping list";
//             });

//         // DELETE SHOPPING LIST
//         builder
//             .addCase(deleteShoppingList.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(deleteShoppingList.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.lists = action.payload.lists;
//                 state.error = null;
//             })
//             .addCase(deleteShoppingList.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload || "Failed to delete shopping list";
//             });

//         // EDIT SHOPPING LIST
//         builder
//             .addCase(editShoppingList.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(editShoppingList.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.lists = action.payload.lists;
//                 state.error = null;
//             })
//             .addCase(editShoppingList.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload || "Failed to edit shopping list";
//             });

//         // ADD ITEM TO LIST
//         builder
//             .addCase(addItemToList.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(addItemToList.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.lists = action.payload.lists;
//                 state.error = null;
//             })
//             .addCase(addItemToList.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload || "Failed to add item";
//             });

//         // EDIT ITEM IN LIST
//         builder
//             .addCase(editItemInList.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(editItemInList.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.lists = action.payload.lists;
//                 state.error = null;
//             })
//             .addCase(editItemInList.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload || "Failed to update item";
//             });

//         // DELETE ITEM FROM LIST
//         builder
//             .addCase(deleteItemFromList.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(deleteItemFromList.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.lists = action.payload.lists;
//                 state.error = null;
//             })
//             .addCase(deleteItemFromList.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload || "Failed to delete item";
//             });
//     },
// });

// export const { clearLists } = ShoppingListSlice.actions;

// export default ShoppingListSlice.reducer;