import React, { useEffect, useState } from "react";
import "./OrderHistory.scss";
import ListOrder from "./TabOrderContent/ListOrder";
import PaidOrder from "./TabOrderContent/PaidOrder";
import UnpaidOrder from "./TabOrderContent/UnpaidOrder";
import { getOrderByAccountId } from "../../../service/APIService";
import { useSelector } from "react-redux";
import CompletedOrder from "./TabOrderContent/CompletedOrder";
import CancelledOrder from "./TabOrderContent/CancelledOrder";
import { Backdrop, Button, CircularProgress } from "@mui/material";

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [listOrder, setListOrder] = useState();
  const [open, setOpen] = React.useState(false);

  const user = useSelector((state) => state.userRedux.user);

  useEffect(() => {
    fetchListOrder();
  }, []);

  const handleTabClick = (tab) => {
    handleOpen();
    setActiveTab(tab);
  };

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  const fetchListOrder = async () => {
    try {
      let res = await getOrderByAccountId(user.idAccount);
      setListOrder(res.data);
    } catch (e) {
      console.log("Error fetch list order", e);
    }
  };

  return (
    <div className="order-history">
      <div className="tab-list">
        <div className="bg-heading">
          <h3>Quản lý đơn hàng</h3>
        </div>
        <div className="tabs">
          <div
            className={`tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => handleTabClick("all")}
          >
            Tất cả
          </div>
          <div
            className={`tab ${activeTab === "paid" ? "active" : ""}`}
            onClick={() => handleTabClick("paid")}
          >
            Đã thanh toán
          </div>
          <div
            className={`tab ${activeTab === "unpaid" ? "active" : ""}`}
            onClick={() => handleTabClick("unpaid")}
          >
            Chưa thanh toán
          </div>
          <div
            className={`tab ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => handleTabClick("completed")}
          >
            Xác nhận
          </div>
          <div
            className={`tab ${activeTab === "canceled" ? "active" : ""}`}
            onClick={() => handleTabClick("canceled")}
          >
            Chưa xác nhận
          </div>
        </div>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Tìm đơn hàng theo Mã đơn hàng" />
        <button>Tìm đơn hàng</button>
      </div>

      <div className="bg-content">
        <div className="content">
          {activeTab === "all" && <ListOrder listOrder={listOrder} />}
          {activeTab === "paid" && <PaidOrder listOrder={listOrder} />}
          {activeTab === "unpaid" && <UnpaidOrder listOrder={listOrder} />}
          {activeTab === "completed" && (
            <CompletedOrder listOrder={listOrder} />
          )}
          {activeTab === "canceled" && <CancelledOrder listOrder={listOrder} />}
        </div>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default OrderHistory;