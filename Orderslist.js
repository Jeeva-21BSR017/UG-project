import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getAllOrders } from "../actions/orderAction";
import Error from "../components/Error";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import OrderFilter from "../components/OrderFilter";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Orderslist() {
  const dispatch = useDispatch();
  const getordersstate = useSelector((state) => state.getAllOrdersReducer);
  const { loading, error, orders } = getordersstate;
  const[filteredOrders,setFilteredOrders]=useState(orders || []);
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  const handleDeliver = (order) => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${order.email}&su=Pizza%20Order%20Delivery&body=Hi ${order.name},%0D%0A%0D%0AHere are the details of your order:%0D%0AOrder ID: ${order._id}%0D%0AEmail: ${order.email}%0D%0AUser Name: ${order.name}%0D%0AAmount: ${order.orderAmount}%0D%0ADate: ${order.createdAt.substring(0, 10)}%0D%0A%0D%0AThanks,%0D%0APIZZA SQUARE%0D%0A%0D%0AP.S. If you have any issues, please mail to kaviyaprabha11@gmail.com`, '_blank');
    dispatch(deliverOrder(order._id));
  };
  const handleFilter = (start, end) => {
    if (start && end) {
      const filteredOrders = orders.filter(
        (order) =>
          new Date(order.createdAt) >= new Date(start) &&
          new Date(order.createdAt) <= new Date(end)
      );

      setFilteredOrders(filteredOrders);
    } else {
      setFilteredOrders(orders);
    }
  };
  const handlePrint = () => {
    window.print();
  }
 const handleDownload = () => {     const input = document.body;

  html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('OrderList.pdf');
  });
};
  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);
  return (
    <div>
      <OrderFilter onFilter={handleFilter} />
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <table className="table table-striped table-bordered table-responsive-sm">
        <thead className="thead-dark">
          <tr>
            <th>Order Id</th>
            <th>Email</th>
            <th>User Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders &&
            filteredOrders.map((order) => {
              return (
                <tr>
                  <td>{order._id}</td>
                  <td>{order.email}</td>
                  <td>{order.name}</td>
                  <td>{order.orderAmount}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>
                    {order.isDelivered ? (
                      <h5>Delivered</h5>
                    ) : (
                      <button className="btn" onClick={()=> handleDeliver(order)}>Deliver</button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button className="btn" onClick={handlePrint}>Print</button>{'\t'}
      <button className="btn" onClick={handleDownload}>Download</button>
    </div>
  );
}