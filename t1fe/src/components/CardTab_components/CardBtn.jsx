import { useEffect, useState } from "react";
import styled from "styled-components";
import ModalModify from "./ModalModify";

export default function CardBtn({ cardInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen((cur) => !cur);
  };

  let color = "#9F9F9F";
  switch (cardInfo.cardBank) {
    case "신한카드":
      color = "#0046FF";
      break;
    case "국민카드":
      color = "#FFBC00";
      break;
    case "농협카드":
      color = "#35AD55";
      break;
    case "우리카드":
      color = "#0083CB";
      break;
    default:
      color = "#9F9F9F";
  }

  return (
    <>
      <Card color={color} onClick={openModalHandler}>
        <h1>{cardInfo.cardBank}</h1>
        <p>{cardInfo.cardNumber}</p>
        {/* <p>
          설정주식 {cardInfo.stockName}(현재 {cardInfo.currentPrice}원)
        </p> */}
      </Card>
      {/* {isOpen ? (
        <ModalModify modalClose={openModalHandler} cardInfo={cardInfo} />
      ) : null} */}
    </>
  );
}

const Card = styled.button`
  width: 300px;
  height: 200px;
  border: 0;
  border-radius: 0.5rem; /* 8px */
  background-color: ${(props) => props.color};
  margin: 10px;

  &:hover {
    background-color: darkgray;
  }
  img {
    width: 50px;
  }
`;
