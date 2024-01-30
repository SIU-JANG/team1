import styled from "styled-components";
import Title from "./Title";
import { consumptionList } from "../../api/dummydata";
import { MyResponsivePie } from "./MyResponsivePie";
import { useEffect, useState } from "react";
import StickyHeadTable from "./StickyHeadTable";
import axios from "axios";

export default function Consumption() {
  const userseq = sessionStorage.getItem("userSeq");

  // 그래프용 데이터 분류
  const [graphData, setGraphData] = useState();
  const [tableData, setTableData] = useState([]);

  const columns = [
    { id: "name", name: "사용처" },
    { id: "price", name: "소비액 (원)" },
  ];
  /**
 *         Long consumptionSeq,
        Long consumptionId,
        Long consumptionAmount,
        Long userSeq
 */
  useEffect(() => {
    axios
      .get(`http://121.141.60.181:8080/api/users/consumption/${userseq}`)
      .then((res) => {
        console.log("소비내역 불러오기 성공", res.data);
        let tmp = [];
        for (let i = 0; i < res.data.length; i++) {
          tmp = [
            ...tmp,
            {
              id: res.data[i].consumptionType,
              label: res.data[i].consumptionType,
              value: res.data[i].consumptionAmount,
            },
          ];
        }
        setGraphData(tmp);

        let tmpRow = [];
        for (let i = 0; i < res.data.length; i++) {
          tmpRow = [
            ...tmpRow,
            {
              name: `${res.data[i].consumptionType}`,
              price: res.data[i].consumptionAmount,
            },
          ];
        }
        setTableData(tmpRow);

        console.log(graphData, tableData);
      })
      .catch((res) => {
        console.log("소비내역 불러오기 실패");
      });
  }, []);

  return (
    <div>
      <Title text={"소비"} />
      <Wrap>
        {/* <ConsumptionTable info={consumptionList.list} /> */}
        <div style={{ width: "500px", height: "500px", margin: "0 auto" }}>
          {graphData ? <MyResponsivePie data={graphData} /> : null}
        </div>
        {/* <div style={{ marginBottom: "20px" }}>
          당신은 "
          <span style={{ fontWeight: "600" }}>{consumptionList.type}</span>"
          소비유형입니다.
        </div> */}
        <StickyHeadTable getcolumns={columns} rows={tableData} />
      </Wrap>
    </div>
  );
}

//테이블 컴포넌트
function ConsumptionTable({ info }) {
  let category = "";
  const getCategory = (num) => {
    switch (num) {
      case 1:
        category = "식당";
        break;
      case 2:
        category = "쇼핑";
        break;
      case 3:
        category = "레저";
        break;
      default:
        category = "기타";
    }
    return category;
  };

  return (
    <Table>
      <Thead>
        <Th scope="col"></Th>
        <Th scope="col">사용처</Th>
        <Th scope="col">소비액</Th>
      </Thead>
      <tbody>
        {info.map((item) => (
          <tr>
            <Td>
              <div
                style={{ width: "5px", height: "5px", backgroundColor: "gray" }}
              ></div>
            </Td>
            <Td>
              {getCategory(item.consumptionId)}({item.consumptionPercent}%)
            </Td>
            <Td>{item.consumptionAmount}원</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  border: 1px #a39485 solid;
  font-size: 0.9em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  width: 80%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
`;

const Thead = styled.thead`
  font-weight: bold;
  color: #fff;
  background: #73685d;
`;

const Td = styled.td`
  padding: 3px 3px;
  vertical-align: middle;
  text-align: center;
`;
const Th = styled.th`
  padding: 3px 3px;
  vertical-align: middle;
`;
