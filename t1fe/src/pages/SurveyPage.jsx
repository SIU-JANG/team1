import styled from "styled-components";
import logo from "../assets/tmp_logo.png";
import { useState } from "react";
import { Triangle } from "../components/Triangle";
import { Btn } from "../styles/Btn";
import axios from "axios";
import { ip } from "../api/ip";
import { useLocation, useNavigate } from "react-router-dom";

export default function SurveyPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);

  const clickSurvey = () => {
    console.log(state);

    axios
      .post(`http://121.141.60.181:8080/api/users/type`, {
        userSeq: state,
        userType: "안정선호형",
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("성향 입력 성공");
          navigate("/main");
        }
      })
      .catch((res) => {
        console.log("성향 입력 에러");
      });
    console.log(
      state,
      selectedOption1,
      selectedOption2,
      selectedOption3,
      selectedOption4
    );
  };

  //예=0, 아니요=1
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [selectedOption4, setSelectedOption4] = useState(null);

  return (
    <Wrap>
      <SignBox>
        <Title>
          <img src={logo} />
          <p>성향 파악하기</p>
        </Title>
        <div>
          <InnerWrap>
            <div>Q1. 당신은 안정을 추구하나요?</div>
            <RadioBtns
              selectedOption={selectedOption1}
              setSelectedOption={setSelectedOption1}
            />
          </InnerWrap>

          <InnerWrap>
            <div>Q2. 당신은 배당을 선호하나요?</div>
            <RadioBtns
              selectedOption={selectedOption2}
              setSelectedOption={setSelectedOption2}
            />
          </InnerWrap>
          <InnerWrap>
            <div>Q3. 당신은 성장주를 중요시하나요?</div>
            <RadioBtns
              selectedOption={selectedOption3}
              setSelectedOption={setSelectedOption3}
            />
          </InnerWrap>
          <InnerWrap>
            <div>Q4. 당신은 가치주를 선호하나요?</div>
            <RadioBtns
              selectedOption={selectedOption4}
              setSelectedOption={setSelectedOption4}
            />
          </InnerWrap>
        </div>

        <Btn onClick={clickSurvey}>제출</Btn>
      </SignBox>
      <Triangle />
    </Wrap>
  );
}

function RadioBtns({ selectedOption, setSelectedOption }) {
  const options = [
    { text: "예", value: 0 },
    { text: "아니요", value: 1 },
  ];

  const onChangeRadio = (e) => {
    setSelectedOption(Number(e.target.value));
  };
  return (
    <RadioWrap>
      {options.map((option, idx) => (
        <label key={idx}>
          <input
            type="radio"
            name="fruits"
            value={option.value}
            onChange={onChangeRadio}
            checked={idx === selectedOption}
          />
          <span
            className="fruit"
            style={{
              border:
                idx === selectedOption
                  ? "1px solid pink"
                  : "1px solid lightgray",
              backgroundColor: idx === selectedOption ? "pink" : "lightgray",
            }}
          >
            {option.text}
          </span>
        </label>
      ))}
    </RadioWrap>
  );
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const SignBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 600px;
  height: 400px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

const Title = styled.div`
  display: flex;
  img {
    width: 50px;
    margin: 0 0 10px 0;
  }
  p {
    font-weight: 600;
  }
`;

const InnerWrap = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const RadioWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  .fruit {
    border: 1px solid red;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    font-size: 14px;
    background-color: #fafafa;
    margin: 4px;
    text-align: center;
    padding: 4px 16px;
  }
`;
