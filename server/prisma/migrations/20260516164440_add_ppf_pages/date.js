import React, { useState, useEffect } from "react";
import Header from "./Header";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import "whatwg-fetch";
import StoreOrderStats from "./StoreOrderStats";
import CustomTableCell from "./CustomTableCell";
import Pagination from "./Pagination";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import TablePagination from '@mui/material/TablePagination';
import api from '../axios/ApiRequests';

const columns = [
  { id: "store", label: "STORE" },
  { id: "placed", label: "Placed" },
  { id: "pickingNotStarted", label: "Picking Not Started" },
  { id: "pickingStarted", label: "Picking Started" },
  { id: "staged", label: "Staged" },
  { id: "completed", label: "Completed" },
  { id: "expired", label: "Expired"},
  { id: "customerCancelled", label: "Customer Cancelled" },
  { id: "systemCancelled", label: "System Cancelled" }
];

export default function OrderStatusDashboard(props) {
  const [date, setDate] = useState(null);
  const [createDate, setCreateDate] = useState(null);
  const [pendingSearch, setPendingSearch] = useState(false);
  const [results, setResults] = useState(false);
  const [store, setStore] = useState(false);
  const [apiFailure, setApiFailure] = useState(false);
  const [userObj, setUserObj] = useState({});

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(10);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const userEnteredOrdersPerPage = (number) => setOrdersPerPage(number);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 
  const handleChangeRowsPerPage = (event) => {
    setOrdersPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setUserObj(props?.user || {});
  }, [props?.user]);

  // Helper: format Date -> M/D/YYYY h:mm:ss AM/PM (server-compatible)
  const formatDateForApi = (d) => {
    if (!d) return "1/1/0001 12:00:00 AM";
    const mm = d.getMonth() + 1;
    const dd = d.getDate();
    const yyyy = d.getFullYear();
    let hours = d.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12;
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${mm}/${dd}/${yyyy} ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  async function search(e, dateVal, createDateVal) {
    e.preventDefault();
    if (!dateVal && !createDateVal) {
      alert("Date is required to search");
      setResults(false);
      return;
    }

    const orderDateStr = formatDateForApi(dateVal);
    const createDateStr = formatDateForApi(createDateVal);

    setPendingSearch(true);
    setApiFailure(false);

    try {
      const response = await api.post('/orderInfoLookup', {
        orderDate: orderDateStr,
        createDate: createDateStr
      });
      const json = response.data;
      if (!json || json.length === 0) {
        setPendingSearch(false);
        setResults(false);
        setApiFailure(true);
      } else if (json.state && json.state === "Not Authorized") {
        setPendingSearch(false);
        setResults(false);
        setApiFailure(true);
      } else {
        console.log(json);
        json.pop();
        setPendingSearch(false);
        setResults(json);
        setApiFailure(false);
      }
    } catch (error) {
      console.error(error);
      setPendingSearch(false);
      setResults(false);
      setApiFailure(true);
    }
  }

  let content = null;
  let totalOrders = 0;

  if (pendingSearch === false && results === false && apiFailure === true) {
    content = <h1>No orders found, try searching with different dates</h1>;
  } else if (
    store === false &&
    pendingSearch === false &&
    results === false &&
    apiFailure === false
  ) {
    content = <h1>Enter the order date or pickup date.</h1>;
  } else if (store === false && pendingSearch === true) {
    content = (
      <div className="text-center">
        <img src="/img/loading.gif" alt="loading" />
      </div>
    );
  } else if (
    store === false &&
    pendingSearch !== true &&
    results !== false &&
    results.length === 0
  ) {
    content = <h1>no results</h1>;
  } else if (store !== false) {
    content = (
      <StoreOrderStats
        setStore={setStore}
        store={store.trim()}
        date={date}
        createDate={createDate}
        user={userObj}
      />
    );
  } else {
    totalOrders = results.length;
    content = (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <CustomTableCell key={column.id}>
                    {column.label}
                  </CustomTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {results
                .slice(page * ordersPerPage, page * ordersPerPage + ordersPerPage)
                .map((v) => {
                  if (v.store.trim() === "Total") {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={v.store}>
                        <CustomTableCell style={{ fontWeight: "bold"}}>
                          Total
                        </CustomTableCell>
                        <CustomTableCell>{v.placed}</CustomTableCell>
                        <CustomTableCell>{v.pickingNotStarted}</CustomTableCell>
                        <CustomTableCell>{v.pickingStarted}</CustomTableCell>
                        <CustomTableCell>{v.staged}</CustomTableCell>
                        <CustomTableCell>{v.completed}</CustomTableCell>
                        <CustomTableCell>{v.expired}</CustomTableCell>
                        <CustomTableCell>{v.customerCancelled}</CustomTableCell>
                        <CustomTableCell>{v.systemCancelled}</CustomTableCell>
                      </TableRow>
                    );
                  }
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={v.store}>
                      <CustomTableCell>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            setStore(v.store);
                          }}
                          href="#"
                        >
                          {v.store}
                        </a>
                      </CustomTableCell>
                      <CustomTableCell>{v.placed}</CustomTableCell>
                      <CustomTableCell>{v.pickingNotStarted}</CustomTableCell>
                      <CustomTableCell>{v.pickingStarted}</CustomTableCell>
                      <CustomTableCell>{v.staged}</CustomTableCell>
                      <CustomTableCell>{v.completed}</CustomTableCell>
                      <CustomTableCell>{v.expired}</CustomTableCell>
                      <CustomTableCell>{v.customerCancelled}</CustomTableCell>
                      <CustomTableCell>{v.systemCancelled}</CustomTableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={totalOrders}
          rowsPerPage={ordersPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }

  return (
    <div className="App">
      <Header path="order-status" canPerformUserDelete={userObj.canPerformUserDeletion}/>
      <header className="App-header">
        <div className="container">
          <div className="row">
            <form onSubmit={(e) => search(e, date, createDate)}>
              <div className="col-md-3">
                <label htmlFor="createDate" style={{ float: "left", clear: "none" }}>
                  Order Date:
                </label>
                <a
                  href="#clearCreateDate"
                  style={{ float: "right", top: 0 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setCreateDate(null);
                  }}
                  className="clear-date"
                >
                  Clear Date
                </a>
                <Flatpickr
                  required
                  className="required"
                  value={createDate}
                  options={{
                    enableTime: true,
                    dateFormat: "m/d/Y h:i K",
                    time_24hr: false,
                    enableSeconds: false
                  }}
                  onChange={(arr) => {
                    setCreateDate(arr[0]);
                  }}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="orderDate" style={{ float: "left", clear: "none" }}>
                  Pickup Date:
                </label>
                <a
                  href="#clearDate"
                  style={{ float: "right", top: 0 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setDate(null);
                  }}
                  className="clear-date"
                >
                  Clear Date
                </a>
                <Flatpickr
                  required
                  className="required"
                  value={date}
                  options={{
                    enableTime: true,
                    dateFormat: "m/d/Y h:i K",
                    time_24hr: false,
                    enableSeconds: false
                  }}
                  onChange={(arr) => {
                    setDate(arr[0]);
                  }}
                />
              </div>
              <div className="col-md-3">
                <input
                  disabled={pendingSearch}
                  type="submit"
                  onClick={(e) => {
                    setStore(false);
                  }}
                  value="Search"
                  className="btn-blue m-top-30"
                />
              </div>
              <div className="col-md-3">
                <input
                  type="reset"
                  onClick={(e) => {
                    setStore(false);
                    setResults(false);
                    setDate(null);
                    setCreateDate(null);
                  }}
                  value="Reset"
                  className="btn-white"
                />
              </div>
            </form>
          </div>
        </div>
      </header>
      <div className="App-content">
        <div className="container">
          <div id="results">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}