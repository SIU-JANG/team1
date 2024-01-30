import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import send from "../../assets/send.png";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Purchase() {
  const userseq = sessionStorage.getItem("userSeq");

  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const [category, setCategory] = useState("");
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const [price, setPrice] = useState(0);
  const onChangeInput = (event) => {
    setPrice(event.target.value);
  };

  const clickSend = async () => {
    console.log("구매내역 전송하기:", category, price);
    const reqBody = {
      userSeq: +userseq,
      consumptionType: category,
      consumptionAmount: +price,
    };
    console.log("reqBody", reqBody);
    await axios
      .post("http://121.141.60.181:8080/api/consumptions", reqBody)
      .then((res) => {
        if (res.status === 200) {
          console.log("소비 완료");
        }
      })
      .catch((res) => {
        console.log("소비 실패!!!", res);
      });
  };

  return (
    <Box
      sx={{
        height: 100,
        width: 500,
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
      }}
    >
      <Button
        variant="outlined"
        endIcon={<CreditScoreRoundedIcon />}
        onClick={handleChange}
      >
        소비하기
      </Button>
      <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            mt: 1,
            width: 310,
            height: 70,
            display: "flex",
            alignItems: "end",
          }}
          elevation={4}
        >
          <FormControl>
            <InputLabel id="demo-simple-select-label">-사용처-</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="사용처"
              onChange={handleCategory}
              sx={{ width: 100 }}
            >
              <MenuItem value={"외식"}>외식</MenuItem>
              <MenuItem value={"쇼핑"}>쇼핑</MenuItem>
              <MenuItem value={"레저"}>레저</MenuItem>
              <MenuItem value={"기타"}>기타</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="price"
            variant="standard"
            sx={{ ml: 2, width: 150 }}
            value={price}
            onChange={onChangeInput}
          />
          원
          <SendBtn
            onClick={() => {
              clickSend();
            }}
          >
            <img src={send} />
          </SendBtn>
        </Paper>
      </Slide>
    </Box>
  );
}

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
  margin: 0 0 10px 10px;
`;
