import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PageState {
  activePage: string | null;
}

const initialState: PageState = {
  activePage: null,
};

export const activePageSlice = createSlice({
  name: "activePage",
  initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<string>) => {
      state.activePage = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("page", action.payload);
      }
    },
    setInitialActivePage: (state, action: PayloadAction<string>) => {
      if (state.activePage === null) {
        state.activePage = action.payload;
      }
    },
  },
});

export const { setActivePage, setInitialActivePage } = activePageSlice.actions;
export default activePageSlice.reducer;
