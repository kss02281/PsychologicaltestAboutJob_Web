import React from "react";
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from "../store/modules/reducer";
import axios from 'axios';
import styled from "styled-components";
import { Card, Button, ProgressBar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import { selector } from '../store/modules/reducer';


function Sample() {
    const dispatch = useDispatch();
    const history = useHistory();
    const questions = useSelector(selector.questions);

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
            dispatch(actions.setQuestion(response.data['RESULT']));
            dispatch(actions.setTotalNumber(response.data['RESULT'].length));

            setLoading(false);
        } catch (e) {
            setError(e);
        }
    };

    useEffect(() => {
        fetchQuestion();
    }, [])

    useEffect(() => { 
      if(questions){
        setFirstQuestion(questions.slice(0,1));
      }
      
    }, [ questions ]);

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
                        <div>
                          {firstQuestion?.map(element => {
                              return (
                                  <>
                                      <RadioBtnContainer>
                                          <RadioBtnBox>
                                              <RadioBtn type='radio' id='1' checked={select === 1} onClick={() => {
                                                  setState(element.answer03);
                                                  handleClickRadioButton(1);
                                              }}/>
                                              <label htmlFor='1' style={{fontSize: '20px', cursor: 'pointer'}}>{element.answer01}</label>
                                          </RadioBtnBox>

                                          <RadioBtnBox>
                                              <RadioBtn type='radio' id='2' checked={select === 2} onClick={() => {
                                                  setState(element.answer04);
                                                  handleClickRadioButton(2);
                                              }}/>
                                              <label htmlFor='2' style={{fontSize: '20px', cursor: 'pointer'}}>{element.answer02}</label>
                                          </RadioBtnBox>
                                      </RadioBtnContainer>
                                              
                                      <StateValue> {state} </StateValue>
                                  </>
                            )
                          })}
                        </div> 
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
  margin-top: 20px;
  @media (max-width: 400px) {
    text-align: left;
    font-size: 14px;
  }
`

