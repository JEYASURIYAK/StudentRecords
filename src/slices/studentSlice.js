import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    records : [],
    selectedStudent : {},
    isLoading: false,
    error : ''
};

const BASE_URL = "http://localhost:8000/records"

//GET Thunk Action creater

export const getRecordsFromServer  = createAsyncThunk(
    "records/getRecordsFromServer",
    async (_,{rejectWithValue}) => {
        const response = await fetch(BASE_URL)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }
        else{
            return rejectWithValue({error : 'No Records Found'})
        }
    }
)


//POST Thunk Action creater

export const addRecordToServer  = createAsyncThunk(
    "records/addRecordToServer",
    async (record,{rejectWithValue}) => {
        const Options ={
            method : 'POST',
            body : JSON.stringify(record),
            headers : {
                "Content-type" : "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(BASE_URL,Options)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }
        else{
            return rejectWithValue({error : 'Task Not Added'})
        }
    }
)

//PATCH Thunk Action creater

export const updateRecordInServer  = createAsyncThunk(
    "records/updateRecordInServer",
    async (record,{rejectWithValue}) => {
        const Options ={
            method : 'PATCH',
            body : JSON.stringify(record),
            headers : {
                "Content-type" : "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(BASE_URL + '/' + record.id,Options)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }
        else{
            return rejectWithValue({error : `Task Can't Add`})
        }
    }
)
//DELETE Thunk Action creater

export const deleteRecordFromServer  = createAsyncThunk(
    "records/deleteRecordFromServer",
    async (record,{rejectWithValue}) => {
        const Options ={
            method : 'DELETE',
            body : JSON.stringify(record),
            headers : {
                "Content-type" : "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(BASE_URL + '/' + record.id,Options)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        }
        else{
            return rejectWithValue({error : `Task Can't Delete`})
        }
    }
)


const studentSlice = createSlice({
    name:"student",
    initialState,
    reducers:{
        addStudent(state,action) {
            state.records.push(action.payload)
        },
        removeStudent(state,action){
            const deleteIndex = action.payload;
            state.records =  state.records.filter( (task) => task !== deleteIndex )
        },
        updateStudent(state,action){
            state.records = state.records.map( (task) => task.index === action.payload.index ? action.payload : task  )
        },
        setselectedStudent(state,action){
            state.selectedStudent = action.payload;
        }
    },
    extraReducers:(builder) =>{
        builder
            .addCase(getRecordsFromServer.pending,(state) => {
                state.isLoading =  true
            })
            .addCase(getRecordsFromServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.records = action.payload
            })
            .addCase(getRecordsFromServer.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
                state.records = []
            })
            .addCase(addRecordToServer.pending,(state) => {
                state.isLoading =  true
            })
            .addCase(addRecordToServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.records.push(action.payload)
            })
            .addCase(addRecordToServer.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
            })
            .addCase(updateRecordInServer.pending,(state) => {
                state.isLoading =  true
            })
            .addCase(updateRecordInServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.records = state.records.map((task) => task.id === action.payload.id ? action.payload : task)
            })
            .addCase(updateRecordInServer.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
            })
            .addCase(deleteRecordFromServer.pending,(state) => {
                state.isLoading =  true
            })
            .addCase(deleteRecordFromServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                
            })
            .addCase(deleteRecordFromServer.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
            })
    }

})

export const { addStudent, removeStudent, updateStudent, setselectedStudent } = studentSlice.actions;

export default studentSlice.reducer;