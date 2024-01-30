import styled from "styled-components";
import logo from "../assets/logo.png";
import wideLogo from "../assets/wide_logo.png";
import card from "../assets/credit-card.png";
import portfolio from "../assets/portfolio.png";
import menu from "../assets/menu.png";
import close from "../assets/close.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";

export default function Menubar({ setMenuId }) {
  const navigate = useNavigate();
  const [isopen, setIsOpen] = useState(false);
  const name = sessionStorage.getItem("userName");
  const clickOpen = () => {
    setIsOpen((cur) => !cur);
  };
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };
  const clickCard = () => {
    setMenuId(1);
  };
  const clickPortpolio = () => {
    setMenuId(2);
  };
  return (
    <>
      <MenuBox>
        <LogoDiv>
          <img src={logo} />
        </LogoDiv>
        <Btn onClick={clickCard}>
          <img src={card} />
          카드관리
        </Btn>
        <Btn onClick={clickPortpolio}>
          <img src={portfolio} />
          포트폴리오
        </Btn>
        <OpenBtn onClick={clickOpen}>
          <img src={menu} />
        </OpenBtn>
      </MenuBox>
      {isopen ? (
        <MenuBoxOpen>
          <img style={{ width: "200px", height: "100px" }} src={wideLogo} />
          <Btn onClick={clickCard}>
            <img src={card} />
            카드관리
          </Btn>
          <Btn onClick={clickPortpolio}>
            <img src={portfolio} />
            포트폴리오
          </Btn>
          <Info>
            <p>
              <span style={{ fontWeight: "600" }}>{name}</span>님 반가워요!
            </p>
            <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
          </Info>
          <OpenBtn onClick={clickOpen}>
            <img src={close} />
          </OpenBtn>
        </MenuBoxOpen>
      ) : null}
    </>
  );
}
const Title = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-around;
  align-items: center;
  img {
    width: 50px;
    margin: 0 20px;
  }
  p {
    font-weight: 600;
  }
`;

const MenuBoxOpen = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white; //gray
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  width: 200px;
  height: 100vh;
  padding: 20px 0 0 0;
  animation: slideInLeft;
  animation-duration: 0.5s;
  z-index: 100;
  img {
    width: 50px;
    height: 50px;
    margin: 20px 0;
  }
`;
const MenuBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  // background-color: gray;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  width: 100px;
  height: 100vh;
  padding: 20px 0 0 0;

  img {
    width: 50px;
    height: 50px;
    margin: 20px 0;
  }
`;

const Btn = styled.button`
  margin: 20px 0;

  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 0;
  &:hover {
    background-color: darkgray;
  }
`;

const OpenBtn = styled.div`
  position: absolute;
  bottom: 10px;
  background-color: transparent;
  border: 0;

  img {
    width: 20px;
    height: 20px;
  }
`;

const Info = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 80px;
  background-color: transparent;
`;

const LogoutBtn = styled.button`
  background-color: transparent;
  border: 0;
  &:hover {
    font-weight: 600;
  }
`;

const LogoDiv = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 9999px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
