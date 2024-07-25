import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface DataState {
  slackMessages: any[];
  jiraIssues: any[];
  combinedData: {
    slackMessages: any[];
    jiraIssues: any[];
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DataState = {
  slackMessages: [],
  jiraIssues: [],
  combinedData: {
    slackMessages: [],
    jiraIssues: [],
  },
  status: 'idle',
  error: null,
};

const BASE_URL = process.env.REACT_APP_BASE_URL;
const SLACK_ENDPOINT = process.env.REACT_APP_SLACK_ENDPOINT;
const JIRA_ENDPOINT = process.env.REACT_APP_JIRA_ENDPOINT;
const COMBINED_DATA = process.env.REACT_APP_COMBINED_DATA;


export const fetchSlackMessages = createAsyncThunk(
  'data/fetchSlackMessages',
  async () => {
    const response = await axios.get(SLACK_ENDPOINT || `${BASE_URL}/slack`);
    return response.data;
  }
);

export const fetchJiraIssues = createAsyncThunk(
  'data/fetchJiraIssues',
  async () => {
    const response = await axios.get(JIRA_ENDPOINT || `${BASE_URL}/jira?projectKey=BES`);
    return response.data;
  }
);

export const fetchCombinedData = createAsyncThunk(
  'data/fetchCombinedData',
  async () => {
    const response = await axios.get(COMBINED_DATA || `${BASE_URL}/combined`);
    return response.data as { slackMessages: any[]; jiraIssues: any[] };
  }
);



const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlackMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSlackMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.slackMessages = action.payload;
      })
      .addCase(fetchSlackMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchJiraIssues.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJiraIssues.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jiraIssues = action.payload;
      })
      .addCase(fetchJiraIssues.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchCombinedData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCombinedData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.combinedData = action.payload;
      })
      .addCase(fetchCombinedData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default dataSlice.reducer;
