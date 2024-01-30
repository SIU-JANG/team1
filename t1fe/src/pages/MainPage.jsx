import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menubar from "../components/Menubar";
import styled from "styled-components";
import CardCompo from "../components/CardTab_components/CardCompo";
import Portpolio from "../components/PortpolioTab_components/PortpolioCompo";

export default function MainPage() {
  const navigate = useNavigate();
  const [menuId, setMenuId] = useState(1);

  useEffect(() => {
    // 미로그인시 접근 제한
    const userseq = sessionStorage.getItem("userSeq");
    if (userseq === null) navigate("/");
  }, []);

  return (
    <div>
      <Menubar setMenuId={setMenuId} />
      <MainWrap>
        {menuId === 1 ? <CardCompo /> : menuId === 2 ? <Portpolio /> : null}
      </MainWrap>
    </div>
  );
}

const MainWrap = styled.div`
  margin: 0 0 0 100px;
  padding: 50px;
`;
