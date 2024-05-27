// Feedbacks.js
import { useEffect, useState } from 'react';
import axios from 'axios';
const styles = {
   
    heading: {
      fontSize: '35px',
      textAlign: 'center',
      marginBottom: '30px',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      color: '#ff6600',
    },
}
function Feedbacks() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('/api/pizzas/getallpizzas');
                const allFeedbacks = response.data.reduce((acc, pizza) => {
                    pizza.feedback.forEach((item) => {
                        const existingFeedback = acc[pizza.name] || [];
                        acc[pizza.name] = [...existingFeedback, { ...item, pizzaName: pizza.name, pizzaImage: pizza.image }];
                    });
                    return acc;
                }, {});
                setFeedbacks(allFeedbacks);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };
        fetchFeedbacks();
    }, []);
    return (
        <div className="container">
            <h2 style={styles.heading} className="text-center mt-5 mb-4">Customer Reviews</h2>
            <div className="row justify-content-center">
            {Object.entries(feedbacks).map(([pizzaName, pizzaFeedbacks]) => (
                    <div key={pizzaName} className="col-md-6 m-2" style={{ backgroundColor: '#fff', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)', borderRadius: '20px', padding: '20px' }}>
                         {pizzaFeedbacks.map((feedback, index) => (
                        <div key={index} className="d-flex align-items-center" >
                            {index === 0 && (
                            <img src={feedback.pizzaImage} alt={feedback.pizzaName} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginRight: '20px' }} />
                           
                            )}
                            <div style={{ marginLeft: index === 0 ? '0' : '120px' ,height:'30px'}}>
                            {index === 0 && 
                                <h4  style={{ marginTop: '-10px' }}>{feedback.pizzaName}</h4>}
                                <p className="d-flex align-items-start"><strong>{feedback.customerName}</strong>: {feedback.feedback}</p>
                            </div>
                           
                        </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Feedbacks;
