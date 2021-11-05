import React from "react";
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { selector } from '../store/modules/reducer';

function QuestionForm(props) {
    const getScoreList = useSelector(selector.getScoreList);

    const [select, setSelect] = useState(0);
    const [state, setState] = useState('');

    const commonQuestion = props.commonQuestion;
    const questionItemNumber = props.questionItemNumber;
    const question01 = props.question01;
    const question02 = props.question02;
    const firstQuestionState = props.firstQuestionState;
    const secondQuestionState = props.secondQuestionState;
    const answerScore01 = props.answerScore01;
    const answerScore02 = props.answerScore02;
    const onButtonClick = props.onButtonClick;

    useEffect(()=>{
      if(getScoreList){
        getScoreList.map((item) => {
          if(item.id === questionItemNumber){
            setSelect(item.score);
            setState(item.description);
          }
        })
      }

    },[ getScoreList, questionItemNumber ])

    const handleClickRadioButton = useCallback((radioBtnName) => {
        setSelect(radioBtnName)
        const newScore = {
          id: questionItemNumber,
          score: radioBtnName,
          description: radioBtnName === answerScore01? firstQuestionState : secondQuestionState
        };
        onButtonClick(newScore);
    },[ answerScore01, answerScore02, questionItemNumber ])

    return (
    <Container> 
      < Card border = "primary" style = {{ width: '40rem', marginTop: '30px' }} > 
      <Card.Header>질문{questionItemNumber}  {commonQuestion}</Card.Header>
        <Card.Body>
            <div>
                <RadioBtnContainer>
                    <RadioBtnBox>
                        <RadioBtn type='radio' id={`${questionItemNumber}_1`} name={questionItemNumber} value={answerScore01} onClick={(e) => {
                                setState(firstQuestionState);
                                handleClickRadioButton(e.currentTarget.value);
                            }} checked={select === answerScore01} />
                        <label htmlFor={`${questionItemNumber}_1`} style={{fontSize: '20px', cursor: 'pointer'}}>{question01}</label>
                    </RadioBtnBox>
                    <RadioBtnBox>
                        <RadioBtn type='radio' id={`${questionItemNumber}_2`} name={questionItemNumber} value={answerScore02} onClick={(e) => {
                                setState(secondQuestionState);
                                handleClickRadioButton(e.currentTarget.value);
                            }} checked={select === answerScore02}/>
                        <label htmlFor={`${questionItemNumber}_2`} style={{fontSize: '20px', cursor: 'pointer'}}>{question02}</label>
                    </RadioBtnBox>
                </RadioBtnContainer>
                <StateValue>
                    {state}
                </StateValue>
            </div>
        </Card.Body>
    </Card>
    </Container>

    )

}

export default QuestionForm;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 50px;
  margin-top: 100px;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;

  Button {
    margin-top: 50px;
    width: 300px;
  }
`;

const RadioBtnContainer = styled.div`
  display: flex;
  
  @media (max-width: 400px) {
    width: 100%;
    max-width: 400px;
    justify-content: start;
    flex-wrap: wrap;
  }
`

const RadioBtnBox = styled.div`
  margin: 0 5px;
  display: flex;
  align-items: center;
  font-size: 15px;
`

const RadioBtn = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  cursor: pointer;
  label {
    font-size: 25px;
  }
`

const StateValue = styled.h1`
  display: flex;
  font-size: 18px;
  flex-wrap: wrap;
  margin-top: 5px;
  @media (max-width: 400px) {
    text-align: left;
    font-size: 14px;
  }
`