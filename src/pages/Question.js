import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestionScore, setScoreString, setGenderNumber } from '../redux/action';
import styled, {css} from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ProgressBar } from 'react-bootstrap'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import QuestionForm from "../components/QuestionForm";
import { useHistory } from "react-router-dom";


function QuestionList() {
  const dispatch = useDispatch();
  const history = useHistory();

  const questions = useSelector(state => state.question);
  const questionTotalNumber = useSelector(state => state.questionTotalNumber);
  const getScoreList = useSelector(state => state.questionScoreList);
  const pageCount = Math.ceil(questionTotalNumber/5);

  const [selectQuestion, setSelectQuestion] = useState(questions.slice(0, 5));
  const [currPage, setCurrPage] = useState(0);
  const [score, setScore] = useState(0);
  const [itemNumber, setItemNumber] = useState(1);
  const [percentage, setPercentage] = useState(0);

  useEffect(()=>{
    setSelectQuestion(questions.slice(currPage*5, (currPage+1)*5));
  },[ selectQuestion, currPage])

  const handleClickLeftArrow = ()=>{
    setCurrPage(currPage - 1);
  }

  const handleClickRightArrow = ()=>{
    setCurrPage(currPage + 1);
  }
  const handleClickCompleteButton = () => {
    console.log('검사 완료');
    console.log('최종 선택지 결과',getScoreList);
    history.push('./resultWait');
  }

  const displayScore = (newScore) => {
    setScore({...score, ...newScore});
    console.log('displayScore');
  }

  useEffect(() => {
    console.log('Change score')
    console.log(score);
    setItemNumber(score.id);
    if (score) {
      dispatch(addQuestionScore(score.id,score.score));
    }
    
  }, [score])

  useEffect(() => {
    if(score){
      setPercentage(Math.ceil((getScoreList.length/questionTotalNumber)*100));
      console.log(getScoreList);
    }
    console.log('다음 질문으로 넘어갔습니다.');
  }, [ itemNumber ])



  return (
    <>
      <Title>검사진행</Title>
      <ProgressBar animated now={`${percentage}`} label={`${percentage}%`} style={{maxWidth: "40rem", display: 'flex', alignItems: 'center', justifyContent: 'start', marginLeft: 'auto', marginRight: 'auto'}}/>
      
      <Container>
        {
        selectQuestion.map((question, idx) => (
        <> 
          <QuestionForm 
          key={idx}
          commonQuestion={question.question}
          questionItemNumber={question.qitemNo}
          question01={question.answer01}
          question02={question.answer02}
          firstQuestionState={question.answer03}
          secondQuestionState={question.answer04}
          answerScore01={question.answerScore01}
          answerScore02={question.answerScore02}
          currPage={currPage}
          onButtonClick={displayScore}
          />
      </>
      ))
      }
    </Container>
    <Wrapper>  
      <ArrowWrapper 
        onClick={handleClickLeftArrow}
        disabled={currPage <= 0}>
        <FaArrowAltCircleLeft />
      </ArrowWrapper>
      <Button
        onClick={handleClickCompleteButton}
        disabled={!(getScoreList.length === questionTotalNumber)}>
          검사 완료
      </Button>
      <ArrowWrapper 
        flip
        onClick={handleClickRightArrow}
        disabled={currPage >= pageCount - 1}
      >
        <FaArrowAltCircleRight />
      </ArrowWrapper>
    </Wrapper>
  </>
  )
}

const Question = ({history}) => {
  return (
    <>
      <QuestionList />      
    </>
  );
};

export default Question;

const Title = styled.h1`
  margin-top: 150px;
  margin-bottom: 50px;
  text-align: center;
`


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 700px;
  height: 700px;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`;


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 70px;
`;

const ArrowWrapper = styled.button`
  margin: ${(props) => (props.flip ? "0 0 0 50px !important" : "0 50px 0 0")};
  
  
  border: 0;
  outline: 0;
  background: transparent;
  

  svg {
    display: block;
    width: 30px;
    height: 30px;
  }
`;
