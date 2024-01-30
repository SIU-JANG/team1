import styled from "styled-components";

export default function Title({ text }) {
  return (
    <div>
      <TitleStyle>
        <Square />
        <p>{text}</p>
      </TitleStyle>
    </div>
  );
}

const TitleStyle = styled.div`
  display: flex;
  align-items: center;
  p {
    font-weight: 600;
  }
`;

const Square = styled.div`
  height: 40px;
  width: 10px;
  background-color: #ed6d1e;
  margin: 0 15px 0 0;
`;
