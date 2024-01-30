import styled from "styled-components";
import logo from "../assets/tmp_logo.png";
import { useState } from "react";
import { Triangle } from "../components/Triangle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { login } from "../api/account.js";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const handleId = (e) => {
    setId(e.target.value);
  };
  const handlePw = (e) => {
    setPw(e.target.value);
  };

  // (1) async, await 사용
  const login = async () => {
    try {
      const response = await axios.post(
        `http://121.141.60.181:8080/api/users/login`,
        {
          userId: id,
          userPassword: pw,
        }
      );
      console.log(response);
      if (response.status === 200) {
        sessionStorage.setItem("userSeq", response.data.userSeq);
        sessionStorage.setItem("userName", response.data.userName);
        sessionStorage.setItem(
          "userStandardamount",
          response.data.standardAmount
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clickLogin = () => {
    console.log(id, pw);
    login();
    navigate("/skeleton");
  };
  return (
    <Wrap>
      <LoginBox>
        <Title>
          <img src={logo} />
          <p>Hackathon</p>
        </Title>
        <InputBox type="text" name="id" placeholder="ID" onChange={handleId} />
        <InputBox
          type="password"
          name="pw"
          placeholder="PW"
          onChange={handlePw}
        />
        <LoginBtn onClick={clickLogin}>LOGIN</LoginBtn>
        <SignLink href="/sign">회원가입</SignLink>
      </LoginBox>
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

const LoginBox = styled.div`
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

const LoginBtn = styled.button`
  border-width: 0px;
  background-color: #ffd392;
  padding: 10px;
  margin: 5px;
  width: 30%;
  &:hover {
    background-color: #ed6d1e;
  }
`;

const SignLink = styled.a`
  font-size: 0.75rem;
  line-height: 1rem;
  margin: 3px;
  color: black;
`;
