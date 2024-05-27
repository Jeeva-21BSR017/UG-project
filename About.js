import React from 'react';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    padding: '20px',
  },
  heading: {
    fontSize: '36px',
    textAlign: 'center',
    marginBottom: '30px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#ff6600',
  },
  section: {
    marginBottom: '40px',
  },
  sectionHeading: {
    fontSize: '24px',
    marginBottom: '20px',
    textTransform: 'uppercase',
    color: '#ff6600',
  },
  content: {
    fontSize: '18px',
    lineHeight: '1.6',
  },
  mapContainer: {
    width: '100%',
    height: '400px',
    marginBottom: '20px',
  },
};

const AboutPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Pizza Square</h1>
      
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>About Us</h2>
        <p style={styles.content}>
          At Pizza Square, we're passionate about crafting delicious pizzas using the freshest ingredients and traditional recipes. 
          Our mission is to provide our customers with an unforgettable dining experience every time they visit us.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>Our Menu</h2>
        <p style={styles.content}>
          Explore our mouthwatering menu featuring a variety of pizzas, pastas, sandwiches, and desserts. 
          Whether you're craving a classic Margherita pizza or a gourmet pasta dish, we have something for everyone.
        </p>
        <p style={styles.content}>
          Here are some highlights from our menu:
        </p>
        <ul style={{ ...styles.content, listStyle: 'none', paddingLeft: 0 }}>
          <li>- Margerita</li>
          <li>- Peppy Paneer</li>
          <li>- Chicken Sausage</li>
          <li>- Non Veg Supreme</li>
          <li>- Golden Corn Pizza</li>
          <li>- Indi Chicken Tikka</li>
          <li>- Jalapeno & Red Paprika Pizza</li>
          <li>- Pepper Barbeque Chicken</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>Contact Us</h2>
        <div style={styles.mapContainer}>
          <iframe
            title="Pizza Square Location"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3911.6739796939523!2d77.59506774793154!3d11.358506570694205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1707654640824!5m2!1sen!2sin"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <p style={styles.content}>
        <i className="fas fa-map-marker-alt"></i> Visit us at:
          <br />
          3,Vip Nagar,Kondayankattu Valasu,Kanjikovil-638116
          <br />
          <i className="fas fa-phone"></i> Phone: 9345992051
    <br />
    <i className="fas fa-envelope"></i> Email: kaviyaprabha11@gmail.com
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
