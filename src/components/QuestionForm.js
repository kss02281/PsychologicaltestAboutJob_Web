import React from "react";
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, {css} from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

function QuestionForm(props) {

    const [select, setSelect] = useState(0);
    const [score, setScore] = useState(0);
    const [state, setState] = useState('');

    const commonQuestion = props.commonQuestion;
    const questionItemNumber = props.questionItemNumber;
    const question01 = props.question01;
    const question02 = props.question02;
    const firstQuestionState = props.firstQuestionState;
    const secondQuestionState = props.secondQuestionState;
    const answerScore01 = props.answerScore01;
    const answerScore02 = props.answerScore02;
    const currPage = props.currPage;
    const onButtonClick = props.onButtonClick;




    const handleClickRadioButton = useCallback((radioBtnName) => {
        setSelect(radioBtnName)
        //console.log(currPage,'번째 페이지의',questionItemNumber,'번째 질문');
        if(radioBtnName === 1) {
            const newScore = {
                id: questionItemNumber,
                score: answerScore01
            };
            //console.log(answerScore01);
            onButtonClick(newScore);
        }
        else if(radioBtnName === 2){
            const newScore = {
                id: questionItemNumber,
                score: answerScore02
            };
            //console.log(answerScore02);
            onButtonClick(newScore);
        }
        
    },[select])

    useEffect(()=>{
        setSelect(0);
        setState('');
    },[currPage]);


    return (
    <Container> 
      < Card border = "primary" style = {{ width: '40rem', marginTop: '30px' }} > 
      <Card.Header>질문{questionItemNumber}  {commonQuestion}</Card.Header>
        <Card.Body>
            <Card.Text>
                <RadioBtnContainer>
                    <RadioBtnBox>
                        <RadioBtn type='radio' id={`${questionItemNumber}_1`} name={questionItemNumber} checked={select === 1} onClick={() => {
                                setState(firstQuestionState);
                                handleClickRadioButton(1);
                            }}/>
                        <label htmlFor={`${questionItemNumber}_1`} style={{fontSize: '20px'}}>{question01}</label>
                    </RadioBtnBox>

                    <RadioBtnBox>
                        <RadioBtn type='radio' id={`${questionItemNumber}_2`} name={questionItemNumber} checked={select === 2} onClick={() => {
                                setState(secondQuestionState);
                                handleClickRadioButton(2);
                            }}/>
                        <label htmlFor={`${questionItemNumber}_2`} style={{fontSize: '20px'}}>{question02}</label>
                    </RadioBtnBox>
                </RadioBtnContainer>

                <StateValue>
                    {state}
                </StateValue>

            </Card.Text>
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