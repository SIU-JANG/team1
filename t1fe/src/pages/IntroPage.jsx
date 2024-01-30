import styled from "styled-components";
import logo from "../assets/wide_logo.png";
import coin3d from "../assets/coin3d.jpg";
import money3d from "../assets/money3d.jpg";
import { Triangle } from "../components/Triangle";
import { useNavigate } from "react-router-dom";

export default function IntroPage() {
  const navigate = useNavigate();
  return (
    <Wrap>
      <img style={{ width: "40%" }} src={logo} />
      <WrappedBox>
        {/* <BoldTxt>소비 생활을 반영한 주식 투자 서비스</BoldTxt>
        <p>
          소비 기준 금액과 소비 금액의 차액을 이용한 안정적 주식 투자 정보를
          제안
        </p>
        <img src={coin3d} style={{ width: "30vw" }} />
        <p>충동구매의 억제와 절약습관의 생활화</p>
        <img src={money3d} style={{ width: "30vw" }} />
        <p>
          제대로 투자하고 싶어도 목돈이 없는 사회초년생에게 돈을 모으면서
          주식투자에 대해 경험하고 배울 수 있는 기회
        </p> */}
        <StartBtn
          onClick={() => {
            navigate("/login");
          }}
        >
          시작하기
        </StartBtn>
      </WrappedBox>
      <Triangle />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
`;

const WrappedBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50vw;
`;

const BoldTxt = styled.p`
  font-weight: 600;
`;

const StartBtn = styled.button`
  padding: 10px 50px;
  background-color: #fdba74;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-radius: 0.5rem;
  border: 0;
  font-size: 1.125rem; /* 18px */
  line-height: 1.75rem; /* 28px */
  &:hover {
    background-color: #ed6d1e;
  }
`;

const Title = styled.div`
  display: flex;
  img {
    width: 100px;
    height: 100px;
  }
  p {
    font-size: 1.875rem; /* 30px */
    line-height: 2.25rem; /* 36px */
  }
`;
