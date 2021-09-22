import React, { useEffect, useState, PureComponent } from "react";
import styled, { isStyledComponent } from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setWonScoreList, setHighScore, setJobList, resetValues} from '../redux/action';
import axios from 'axios';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function Result() {
    const dispatch = useDispatch();

    const scoreStringCheck = useSelector(state => state.scoreString);
    const getName = useSelector(state => state.name);
    const genderNumber = useSelector(state => state.genderNumber);

    const [chartData, setChartData] = useState([]);
    const [date, setDate] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let seq = '';
    let wonScoreVal = [];
    let wonScoreValSort = [];
    let no1 = 0;
    let no2 = 0;

    let wonScoreLabel =  ['능력발휘', '자율성', '보수', '안전성', '사회적 안정', '사회봉사', '자기계발', '창의성'];

    const [result, setResult] = useState({
        apikey: 'bb3525c7992f792567d46f2413f29a32',
        qestrnSeq: 6,
        trgetSe: 100209,
        name: getName,
        gender: genderNumber,
        grade: '',
        startDtm: new Date().getTime(),
        answers: scoreStringCheck
    });

    const { qestrnSeq, trgetSe, name, gender, grade, startDtm, answers } = result;

    async function fetchResult() {
        try {
            setLoading(true);

            const response = await axios.post("http://www.career.go.kr/inspct/openapi/test/report?apikey=bb3525c7992f792567d46f2413f29a32&qestrnSeq=6",result);
            const searchTerm = '=';
            const indexOfFirst = response.data['RESULT'].url.indexOf(searchTerm);
            seq = response.data['RESULT'].url.slice(indexOfFirst+1,);
            console.log(response.data['RESULT'].url);

            const response2 = await axios.get('https://www.career.go.kr/inspct/api/psycho/report', {
                params: { seq: seq }
            });

            const wonScoreData = response2.data['result'].wonScore;
            const wonScore = wonScoreData.slice(0, wonScoreData.length - 1);
            const wonScoreList = wonScore.split(' ');
            wonScoreVal = wonScoreList.map((elem) => parseInt(elem[2]));
            wonScoreValSort = [...wonScoreVal];
            wonScoreValSort = wonScoreValSort.sort(function (a, b) {return b - a}); //내림차순 정렬

            dispatch(setWonScoreList(wonScoreVal));
            console.log(wonScoreVal, wonScoreValSort);

            const wonScoreFiltered = wonScoreVal.map((score, idx) => {
                return {
                    name: wonScoreLabel[idx],
                    score,
                };
            });
            
            setChartData([...chartData, ...wonScoreFiltered]);

            no1 = wonScoreValSort[0];
            no2 = wonScoreValSort[1];
            console.log(no1, no2);
            dispatch(setHighScore(no1, no2));

            const response3 = await axios.get('https://inspct.career.go.kr/inspct/api/psycho/value/jobs',{params: {no1: no1, no2: no2}});
            const response4 = await axios.get('https://inspct.career.go.kr/inspct/api/psycho/value/majors',{params: {no1: no1, no2: no2}});

            console.log('종사자 평균 학력별 직업 정보 요청');
            //console.log(response3.data);

            console.log('종사자 평균 전공별 직업 정보 요청');
            //console.log(response4.data);

            dispatch(setJobList(response3.data, response4.data));

            
            setLoading(false);
        } catch (e) {
            setError(e);
        }
    };

    useEffect(() => {
       fetchResult();
       const date = new Date();
       setDate(date.getFullYear()+'.'+(date.getMonth()+1) + '.' +date.getDate());
    }, [])
    

    return(
        <>
            <Title>
                직업가치관검사 결과표
            </Title>
            <Table striped bordered hover>
                <thead >
                    <tr>
                    <th>이름</th>
                    <th>성별</th>
                    <th>검사일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{getName}</td>
                    <td>{(genderNumber===100323)? '남': '여'}</td>
                    <td>{date}</td>
                    </tr>
                </tbody>
            </Table>
            <ChartWrapper>
                <BarChart
                    width={800}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 50,
                        left: 0,
                        bottom: 5
                    }}

                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#8884d8" />
                </BarChart>
            </ChartWrapper>
        </>
    )
}

