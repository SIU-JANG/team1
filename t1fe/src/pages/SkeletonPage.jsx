import Skeleton from "@mui/material/Skeleton";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SkeletonPage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(function () {
      navigate("/main");
    }, 500);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Skeleton
        variant="rounded"
        width={100}
        height={"100%"}
        animation="wave"
      />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Skeleton
          variant="rounded"
          width={"100%"}
          height={150}
          animation="wave"
        />
      </div>
    </div>
    // <Stack spacing={1}>
    //   {/* <Skeleton /> */}
    //   {/* <Skeleton animation={false} /> */}
    // </Stack>
  );
}
