import styled from "styled-components";
import Title from "./Title";
import StickyHeadTable from "./StickyHeadTable";
import { stockList } from "../../api/dummydata";
import { useEffect, useState } from "react";
import { MyResponsivePie } from "./MyResponsivePie";
import axios from "axios";

export default function InvestCompo() {
  const columns = [
    { id: "name", name: "투자종목" },
    { id: "bprice", name: "구입가격" },
    { id: "rate", name: "수익률" },
  ];

  const userseq = sessionStorage.getItem("userSeq");
  const [stocks, setStocks] = useState([]);
  const [graphData, setGraphData] = useState();
  const [totalrate, setTotalrate] = useState(0);

  useEffect(() => {
    //여기서 api 호출
    const tmpStocks = stockList;
    axios
      .get(`http://121.141.60.181:8080/api/stocks/${userseq}`)
      .then((res) => {
        console.log(res.data);
        setTotalrate(res.data.totalRateOfReturn);
        //표
        let tmpRow = [];
        for (let i = 0; i < res.data.list.length; i++) {
          tmpRow = [
            ...tmpRow,
            {
              name: res.data.list[i].stockName,
              bprice: res.data.list[i].buyPrice,
              rate: parseFloat(
                Math.round(res.data.list[i].rateOfReturn * 100) / 100
              ).toFixed(2),
            },
          ];
        }
        setStocks(tmpRow);

        //그래프
        let tmp = [];
        for (let i = 0; i < res.data.list.length; i++) {
          tmp = [
            ...tmp,
            {
              id: res.data.list[i].stockName,
              label: res.data.list[i].stockName,
              value: res.data.list[i].buyPrice,
            },
          ];
        }
        setGraphData(tmp);
      })
      .catch((res) => {
        console.log("투자종목 불러오기 실패");
      });
  }, []);

  return (
    <div>
      <Title text={"투자"} />
      <Wrap>
        {/* Consumption 참고 */}
        <div
          style={{
            position: "relative",
            width: "500px",
            height: "500px",
            margin: "0 auto",
          }}
        >
          <TotalRate>
            <p>전체수익률</p>
            <p className="percent">
              {parseFloat(Math.round(totalrate * 100) / 100).toFixed(0)}%
            </p>
          </TotalRate>
          {graphData ? <MyResponsivePie data={graphData} /> : null}
        </div>
        {/* MyStockCompo 참고 */}
        <StickyHeadTable getcolumns={columns} rows={stocks} />
      </Wrap>
    </div>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TotalRate = styled.div`
  position: absolute;

  top: 30%;
  left: 40%;
  text-align: center;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;

  .percent {
    font-size: 3rem; /* 48px */
    // line-height: 1;
    font-weight: 800;
  }
`;
