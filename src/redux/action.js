export const registerUser = (name, gender) => ({
    type: "REGISTER_USER",
    name,
    gender
})

export const setQuestion = (question) => ({
    type: "SET_QUESTION",
    question
})

export const setTotalNumber = (questionTotalNumber) => ({
    type: "SET_TOTAL_NUMBER",
    questionTotalNumber
})

export const addQuestionScore = (questionNumber, questionScore) => ({
    type: "ADD_QUESTION_SCORE",
    questionNumber,
    questionScore
})

export const setScoreString = (scoreString) => ({
    type: "SET_SCORE_STRING",
    scoreString
})

export const setGenderNumber = (genderNumber) => ({
    type: 'SET_GENDER_NUMBER',
    genderNumber
})

export const setWonScoreList = (wonScoreList) => ({
    type: "SET_WON_LIST",
    wonScoreList
})

export const setHighScore = (no1, no2) => ({
    type: "SET_HIGH_SCORE",
    no1,
    no2
})

export const setJobList = (jobAgeList, jobMajorList) => ({
    type: 'SET_JOB_ARRAY',
    jobAgeList,
    jobMajorList

})

export const resetValues = () => ({
    type: 'RESET_VALUES'
})