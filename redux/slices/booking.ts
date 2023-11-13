import { IApartmentContract } from "@/utils/interface";
import { createSlice } from "@reduxjs/toolkit";

interface ISetBooking {
  start_date: Date;
  end_date: Date;
}

interface IInitstates extends ISetBooking {
  dates: IApartmentContract[];
}

const initialState: IInitstates = {
  start_date: new Date(),
  end_date: new Date(),
  dates: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialState,
  reducers: {
    setDates: (
      state,
      action: {
        type: string;
        payload: IApartmentContract;
      }
    ) => {
      state.dates = [...state.dates, {...action.payload}];
      state.end_date = new Date();
      state.start_date = new Date();
    },

    setDateBooking: (
      state,
      action: {
        type: string;
        payload: ISetBooking;
      }
    ) => {
      state.start_date = action.payload.start_date;
      state.end_date = action.payload.end_date;
    },

    removeDate: (state) => {
      state.start_date = initialState.start_date;
      state.end_date = initialState.end_date;
    },
  },
});

export const { setDateBooking, removeDate, setDates } = bookingSlice.actions;
export default bookingSlice.reducer;
