import styled from "styled-components";
import card from "../../assets/credit-card.png";
import addbtn from "../../assets/add.png";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import CardBtn from "./CardBtn";
import SelectQuant from "./SelectQuant";
import axios from "axios";
import Purchase from "./Purchase";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import send from "../../assets/send.png";

export default function CardCompo() {
  const userSeq = sessionStorage.getItem("userSeq");
  const userstandardamount = sessionStorage.getItem("userStandardamount");

  const [mycards, setMyCards] = useState();
  //기준 금액 설정
  const [standardAmount, setStandardAmount] = useState(
    Number(userstandardamount)
  );
  const onChangeAmount = (event) => {
    setStandardAmount(event.target.value);
  };

  const getCards = async () => {
    try {
      const response = await axios.get(
        `http://121.141.60.181:8080/api/cards/${userSeq}`
      );
      if (response.status === 200) {
        setMyCards(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCards();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen((cur) => !cur);
  };

  const clickSend = () => {
    console.log("기준금액 전송하기");
    axios
      .get(
        `http://121.141.60.181:8080/api/users/${userSeq}/standardamount/${standardAmount}`
      )
      .then((res) => {
        console.log("기준금액 전송 성공");
        sessionStorage.setItem("userStandardamount", standardAmount);
      })
      .catch((res) => {
        console.log("기준금액 전송 실패");
      });
  };

  return (
    <div>
      <Title>
        <img src={card} />
        <p>카드 관리</p>
      </Title>
      <SelectQuant />
      <StandardWrap>
        <StandarTitle>
          기준금액&nbsp;
          <QuestionBtn>?</QuestionBtn>
          <div className="detail">
            투자의 기준이 되는 금액으로, (기준금액-소비액)의 잔금이 주식에 자동
            투자됩니다. 별도로 입력하지 않을시, 자동으로 10000원을 기준금액으로
            설정합니다.
          </div>
        </StandarTitle>
        <UnderLine>
          <TextField
            variant="standard"
            id="outlined-start-adornment"
            value={standardAmount}
            InputProps={{
              endAdornment: <InputAdornment position="end">원</InputAdornment>,
            }}
            sx={{ width: "100px" }}
            onChange={onChangeAmount}
          />
        </UnderLine>
        <SendBtn
          onClick={() => {
            clickSend();
          }}
        >
          <img src={send} />
        </SendBtn>
      </StandardWrap>
      <CardBox>
        <AddCard onClick={openModalHandler}>
          <img src={addbtn} />
        </AddCard>
        {mycards?.map((item) => (
          <CardBtn key={item.cardSeq} cardInfo={item} />
        ))}
        {isOpen ? <Modal modalClose={openModalHandler} /> : null}
      </CardBox>
      <PurchaseDiv>
        <Purchase />
      </PurchaseDiv>
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

const CardBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0 0 0;
`;

const AddCard = styled.button`
  width: 300px;
  height: 200px;
  border: 0;
  border-radius: 0.5rem; /* 8px */
  margin: 10px;
  &:hover {
    background-color: darkgray;
  }
  img {
    width: 50px;
  }
`;

const PurchaseDiv = styled.div`
  position: fixed;
  right: 10px;
  bottom: 50px;
  width: 500;
  height: 100;
`;

const StandardWrap = styled.span`
  margin: 0 10px;
  display: flex;
  align-items: center;
  position: relative;

  .detail {
    display: none;
    position: absolute;
    width: 400px;
    padding: 8px;
    left: 0;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    background: #333;
    color: #fff;
    font-size: 14px;
    top: 40px;
    margin: 0 0 0 20px;
  }

  .detail:after {
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -10px;
    border: solid transparent;
    border-color: rgba(51, 51, 51, 0);
    border-bottom-color: #333;
    border-width: 10px;
    pointer-events: none;
    content: " ";
  }

  div:hover + div.detail {
    display: block;
  }
`;

const StandarTitle = styled.span`
  margin: 0 27px 0 0;
  display: flex;
`;

const QuestionBtn = styled.div`
  width: 15px;
  height: 15px;
  border: 1;
  background: lightgray;
  border-radius: 9999px;
  text-align: center;
  line-height: 15px;
  color: white;
  &:hover {
    background: gray;
  }
`;

const StandardDetail = styled.div`
  visibility: hidden;
`;

const UnderLine = styled.span`
  position: relative;
  &:after {
    content: "";
    width: 100%;
    height: 10px;
    background: #99fee7;
    position: absolute;
    display: inline-block;
    left: 0;
    bottom: 1px;
    z-index: -1;
  }
`;

const SendBtn = styled.button`
  background: transparent;
  border: 0;
  border-radius: 9999px;
  img {
    width: 20px;
    height: 20px;
  }
  &:hover {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
  margin: 0 0 0 10px;
`;
