import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Instead of storing in array, store it in map {key(taskId): {id,name,description}}
  /**
   * This makes easy to edit and delete tasks {1 : {id:1,name:"Task 1",description:"Task}}
   */
  data: [],

  dataMap: {},
};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    addUser: (state, action) => {
      //   let userId = state.data.length + 1;

      // Id should be passed from page
      // action.payload => action.paylod.taskDetails
      //   let newUser = { id: userId, ...action.payload };
      //   state.data.push(newUser);

      const taskData = action.payload.taskData;
      const { id = "" } = taskData;
      state.dataMap[id] = taskData;
    },
    deleteUser: (state, action) => {
      //   let index = state.data.findIndex((user) => user.id === action.payload);
      //   state.data.splice(index, 1);

      const taskId = action.payload.taskId;
      delete state.dataMap[taskId];
    },
    updateUser: (state, action) => {
      //   let index = state.data.findIndex((user) => user.id === action.payload.id);
      //   state.data[index] = action.payload;

      const taskData = action.payload.taskData;
      const { id = "" } = taskData;

      state.dataMap[id] = taskData;
    },
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
