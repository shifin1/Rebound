import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  loading: false,
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  error: "",
}

export const login = createAsyncThunk("userLogin/login", async (obj) => {
  const response = await axios.post("/api/users/login", obj, {
    headers: { "Content-Type": "application/json" },
  })
  localStorage.setItem("userInfo", JSON.stringify(response.data))
  return response.data
})

export const logout = createAsyncThunk("userLogin/logout", async () => {
  localStorage.removeItem("userInfo")
})

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false
      state.userInfo = action.payload
      state.error = ""
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false
      state.userInfo = null
      state.error = "Unable to login, Check the credentials"
    })
    builder.addCase(logout.pending, (state) => {
      state.loading = true
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false
      state.userInfo = null
    })
    builder.addCase(logout.rejected, (state) => {
      state.loading = false
      state.error = "error in logout"
    })
  },
})

export default userLoginSlice.reducer