function ResultShow(){
    let ageJobLabel = [
        "중졸이하",
        "고졸",
        "전문대졸",
        "대졸",
        "대학원졸",
    ];
    let majorJobLabel = [
        "계열무관",
        "인문",
        "사회",
        "교육",
        "공학",
        "자연",
        "의학",
        "예체능",
    ];

    const getJobAge = useSelector(state => state.jobAgeList);
    const getJobMajor = useSelector(state => state.jobMajorList);
    
    useEffect(()=>{
        console.log('전체 데이터');
        console.log(getJobAge, getJobMajor);
    }, [getJobAge, getJobMajor])

    return(
        <>
            <LabelBox>종사자 평균 학력별</LabelBox>
            <Table striped bordered hover>
                <thead >
                    <tr>
                    <th style={{width: '20%'}}>분야</th>
                    <th>직업명</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{ageJobLabel[0]}</td>
                    <td>
                    {getJobAge.map((element)=>(
                        (element[2] === 1)? 
                        <span>{element[1]}  </span>
                        : <span></span>
                    ))}
                    </td>
                    </tr>
                    <tr>
                    <td>{ageJobLabel[1]}</td>
                    <td>
                    {getJobAge.map((element)=>(
                        (element[2] === 2)? 
                        <span>{element[1]}  </span>
                        : <span></span>
                    ))}
                    </td>
                    </tr>
                    <tr>
                    <td>{ageJobLabel[2]}</td>
                    <td>
                    {getJobAge.map((element)=>(
                        (element[2] === 3)? 
                        <span>{element[1]}  </span>
                        : <span></span>
                    ))}
                    </td>
                    </tr>
                    <tr>
                    <td>{ageJobLabel[3]}</td>
                    <td>
                    {getJobAge.map((element)=>(
                        (element[2] === 4)? 
                        <span>{element[1]}  </span>
                        : <span></span>
                    ))}
                    </td>
                    </tr>
                    <tr>
                    <td>{ageJobLabel[4]}</td>
                    <td>
                    {getJobAge.map((element)=>(
                        (element[2] === 5)? 
                        <span>{element[1]}  </span>
                        : <span></span>
                    ))}
                    </td>
                    </tr>
                </tbody>
            </Table>
            <LabelBox>종사자 평균 전공별</LabelBox>
            <Table striped bordered hover>
                <thead >
                    <tr>
                    <th style={{width: '20%'}}>분야</th>
                    <th>직업명</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{majorJobLabel[0]}</td>
                    <td>
                    {getJobMajor.map((element)=>(
                        (element[2] === 1)? 
                        <span>{element[1]}  </span>
                        : <span></span>
                    ))}
                    </td>
                    </tr>
                    <tr>
                    <td>{majorJobLabel[1]}</td>
                    <td>
                    {getJobMajor.map((element)=>(
                        (element[2] === 2)? 
                        <span>{element[1]}  </span>
                        : <span></span>
                    ))}
                    </td>
                    </tr>
                    <tr>
                    <td>{majorJobLabel[2]}</td>
                    <td>
                    {getJobMajor.map((element)=>(
                        (element[2] === 3)? 
                        <span>{element[1]}  </span>
                        : <span></span>
                    ))}
                    </td>
                    </tr>
                    <tr>
                    <td>{majorJobLabel[3]}</td>
                    <td>
                    {getJobMajor.map((element)=>(
                        (element[2] === 4)? 
                        <span>{element[1]}  </span>
                        : <span></span>
                    ))}
                    </td>
                    </tr>
                    <tr>
                    <td>{majorJobLabel[4]}</td>
                    <td>
                    {getJobMajor.map((element)=>(
                        (element[2] === 5)? 
                        <span>{element[1]}  </span>
                        : <span></span>
                    ))}
                    </td>
                    </tr>
                    <tr>
                    <td>{majorJobLabel[5]}</td>
                    <td>
                    {getJobMajor.map((element)=>(
                        (element[2] === 6)? 
                        <span>{element[1]}  </span>
                        : <span></span>
                    ))}
                    </td>
                    </tr>
                    <tr>
                    <td>{majorJobLabel[6]}</td>
                    <td>
                    {getJobMajor.map((element)=>(
                        (element[2] === 7)? 
                        <span>{element[1]}  </span>
                        : <span></span>
                    ))}
                    </td>
                    </tr>
                    <tr>
                    <td>{majorJobLabel[7]}</td>
                    <td>
                    {getJobMajor.map((element)=>(
                        (element[2] === 8)? 
                        <span>{element[1]}  </span>
                        : <span></span>
                    ))}
                    </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );

}

function RestartButton(){
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClickRestartButton = () => {
        dispatch(resetValues());
        history.push('./');
    }

    return (
        <Button
                onClick={handleClickRestartButton}>
                다시검사하기
        </Button>

    )
}

const FinalResult = ({ history }) => {
    return (
        <Container >
            <Result />
            <ResultShow />
            <RestartButton />
        </Container>
    )
};

export default FinalResult;

const Title = styled.h1`
    text-align: center;
    color: #8A2BE2;
    margin-bottom: 50px;
    text-decoration: underline;
    text-underline-position: under;
`

const LabelBox = styled.div`
    text-align: center;
    padding: 20px;
    font-size: 20px;
    font-weight: bold;

    border: 2px solid Indigo;

    width: 800px;
    height: 70px;
    background-color: Lavender;
`

const ChartWrapper = styled.div`
    margin: 0 auto;
    margin-bottom: 50px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 1700px;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;

 Table {
    text-align: center;
    font-weight: bold;
    background-color: Lavender;
    border: 1px solid Indigo;
 }

 Button {
    margin-top: 20px;
    font-size: 25px;
    background-color: Lavender;
    color: Indigo;
    font-weight: bold;
    border: 0;
    outline: 0;
 }
`