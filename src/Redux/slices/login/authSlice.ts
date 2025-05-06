import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
    email: string;
    password: string;
    errorMessage: string | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    email: '',
    password: '',
    errorMessage: null,
    isLoading: false,
};

//auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.isLoading = false;
                state.errorMessage = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload as string;
            });
    },
});

// Thunk Function for handling login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (loginData: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Invalid credentials');
            }

            const data = await response.json();
            return data; 
        } catch (error) {
            return rejectWithValue('Network error, please try again later.');
        }
    }
);



export const { setEmail, setPassword } = authSlice.actions;
export default authSlice.reducer;
