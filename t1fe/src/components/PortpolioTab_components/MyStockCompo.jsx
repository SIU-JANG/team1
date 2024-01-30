import styled from "styled-components";
import Title from "./Title";
import StickyHeadTable from "./StickyHeadTable";
import { useEffect, useState } from "react";
import { stockList } from "../../api/dummydata";
import axios from "axios";

export default function MyStockCompo() {
  const name = sessionStorage.getItem("userName");
  const userSeq = sessionStorage.getItem("userSeq");

  const columns = [
    { id: "name", name: "투자종목" },
    { id: "bprice", name: "구입가격" },
    { id: "cprice", name: "현재가격" },
    { id: "amount", name: "수량" },
    { id: "rate", name: "수익률" },
    // { id: "sell", name: "" },
  ];
  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    //여기서 api 호출
    axios
      .get(`http://121.141.60.181:8080/api/mystocks/${userSeq}`)
      .then((res) => {
        console.log(res.data);
        let tmpRow = [];
        for (let i = 0; i < res.data.length; i++) {
          tmpRow = [
            ...tmpRow,
            {
              name: res.data[i].stockName,
              bprice: res.data[i].buyPrice,
              cprice: res.data[i].currentPrice,
              amount: parseFloat(
                Math.round(res.data[i].amount * 100) / 100
              ).toFixed(2),
              rate: parseFloat(
                Math.round(res.data[i].rateOfReturn * 100) / 100
              ).toFixed(2),
            },
          ];
        }
        setStocks(tmpRow);
        console.log(tmpRow);
      })
      .catch((err) => {
        console.log("보유주식 실패");
      });
  }, []);

  const sellStockAPI = async () => {
    try {
      const response = await axios.get(`api/stock/${userSeq}`);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const clickSell = () => {
    console.log("clickSell");
    // sellStockAPI();
  };

  return (
    <div>
      <Title text={"보유주식"} />
      <Wrap>
        {/* <Btn>
          <button onClick={clickSell}>전체매도</button>
        </Btn> */}
        <StickyHeadTable getcolumns={columns} rows={stocks} sell={true} />
      </Wrap>
    </div>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Btn = styled.div`
  width: 90%;
  display: flex;
  justify-content: end;
  button {
    width: 80px;
    height: 30px;
    border: 0;
    margin: 10px 0;

    background-color: #ffd392;
    padding: 5px;
    &:hover {
      background-color: #ed6d1e;
    }
  }
`;
