import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function createData(name, bprice, cprice, amount, rate) {
  return { name, bprice, cprice, amount, rate };
}

export default function StickyHeadTable({ getcolumns, rows, sell }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const clickSell = () => {
    console.log("판매");
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  //column, row 세팅
  const [columns, setColumns] = React.useState([]);
  // const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    let tmpCol = [];
    for (let i = 0; i < getcolumns.length; i++) {
      tmpCol = [
        ...tmpCol,
        { id: getcolumns[i].id, label: getcolumns[i].name, minWidth: 100 },
      ];
    }
    setColumns(tmpCol);
  }, []);

  return (
    <Paper sx={{ width: "90%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    {sell ? (
                      <TableCell
                        onClick={handleClick}
                        sx={{
                          background: "#FFD392",
                          cursor: "pointer",
                        }}
                      >
                        매도
                      </TableCell>
                    ) : null}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 20, 100]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="매도 완료"
        action={action}
        key="bottomright"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </Paper>
  );
}

const Btn = styled.button`
  margin: 0 5px;
  border: 0;
  border-radius: 15px;
`;
