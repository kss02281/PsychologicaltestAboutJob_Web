import React from "react";
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestion, setTotalNumber } from "../redux/action";
import axios from 'axios';
import styled from "styled-components";
import { Card, Button, ProgressBar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";


function Sample() {
    const dispatch = useDispatch();
    const history = useHistory();
    const question = useSelector(state => state.question);
    const questionTotalNumber = useSelector(state => state.questionTotalNumber);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [select, setSelect] = useState(0);
    const [state, setState] = useState('');
    const [firstQuestion, setFirstQuestion] = useState([]);

    async function fetchQuestion() {
        try {
            setLoading(true);
            const response = await axios.get("https://www.career.go.kr/inspct/openapi/test/questions?apikey=bb3525c7992f792567d46f2413f29a32&q=6");
            console.log(response.data['RESULT']);
            dispatch(setQuestion(response.data['RESULT']));
            dispatch(setTotalNumber(response.data['RESULT'].length));

            setLoading(false);
        } catch (e) {
            setError(e);
        }
    };

    useEffect(() => {
        fetchQuestion();
        
    }, [])

    useEffect(() => { 
      if(question){
        setFirstQuestion(question.slice(0,1));
        console.log(firstQuestion);
      }
      
    }, [question]);

    const handleClickRadioButton = useCallback((radioBtnName) => {
        setSelect(radioBtnName)
    },[select])

    const handleClickStartButton = () => {
        history.push('/question');
    }

    if(loading)
        return <Title>로딩중...</Title>;
    if (error) return <Title>에러 발생!</Title>;
        return (
            <>
                <Title>검사예시</Title>
                <ProgressBar animated now={60} label={`60%`} style={{maxWidth: "40rem", display: 'flex', alignItems: 'center', justifyContent: 'start', marginLeft: 'auto', marginRight: 'auto'}}/>
                
                <Container>
                
                <Card border="primary" style={{ width: '40rem' }}>
                    <Card.Header>직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.</Card.Header>
                    <Card.Header>가치의 뜻을 잘모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.</Card.Header>
                    <Card.Body>
                        <Card.Title>두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요.</Card.Title>
                        <Card.Text>
                        {firstQuestion?.map(element => {
                            return (
                                <>
                                    <RadioBtnContainer>
                                        <RadioBtnBox>
                                            <RadioBtn type='radio' id='1' checked={select === 1} onClick={() => {
                                                setState(element.answer03);
                                                handleClickRadioButton(1);
                                            }}/>
                                            <label htmlFor='1'>{element.answer01}</label>
                                        </RadioBtnBox>

                                        <RadioBtnBox>
                                            <RadioBtn type='radio' id='2' checked={select === 2} onClick={() => {
                                                setState(element.answer04);
                                                handleClickRadioButton(2);
                                            }}/>
                                            <label htmlFor='2'>{element.answer02}</label>
                                        </RadioBtnBox>
                                    </RadioBtnContainer>
                                            
                                    <StateValue> {state} </StateValue>
                                </>
                          )
                        })}
                        </Card.Text> 
                    </Card.Body>
                </Card>
                <Button
                onClick={handleClickStartButton}>검사 시작</Button>
                </Container>
            </>
        );
}

const SampleQuestion = ({history}) => {
    return (
      <>
        <Sample />
      </>
    );
  };
  
export default SampleQuestion;

const Title = styled.h1`
    margin-top: 150px;
    margin-bottom: 50px;
    text-align: center;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 50px;
  margin-top: 200px;
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
`

const StateValue = styled.h1`
  display: flex;
  font-size: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
  @media (max-width: 400px) {
    text-align: left;
    font-size: 14px;
  }
`

