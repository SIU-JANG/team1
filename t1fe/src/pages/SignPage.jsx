import styled from "styled-components";
import logo from "../assets/tmp_logo.png";
import { useState } from "react";
import { Triangle } from "../components/Triangle";
import { Btn } from "../styles/Btn";
import axios from "axios";
import { ip } from "../api/ip";
import { useNavigate } from "react-router-dom";

export default function SignPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [name, setName] = useState("");
  const [userseq, setUserseq] = useState();

  const navigate = useNavigate();

  const handleId = (e) => {
    setId(e.target.value);
  };
  const handlePw = (e) => {
    setPw(e.target.value);
  };
  const handlePw2 = (e) => {
    setPw2(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };

  const sign = async () => {
    try {
      const response = await axios.post(
        `http://121.141.60.181:8080/api/users`,
        {
          userId: id,
          userPassword: pw,
          userName: name,
        }
      );
      if (response.status === 200) {
        console.log("회원가입 성공", response);
        sessionStorage.setItem("userSeq", response.data);
        setUserseq(response.data);
        navigate("/survey", { state: response.data });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const clickSignIn = () => {
    if (pw === pw2) {
      sign();
    }
  };

  return (
    <Wrap>
      <SignBox>
        <Title>
          <img src={logo} />
          <p>회원가입</p>
        </Title>
        <InputBox
          type="text"
          name="id"
          placeholder="아이디"
          onChange={handleId}
        />
        <InputBox
          type="password"
          name="pw"
          placeholder="비밀번호"
          onChange={handlePw}
        />
        <InputBox
          type="password"
          name="pw"
          placeholder="비밀번호 확인"
          onChange={handlePw2}
        />
        <InputBox
          type="text"
          name="name"
          placeholder="이름"
          onChange={handleName}
        />
        {pw == pw2 ? <></> : <p>비밀번호가 일치하지 않습니다.</p>}
        <Btn onClick={clickSignIn}>회원가입</Btn>
      </SignBox>
      <Triangle />
    </Wrap>
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
  justify-content: center;
  width: 500px;
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

const InputBox = styled.input`
  width: 50%;
  padding: 10px;
  margin: 5px;
  border-width: 0px;
  background-color: #f2f2f2;
`;
