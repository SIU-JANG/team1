import { useState } from "react";
import styled from "styled-components";
import portpolio from "../../assets/portfolio.png";
import Consumption from "./Consumption";
import InvestCompo from "./InvestCompo";
import MyStockCompo from "./MyStockCompo";

export default function Portpolio() {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen((cur) => !cur);
  };

  return (
    <div style={{ height: "100%" }}>
      <Title>
        <img src={portpolio} />
        <p>포트폴리오</p>
      </Title>
      <Wrap>
        <LeftWrap>
          <Consumption />
        </LeftWrap>
        <RightWrap>
          <InvestCompo />
          <div style={{ height: "100px" }}></div>
          <MyStockCompo />
        </RightWrap>
      </Wrap>
    </div>
  );
}

const Title = styled.div`
  display: flex;
  margin: 0 0 20px 0;
  img {
    width: 80px;
    margin: 0 20px;
  }
  p {
    font-size: 1.25rem; /* 20px */
    line-height: 1.75rem; /* 28px */
    font-weight: 600;
  }
`;

const Wrap = styled.div`
  width: 100%;
  display: flex;
`;

const LeftWrap = styled.div`
  width: 50%;
  height: 78vh;
  border: 1;
  overflow: scroll;
`;

const RightWrap = styled.div`
  width: 50%;
  height: 78vh;
  border: 1;
  overflow: scroll;
`;
