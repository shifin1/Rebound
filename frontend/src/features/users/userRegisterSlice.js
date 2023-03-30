import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  loading: false,
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  error: null,
}

export const register = createAsyncThunk(
  "userRegister/register",
  async (obj) => {
    try {
      const response = await axios.post("/api/users/register", obj, {
        headers: { "Content-Type": "application/json" },
      })
      localStorage.setItem("userInfo", JSON.stringify(response.data))
      return response.data
    } catch (error) {
      return error.response.data.message
    }
  }
)

export const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false
      state.userInfo = action.payload
      state.error = ""
    })
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false
      state.userInfo = null
      state.error = action.error.message
    })
  },
})

export default userRegisterSlice.reducer
