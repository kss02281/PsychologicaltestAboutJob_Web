import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    gender: '',
    question: [],
    questionTotalNumber: 0,
    questionScoreList: [],
    scoreString: '',
    genderNumber: 0,
    wonScoreList: [],
    no1: 0,
    no2: 0,
    jobAgeList: [],
    jobMajorList: []
}
// root/registerUser

const psyTestSlice = createSlice({
    name : 'root',
    initialState : initialState,
    reducers : {
        registerUser(state, action){
            const { name, gender } = action.payload;
            state.name = name;
            state.gender = gender;
        },
        setQuestion(state, action){
            state.question = action.payload;
        },
        setTotalNumber(state, action){
            state.questionTotalNumber = action.payload;
        },
        addQuestionScore(state, action){
            const { id, score, description } = action.payload;
            state.questionScoreList = [...state.questionScoreList.filter((item) => item.id !== id), {id, score, description}]
        },
        setScoreString(state, action){
            state.scoreString = action.payload;
        },
        setGenderNumber(state, action){
            state.genderNumber = action.payload;
        },
        setWonScoreList(state, action){
            state.wonScoreList = action.payload;
        },
        setHighScore(state, action){
            const { no1, no2 } = action.payload;
            state.no1 = no1;
            state.no2 = no2;
        },
        setJobList(state, action){
            const { jobAgeList, jobMajorList} = action.payload;
            state.jobAgeList = jobAgeList;
            state.jobMajorList = jobMajorList;
        },
        resetValues(){
            return initialState;
        }
    }
})

const getScoreList = (state) => state.questionScoreList;
const scoreStringCheck = (state) => state.scoreString;
const getName = (state) => state.name;
const getGender = (state) => state.gender;
const genderNumber = (state) => state.genderNumber;

const getJobAge = (state) => state.jobAgeList;
const getJobMajor = (state) => state.jobMajorList;

const getJobByType = createSelector([getJobAge, getJobMajor], (jobAge, jobMajor) => ({
    jobAge, jobMajor
}));

const questions = (state) => state.question;
const questionTotalNumber = (state) => state.questionTotalNumber;

export const selector={ getScoreList, scoreStringCheck, getName, getGender, genderNumber, getJobByType, questions, questionTotalNumber };
export const actions=psyTestSlice.actions;
export default psyTestSlice.reducer;