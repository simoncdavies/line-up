import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// http request to get ticket information
export const fetchTickets = createAsyncThunk<string[], { performanceID: number }, { rejectValue: string }>(
  'fetchTickets',
  async (params, thunkAPI) => {
    try {
      const { performanceID } = params;
      const endpoint: string = `${process.env.REACT_APP_API_ENDPOINT}performance/${performanceID}/`;
      const token: string = `Bearer ${process.env.REACT_APP_API_TOKEN}`;
      // response needs to be defined more clearly, based on `tickets` in TicketState type below
      const response = await axios.get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });
      // needs error checking to make sure objects exist
      return [response.data.data.pricing];
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch performance information");
    }
  }
);

// ideally the `tickets` type needs to be flushed out more, probably created of multiple other types created for `variants` and `adjustments` etc.
type TicketsState = {
  tickets: {}[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketsState = {
  tickets: [],
  loading: false,
  error: null,
};

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});
export default ticketsSlice.reducer;
