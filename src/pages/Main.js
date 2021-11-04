import React, { useEffect } from "react";
import axios from 'axios';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from "../store/modules/reducer";
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import styled, { keyframes } from "styled-components";
import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';


function InputUserForm() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [select, setSelect] = useState(0);

    const handleClickRadioButton = useCallback((radioBtnName) => {
        setGender(radioBtnName)
    }, [gender])

    const handleClickStartButton = () => {
        const nonFullKorean = /[ㄱ-ㅎ]/g

        if(nonFullKorean.test(name)){
            setName('')
            setGender('')
            toast.error("올바른 이름을 입력하세요.",{
                position: "top-right"
            })
        }
        else{
            dispatch(actions.registerUser({name, gender}));
            history.push('/sampleQuestion');
        }

    }

    const handleInputName = (e) => {

        const regex = /[a-z0-9~!@#$%^&*()\-=+_';<>/.`:",[\]?|{}\s*\r\n]/gi
        const fullKorean = /^[ㄱ-ㅎ|가-힣]*$/
        console.log(e.target.value)

        if(regex.test(e.target.value)){
            toast.error("한글만 입력해주세요.",{
                position: "top-right"
            })
            e.target.value = e.target.value.replace(regex, '')
        }
        
    
        if(fullKorean.test(e.target.value)){
            setName(e.target.value);
        }

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
                    onChange={handleInputName}
                    value={name}
                />
            </InputGroup>
            <ToastContainer/>
            <div>
                
                <RadioBtnBox>
                    <RadioBtn type='radio' name='gender' id='male' defaultChecked={gender === 'male'} onClick={() => handleClickRadioButton('male')} />
                    <label htmlFor='male'>남자</label>
                </RadioBtnBox>

                <RadioBtnBox>
                    <RadioBtn type='radio' name='gender' id='female' defaultChecked={gender === 'female'} onClick={() => handleClickRadioButton('female')} />
                    <label htmlFor='female'>여자</label>
                </RadioBtnBox>
            </div>

            <Button
                disabled={!(name && gender)}
                onClick={handleClickStartButton}>검사 시작</Button>

            {(name && gender)? <p></p>:<BlinkStr>이름과 성별을 입력하세요</BlinkStr>}

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

const blink = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`
//styled component 변수의 첫글자는 무조건 대문자!!
const BlinkStr = styled.div`
    display: inline-block;
    animation: ${blink} 2s linear infinite;
    padding: 2rem 1rem;
    font-size: 1.2rem;
    color: red;
`