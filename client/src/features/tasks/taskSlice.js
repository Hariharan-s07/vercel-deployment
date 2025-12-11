import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
    tasks: [],
    task: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    page: 1,
    pages: 1,
    total: 0
};

// Get user tasks
export const getTasks = createAsyncThunk(
    'tasks/getAll',
    async (page = 1, thunkAPI) => {
        try {
            // Assuming API returns { tasks, page, pages, total }
            const response = await api.get(`/tasks?page=${page}`);
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Create new task
export const createTask = createAsyncThunk(
    'tasks/create',
    async (taskData, thunkAPI) => {
        try {
            const response = await api.post('/tasks', taskData);
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update task
export const updateTask = createAsyncThunk(
    'tasks/update',
    async ({ id, taskData }, thunkAPI) => {
        try {
            const response = await api.put(`/tasks/${id}`, taskData);
            return response.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete task
export const deleteTask = createAsyncThunk(
    'tasks/delete',
    async (id, thunkAPI) => {
        try {
            await api.delete(`/tasks/${id}`);
            return id;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tasks = action.payload.tasks;
                state.page = action.payload.page;
                state.pages = action.payload.pages;
                state.total = action.payload.total;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tasks.unshift(action.payload); // Add to beginning
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.tasks.findIndex((task) => task._id === action.payload._id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tasks = state.tasks.filter((task) => task._id !== action.payload);
            });
    },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
