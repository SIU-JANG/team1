import { useEffect, useState } from "react";
import styled from "styled-components";
import StockList from "./StockList";
import send from "../../assets/send.png";
import { currentStock } from "../../api/dummydata";
import axios from "axios";

export default function SelectQuant() {
  sessionStorage.setItem("type", 1);
  const userseq = sessionStorage.getItem("userSeq");
  const usertype = sessionStorage.getItem("type");

  const [quant, setQuant] = useState(usertype);
  const [selectedButton, setSelectedButton] = useState(-1);
  const [selectedStock, setSelectedStock] = useState({ name: "x", price: "x" });
  const [curStock, setCurStock] = useState();

  const setColor = (num) => {
    if (num === Number(quant)) {
      return "gray";
    } else return "lightgray";
  };

  useEffect(() => {
    //현재 설정 주식 api 호출
    axios
      .get(`http://121.141.60.181:8080/api/curstock/${userseq}`)
      .then((res) => {
        if (res.status === 200) {
          setCurStock(res.data);
          // console.log("현재 주식 불러오기 성공", res.data);
        }
      })
      .catch((res) => {
        console.log("현재 주식 불러오기 실패");
      });

    setSelectedStock(currentStock);
    // console.log(curStock);
  }, []);

  const clickSend = () => {
    // console.log("주식설정 전송하기:", selectedButton, selectedStock);
    axios
      .put(`http://121.141.60.181:8080/api/curstock`, {
        userSeq: userseq,
        userStockName: selectedStock.name,
        currentPrice: selectedStock.price,
        userStockSeq: selectedButton,
      })
      .then((res) => {
        if (res.status === 200) {
          setCurStock({
            userStockName: selectedStock.name,
            userStockCurrentPrice: selectedStock.price,
          });
          // console.log("주식 설정 성공", curStock);
        }
      });
  };

  return (
    <Wrap>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Btn
          onClick={() => {
            setQuant(1);
          }}
          color={setColor(1)}
        >
          안정선호형
        </Btn>
        <Btn
          onClick={() => {
            setQuant(2);
          }}
          color={setColor(2)}
        >
          배당선호형
        </Btn>
        <Btn
          onClick={() => {
            setQuant(3);
          }}
          color={setColor(3)}
        >
          성장주선호형
        </Btn>
        <Btn
          onClick={() => {
            setQuant(4);
          }}
          color={setColor(4)}
        >
          가치주선호형
        </Btn>
        <SettingDiv>
          <div
            style={{ display: "flex", alignItems: "start", marginLeft: "5px" }}
          >
            {selectedButton === -1 ? (
              <span></span>
            ) : (
              <>
                <span>
                  <UnderLine>
                    {selectedStock.name}
                    {`(${selectedStock.price}원)`}
                  </UnderLine>
                  으로 변경
                </span>
                <SendBtn
                  onClick={() => {
                    clickSend();
                  }}
                >
                  <img src={send} />
                </SendBtn>
              </>
            )}
          </div>
        </SettingDiv>
      </div>
      {quant === -1 ? (
        <div></div>
      ) : (
        <StockList
          quant={quant}
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          selectedStock={selectedStock}
          setSelectedStock={setSelectedStock}
        />
      )}
      <div>
        현재 설정 주식&nbsp;
        {curStock?.userStockName === null ? (
          <UnderLine>없음</UnderLine>
        ) : (
          <UnderLine>
            {curStock?.userStockName} {`(${curStock?.userStockCurrentPrice}원)`}
          </UnderLine>
        )}
      </div>
    </Wrap>
  );
}

const Btn = styled.button`
  padding: 5px;
  margin: 0 5px 0 0;
  border-radius: 0.75rem; /* 12px */
  border: 0;
  background-color: ${(props) => props.color};
  &:hover {
    background-color: gray;
  }
`;
//

const Wrap = styled.div`
  margin: 0 10px;
`;

const SettingDiv = styled.div`
  display: flex;
  align-items: center;
  div {
    margin: 0 5px 0 0;
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
