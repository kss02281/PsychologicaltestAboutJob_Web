import React from "react";

import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../redux/action";
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import styled from "styled-components";
import { useHistory } from "react-router-dom";

function InputUserForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');

    const handleClickRadioButton = useCallback((radioBtnName) => {
        setGender(radioBtnName)
    }, [gender])

    const handleClickStartButton = () => {
        dispatch(registerUser(name, gender));
        history.push('/sampleQuestion');
    }

    return (
        <Container>
            <InputGroup className="mb-3" style={{
                width: '300px',
            }}>
                <InputGroup.Text id="name">이름</InputGroup.Text>
                <FormControl
                    placeholder="이름"
                    aria-label="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </InputGroup>

            <div>
                <RadioBtnBox>
                    <RadioBtn type='radio' id='male' checked={gender === 'male'} onClick={() => handleClickRadioButton('male')} />
                    <label htmlFor='male'>남자</label>
                </RadioBtnBox>

                <RadioBtnBox>
                    <RadioBtn type='radio' id='female' checked={gender === 'female'} onClick={() => handleClickRadioButton('female')} />
                    <label htmlFor='female'>여자</label>
                </RadioBtnBox>
            </div>

            <Button
                disabled={!(name && gender)}
                onClick={handleClickStartButton}>검사 시작</Button>

        </Container>
    )
}

const Main = ({ history }) => {
    return (
        <div>
            <Title> 직업가치관검사 </Title>
            <InputUserForm />
        </div>
    );
};

export default Main;

const Title = styled.h1`
    margin-top: 150px;
    text-align: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 400px) {
    width: 100%;
    max-width: 400px;
    justify-content: start;
    flex-wrap: wrap;
  }

  Button {
      margin-top: 30px;
  }
`

const RadioBtnBox = styled.div`
  margin: 15px 5px;
  font-size: 20px;
`

const RadioBtn = styled.input`
  margin-right: 5px;
`
