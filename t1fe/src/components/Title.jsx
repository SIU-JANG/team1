import styled from "styled-components";

export default function Title() {
  return (
    <Wrap>
      <Logo>logo</Logo>
      <Letter>title</Letter>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  display: flex;
`;

const Logo = styled.div`
  margin: 0 10px;
`;

const Letter = styled.p`
  font-size: 1.25rem;
  line-height: 1.75rem;
`;
