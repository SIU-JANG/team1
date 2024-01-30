import styled from "styled-components";

export function Triangle() {
  return <TriangleCss />;
}

const TriangleCss = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  width: 0px;
  height: 0px;
  border-bottom: 600px solid #fff2d8;
  border-left: 0px solid transparent;
  border-right: 700px solid transparent;
  transform: scaleX(-1);
  z-index: -1;
`;
