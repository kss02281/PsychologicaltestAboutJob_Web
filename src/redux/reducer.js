import produce from "immer";

const initState = {
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

const Reducer = (state = initState, action) => {
    switch(action.type){
        case "REGISTER_USER":
            return {
                ...state,
                name: action.name,
                gender: action.gender
            }
        case "SET_QUESTION":
            return{
                ...state,
                question: action.question
            }
        case "SET_TOTAL_NUMBER":
            return{
                ...state,
                questionTotalNumber: action.questionTotalNumber
            }
        case "ADD_QUESTION_SCORE":
            return produce(state, (draft) => {
                if(draft.questionScoreList)
                {
                    draft.questionScoreList = [...draft.questionScoreList,{
                        id: action.questionNumber,
                        questionScore: action.questionScore
                    }]
                }   
            })
        case "SET_SCORE_STRING":
            return{
                ...state,
                scoreString: action.scoreString
            }
        case "SET_GENDER_NUMBER":
            return{
                ...state,
                genderNumber: action.genderNumber
            }
        case "SET_WON_LIST":
            return{
                ...state,
                wonScoreList: action.wonScoreList
            }
        case "SET_HIGH_SCORE":
            return{
                ...state,
                no1: action.no1,
                no2: action.no2
            }
        case "SET_JOB_ARRAY":
            return{
                ...state,
                jobAgeList: action.jobAgeList,
                jobMajorList: action.jobMajorList
            }
        case "RESET_VALUES":
            return{
                ...state,
                questionScoreList: []
            }
        default:
            return state;
    }
}

export default Reducer;