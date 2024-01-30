import styled from "styled-components";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import search from "../../assets/search.png";
import { useEffect, useState } from "react";
import { stocks } from "../../api/dummydata";
import { Btn } from "../../styles/Btn";
import axios from "axios";

export default function ModalModify({ modalClose, cardInfo }) {
  const name = sessionStorage.getItem("userName");
  const userSeq = sessionStorage.getItem("userSeq");

  //추천 주식 api 연결
  // const [stocks, setStocks] = useState([]);

  // (1) async, await 사용
  // const stockAPI = async () => {
  //   try {
  //     const response = await axios.get(`api/stock/${userSeq}`);
  //     setStocks(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   stockAPI();
  // }, []);

  // (2) 그냥 사용
  // useEffect(() => {
  //   axios
  //     .get(`api/stock/${userSeq}`)
  //     .then((res) => {
  //       setStocks(res.data);
  //     })
  //     .catch((res) => {
  //       console.log("error");
  //     });
  // }, []);

  //모달 조작
  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  //추천 주식 버튼 id 저장
  // const [selectedButton, setSelectedButton] = useState(-1);
  // const handleButtonClick = (buttonId) => {
  //   if (selectedButton === buttonId) {
  //     setSelectedButton(-1);
  //   } else {
  //     setSelectedButton(buttonId);
  //   }
  // };

  //기준가격 설정
  const [standardAmount, setStandardAmount] = useState(cardInfo.standardAmount);
  const onChangeInput = (event) => {
    setStandardAmount(event.target.value); //spread 연산자
  };

  //카드 설정 변경
  const [message, setMessage] = useState("");
  const clickConfirm = () => {
    // if (selectedButton === -1) {
    //   console.log(standardAmount);
    // } else {
    //   console.log(standardAmount, selectedButton);
    // }
    if (standardAmount < 1000 || standardAmount > 5000) {
      setMessage("기준금액을 1000원 이상 5000원 미만으로 설정해주세요");
    } else {
      modalClose();
    }
  };

  return (
    <ModalContainer onClick={onCloseModal}>
      <ModalBox>
        <Title>카드 설정변경</Title>
        <CardInput>
          <FormControl sx={{ minWidth: 120 }} disabled>
            <InputLabel id="demo-simple-select-disabled-label">
              카드사
            </InputLabel>
            <Select
              labelId="demo-simple-select-disabled-label"
              id="demo-simple-select-disabled"
              value={cardInfo.cardBank}
              label={cardInfo.cardBank}
            >
              <MenuItem value={cardInfo.cardBank}>{cardInfo.cardBank}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ minWidth: 400 }}
            fullWidth
            disabled
            id="outlined-disabled"
            label="카드번호"
            defaultValue={cardInfo.cardNumber}
          />
        </CardInput>
        <TextField
          fullWidth
          label="기준금액"
          id="outlined-start-adornment"
          value={standardAmount}
          InputProps={{
            endAdornment: <InputAdornment position="end">원</InputAdornment>,
          }}
          onChange={onChangeInput}
        />
        <FormHelperText id="outlined-weight-helper-text">
          투자의 기준이 되는 금액으로, (기준금액-소비액)의 잔금이 주식에 자동
          투자됩니다. 별도로 입력하지 않을시, 자동으로 3000원을 기준금액으로
          설정합니다.
        </FormHelperText>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Btn style={{ marginTop: "30px" }} onClick={clickConfirm}>
            수정하기
          </Btn>
          {message !== "" ? <NotiMessage>{message}</NotiMessage> : null}
        </div>
      </ModalBox>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;

const ModalBox = styled.div`
  width: 550px;
  height: 350px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  overflow: scroll;
  padding: 20px;
`;

const Title = styled.div`
  padding: 20px;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 500;
  text-align: center;
`;

const CardInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const NotiMessage = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  color: #f97316;
`;
