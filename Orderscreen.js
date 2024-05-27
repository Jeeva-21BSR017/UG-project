import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserOrders } from '../actions/orderAction';
import Error from "../components/Error";
import Loading from "../components/Loading";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
export default function Orderscreen() {
  const [pizzaName, setPizzaName] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [feedbackText, setFeedbackText] = useState('');
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const history = useHistory();

  const dispatch = useDispatch();
  const orderstate = useSelector(state => state.getUserOrdersReducer);
  const { orders, error, loading } = orderstate;
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
        pdf.save('Bill Order.pdf');
    });
  };
  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);
  const handleSubmitFeedback = async () => {
    try {
        await axios.post('/api/pizzas/addfeedback', {
            pizzaName,
            customerName,
            feedbackText
        });
        alert('Feedback submitted successfully');
        // Optionally, clear the form fields
        setPizzaName('');
        setCustomerName('');
        setFeedbackText('');
        setShowFeedbackForm(false);
        history.push('/orders');
    } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback. Please try again.');
    }
};
  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-4" style={{ fontSize: '35px' }}>My Orders</h2>
      <div className="row justify-content-center">
        {loading && (<Loading />)}
        {error && (<Error error='Something went wrong' />)}
        {orders && orders.map(order => (
          <div key={order._id} className="col-md-8 m-2" style={{ backgroundColor: '#A6E5DA', color: '#333', padding: '20px', borderRadius: '5px' }}>
            <div className="d-flex justify-content-between">
              <div className='text-left w-100 m-1'>
                <h2 style={{ fontSize: '25px' }}>Items</h2>
                <hr />
                {order.orderItems.map(item => (
                  <div key={item._id}>
                    <p>{item.name} [{item.varient}] * {item.quantity} = {item.price}</p>
                  </div>
                ))}
              </div>
              <div className='text-left w-100 m-1'>
                <h2 style={{ fontSize: '25px' }}>Address</h2>
                <hr />
                <p>Street: {order.shippingAddress.street}</p>
                <p>City: {order.shippingAddress.city}</p>
                <p>Country: {order.shippingAddress.country}</p>
                <p>Pincode: {order.shippingAddress.pincode}</p>
              </div>
              <div className='text-left w-100 m-1'>
                <h2 style={{ fontSize: '25px' }}>Order Info</h2>
                <hr />
                <p>Name: {order.name}</p>
                <p>Order Amount: {order.orderAmount}</p>
                <p>Date: {order.createdAt.substring(0, 10)}</p> 
                <p>Order ID: {order._id}</p>
                <a href="#" onClick={() => setShowFeedbackForm(true)}>Submit Feedback</a>
              </div>
            </div>
            
          </div>
        
        ))}
      </div>
      <Modal show={showFeedbackForm} onHide={() => setShowFeedbackForm(false)}>
    <Modal.Header closeButton>
        <Modal.Title><center>Feedback Form</center></Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div className="form-group">
            <label htmlFor="pizzaName">Pizza Name:</label>
            <input
                id="pizzaName"
                type="text"
                className="form-control"
                placeholder="Pizza Name"
                value={pizzaName}
                onChange={(e) => setPizzaName(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="customerName">Your Name:</label>
            <input
                id="customerName"
                type="text"
                className="form-control"
                placeholder="Your Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="feedbackText">Enter Feedback:</label>
            <textarea
                id="feedbackText"
                className="form-control"
                placeholder="Your Feedback"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
            />
        </div>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowFeedbackForm(false)}>
            Close
        </Button>
        <Button variant="primary" onClick={handleSubmitFeedback}>
            Submit Feedback
        </Button>
    </Modal.Footer>
</Modal>
<button className="btn1" onClick={handlePrint}>Print</button>{'\t'}
      <button className="btn1" onClick={handleDownload}>Download</button>
    </div>
  );
}
