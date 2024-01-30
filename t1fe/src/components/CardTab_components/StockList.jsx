import styled, { keyframes } from "styled-components";
import { quantstocks } from "../../api/dummydata";
import { useEffect, useState } from "react";
import axios from "axios";
import Typewriter from "typewriter-effect";

export default function StockList({
  quant,
  setSelectedStock,
  selectedButton,
  selectedStock,
  setSelectedButton,
}) {
  //추천 주식 버튼 id 저장
  const [details, setDetails] = useState("");
  const handleButtonClick = (buttonId, name, price) => {
    if (selectedButton === buttonId) {
      setSelectedButton(-1);
    } else {
      axios
        .get(`http://121.141.60.181:8080/api/introduce/${name}`)
        .then((res) => {
          setDetails(res.data);
          console.log(selectedStock);
        })
        .catch((res) => {
          console.log("설명글 불러오기 실패");
        });

      setSelectedButton(buttonId);
      setSelectedStock({ name: name, price: price });
    }
  };

  const [apistocks, setStocks] = useState([]);
  useEffect(() => {
    // 퀀트별 주식 호출 api
    axios
      .post(`http://121.141.60.181:8080/api/stocks/recommend`, {
        deviation: quant === 1 ? true : false,
        per: quant === 3 ? true : false,
        dividendYield: quant === 2 ? true : false,
        fscoreValue: quant === 4 ? true : false,
      })
      .then((res) => {
        // console.log("전략 선택 성공");
        setStocks(res.data);
      })
      .catch((res) => {
        console.log("전략 선택 실패");
      });

    // console.log(apistocks, quant);
  }, [quant]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          marginTop: "5px",
        }}
      >
        <StockBox>
          {apistocks?.map((item) => (
            <StProductBox>
              <StockBtn
                key={item.stockSeq}
                isSelected={selectedButton === item.stockSeq}
                onClick={() =>
                  handleButtonClick(
                    item.stockSeq,
                    item.stockName,
                    item.currentPrice
                  )
                }
              >
                <p>{item.stockName}</p>
                <p>{item.currentPrice}</p>
              </StockBtn>
            </StProductBox>
          ))}
        </StockBox>
        {selectedButton === -1 ? null : (
          <StockDetail>
            <p className="head">{selectedStock.name}</p>
            <IntroduceDetail>
              <p>{details.s1}</p>
              <ul>
                <li>
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString(details.s2)
                        .pauseFor(500)
                        .start()
                        .typeString("<p></p>")
                        .typeString(details.s3)
                        .pauseFor(500)
                        .start()
                        .typeString("<p></p>")
                        .typeString(details.s4)
                        .pauseFor(500)
                        .start()
                        .typeString("<p></p>")
                        .typeString(details.s5)
                        .pauseFor(500)
                        .start();
                    }}
                  />
                </li>
                {/* <li>
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter.typeString(details.s3).pauseFor(2500).start();
                    }}
                  />
                </li>
                <li>
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter.typeString(details.s4).pauseFor(2500).start();
                    }}
                  />
                </li>
                <li>
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter.typeString(details.s5).pauseFor(2500).start();
                    }}
                  />
                </li> */}
              </ul>
            </IntroduceDetail>
          </StockDetail>
        )}
      </div>
    </div>
  );
}

const IntroduceDetail = styled.div``;

const StockBox = styled.div`
  width: 650px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const StockBtn = styled.button`
  width: 300px;
  height: 100%;
  border: 0;
  border-radius: 20px;
  border: 0.1rem solid #f1f1f1;
  background-color: ${(props) => (props.isSelected ? "#ffd392" : "white")};
`;

const StProductBox = styled.div`
  width: 200px;
  aspect-ratio: 2/1;
  // border: 0.1rem solid #f1f1f1;
  border-radius: 0.5rem;
  position: relative;
  display: flex;
  justify-content: center;
`;

const StockDetail = styled.div`
  // margin: 0 0 0 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  padding: 0 15px;
  z-index: 2;
  border-radius: 20px;
  background-color: white;
  position: absolute;
  right: 100px;
  width: 50%;
  .head {
    font-weight: 600;
    font-size: 20px;
    line-height: 1px;
  }
`;

const typing = keyframes`
from {width : 0}
`;

const caret = keyframes`
50% { border-right-color: transparent; }
`;

const TypeAnimation = styled.div`
  h1 {
    font: bold 200% Consolas, Monaco, monospace;
    width: ${(props) => props.length}ch;
    white-space: nowrap;
    overflow: hidden;
    border-right: 0.05em solid;
    animation: ${typing} 8s steps(${(props) => props.length}),
      ${caret} 1s steps(1) infinite;
  }
`;
