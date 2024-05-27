import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Pizza from '../components/Pizza';
import { getAllPizzas } from "../actions/pizzaActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Filter from "../components/Filter";

export default function Homescreen() {
    const dispatch = useDispatch()
    const [recentPizzas, setRecentPizzas] = useState([]);
    const pizzasstate = useSelector(state => state.getAllPizzasReducer)
    const { pizzas, error, loading } = pizzasstate
    useEffect(() => {
        dispatch(getAllPizzas())
    }, [])
    const handlePizzaClick = (pizza) => {
      const isPizzaPresent = recentPizzas.some((p) => p._id === pizza._id);

  if (!isPizzaPresent) {
        setRecentPizzas([...recentPizzas, pizza]);
  }
      };
      const isNightTime = () => {
        const now = new Date();
        const hour = now.getHours();
        return hour >= 21 || hour < 7;
    };

    return (
        <div>
          {isNightTime() ? null : (
              <>
            <section style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)'}}>
                <div>
                <h1 style={{fontSize:'3rem'}}><p style={{float:'left'}}>Everything is better</p><p style={{float: 'left' }}>with a <span style={{color:'#f13a01'}}>PIZZA!!</span></p></h1>
                <p>
                    <p style={{float: 'left'}}>Pizza is the missing piece that makes every 
                    day complete,</p><p style={{float: 'left'}}>a simple yet delicious joy in 
                    life.<div><p><a  href="feedbacks" className="nav-link btn btn-danger rounded-pill" style={{marginRight: '35px' ,backgroundColor: '#f13a01', padding: '8px 0px',marginTop:'18px',marginLeft:'0px' }}>Reviews</a></p></div></p>
                </p>
                
                </div>
                
                <div>
                <img src="/pizzanew.jpg" className="img-fluid ml-3"style={{ maxWidth: '500px', maxHeight: '350px', float: 'right',marginRight:'83px'}} ></img>
                </div>
            </section>
            <br></br>
            <br></br>
            <h3 style={{ color:'#f13a01'}}><b><center>MENU</center></b></h3>
            <Filter/>
            <div className="row justify-content-center">
               
                {loading ?
                 ( <Loading/> ) : error ? (<Error error='Something went Wrong'/>) : (
                    pizzas.map((pizza) => {
                        return (
                            <div className="col-md-4" key={pizza._id}>
                                <div>
                                    <Pizza pizza={pizza} handlePizzaClick={handlePizzaClick} />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            <div>
    <h3 style={{ color:'#f13a01'}}><b><center>RECENTLY VISITED</center></b></h3>
    <br></br>
    <div className="row justify-content-center">
      {recentPizzas.map((pizza) => {
        return (
          <div className="col-md-4" key={pizza._id}>
            <div className="pizza-container">
            <div className="pizza-details">
              <img src={pizza.image} className="img-fluid hoverable-image" style={{ height: '185px', width: '185px' }} onClick={() => handlePizzaClick(pizza)} />
              <h5>{pizza.name}</h5>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
  </>
            )}
        </div>
    );
}