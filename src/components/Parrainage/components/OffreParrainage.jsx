import React from 'react';

const styles = {
  container: {
    backgroundColor: '#2D3748', // This is a guess, replace with the correct color
    color: 'white',
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '480px',
    position: 'relative',
    overflow: 'hidden',
  },
  stripe: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    width: '100%',
    backgroundImage: 'linear-gradient(to right, transparent, #FFA8A8, transparent), linear-gradient(to right, transparent, #F6AD55, transparent)',
    mixBlendMode: 'screen', // This may need adjustment based on your actual background colors
  },
  text: {
    position: 'relative',
    zIndex: '1', // Make sure text appears above the pseudo-element
  },
  header: {
    marginBottom: '10px', // Adjust space between header and main text
  },
  main: {
    fontWeight: 'bold',
    fontSize: '24px', // Adjust size to fit your design
  },
  details: {
    fontSize: '16px', // Adjust size to fit your design
  }
};

const OffreParrainage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.stripe}></div>
      <div style={styles.text}>
        <div style={styles.header}>Invitez vos proches indépendants</div>
        <div style={styles.main}>1 mois offert</div>
        <div style={styles.details}>
          pour vous et votre filleul à chaque parrainage.
        </div>
      </div>
    </div>
  );
};

export default OffreParrainage;
