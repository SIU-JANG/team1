import styled from "styled-components";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import search from "../../assets/search.png";
import { useEffect, useState } from "react";
import { stocks } from "../../api/dummydata";
import { Btn } from "../../styles/Btn";
import axios from "axios";

export default function Modal({ modalClose }) {
  const name = sessionStorage.getItem("userName");
  const userSeq = sessionStorage.getItem("userSeq");

  //추천 주식 api 연결
  // const [stocks, setStocks] = useState([]);
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

  // 카드 등록 api
  const postCard = async () => {
    try {
      const response = await axios.post(
        `http://121.141.60.181:8080/api/cards`,
        {
          cardBank: cardcompony,
          cardNumber: num1 + "-" + num2 + "-" + num3 + "-" + num4,
          userSeq: userSeq,
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log("굳");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //모달 조작
  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  //주식 선택
  const [selectedButton, setSelectedButton] = useState(-1);
  const handleButtonClick = (buttonId) => {
    if (selectedButton === buttonId) {
      setSelectedButton(-1);
    } else {
      setSelectedButton(buttonId);
    }
  };

  //카드 회사 선택
  const [cardcompony, setCardcompony] = useState("");
  const handleChange = (event) => {
    setCardcompony(event.target.value);
  };

  //카드 번호 입력
  const initialValue = {
    num1: "",
    num2: "",
    num3: "",
    num4: "",
  };
  const [inputValues, setInputValues] = useState(initialValue);
  const { num1, num2, num3, num4 } = inputValues; //비구조화 할당
  const onChangeInput = (event) => {
    const { value, name: inputName } = event.target;
    setInputValues({ ...inputValues, [inputName]: value }); //spread 연산자
  };

  //카드 추가 (미입력 항목이 있으면 안됨)
  const [message, setMessage] = useState("");
  const clickAdd = () => {
    if (cardcompony === "") {
      setMessage("카드회사를 선택해주세요");
    } else if (num1 === "" || num2 === "" || num3 === "" || num4 === "") {
      setMessage("카드번호를 입력해주세요");
    } else {
      postCard();
      modalClose();
    }
  };

  return (
    <ModalContainer onClick={onCloseModal}>
      <ModalBox>
        <Title>카드 추가하기</Title>
        <CardInput>
          <FormControl>
            <InputLabel id="demo-simple-select-label">-카드사-</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cardcompony}
              label="카드사"
              onChange={handleChange}
              sx={{ width: 100 }}
            >
              <MenuItem value={"국민카드"}>국민카드</MenuItem>
              <MenuItem value={"신한카드"}>신한카드</MenuItem>
              <MenuItem value={"우리카드"}>우리카드</MenuItem>
              <MenuItem value={"농협카드"}>농협카드</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="num1"
            variant="standard"
            sx={{ width: 100 }}
            value={num1}
            onChange={onChangeInput}
          />
          <TextField
            name="num2"
            variant="standard"
            sx={{ width: 100 }}
            value={num2}
            onChange={onChangeInput}
          />
          <TextField
            name="num3"
            variant="standard"
            sx={{ width: 100 }}
            value={num3}
            onChange={onChangeInput}
          />
          <TextField
            name="num4"
            variant="standard"
            sx={{ width: 100 }}
            value={num4}
            onChange={onChangeInput}
          />
        </CardInput>

        {/* <p style={{ paddingTop: "15px" }}>추천 주식 리스트</p>
        <p style={{ fontSize: "0.875rem", lineHeight: "1.25rem" }}>
          {name}님의 성향에 맞는 주식을 추천합니다
        </p> */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <StockBox>
            {stocks.map((item) => (
              <StockBtn
                key={item.stockSeq}
                isSelected={selectedButton === item.stockSeq}
                onClick={() => handleButtonClick(item.stockSeq)}
              >
                <p>{item.stockName}</p>
                <p>{item.currentPrice}</p>
              </StockBtn>
            ))}
          </StockBox>
          <SearchBox>
            <p style={{ fontSize: "0.875rem", lineHeight: "1.25rem" }}>
              다른 주식 검색하기
            </p>
            <TextField id="search" variant="standard" sx={{ width: 300 }} />
            <button>
              <img src={search} />
            </button>
          </SearchBox> */}
          <Btn style={{ marginTop: "30px" }} onClick={clickAdd}>
            추가
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
  height: 250px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  overflow: scroll;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
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

const StockBox = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const StockBtn = styled.button`
  width: 150px;
  height: 80px;
  border: 0;
  border-radius: 20px;
  background-color: ${(props) => (props.isSelected ? "#B6B6B6" : "#D9D9D9")};
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 500px;
  height: 40px;
  border-radius: 20px;
  background-color: gray;

  button {
    border: 0;
    background-color: transparent;
    img {
      width: 20px;
    }
  }
`;

const NotiMessage = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  color: #f97316;
`;
