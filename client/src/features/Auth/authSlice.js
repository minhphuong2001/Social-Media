import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {LOCAL_STORAGE_TOKEN_NAME} from '../../constants/global'
import setAuthToken from '../../until/setAuthToken'
import authApi from '../../api/authApi'

export const getUser = createAsyncThunk('auth/getUser', async (params, thunkAPI) => {
    const token = localStorage[LOCAL_STORAGE_TOKEN_NAME];

    if (token) 
        setAuthToken(token);
    
    const authData = await authApi.confirm();
    console.log({ authData });

    if (authData.success) {
        thunkAPI.dispatch(authToken({ user: authData.user, isAuthenticated: true }));
    } else {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        setAuthToken(null);
        thunkAPI.dispatch(authToken({ user: null, isAuthenticated: false }));
    }

    return authData;
        
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        authLoading: true,
        isAuthenticated: false
    },
    reducers: {
        login: (state, action) => {
            state = {
                user: action.payload,
                authLoading: false,
                isAuthenticated: true
            }
        },
        authToken: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.isAuthenticated;
        },
    },
    extraReducers: {
        [getUser.pending]: (state) => {
            state.authLoading = true;
        },
        [getUser.rejected]: (state) => {
            state.authLoading = false;
            state.isAuthenticated = false;
        },
        [getUser.fulfilled]: (state) => {
            state.authLoading = false;
        }
    }
})

const { reducer, actions } = authSlice;

export const { login, authToken } = actions;
export default reducer;