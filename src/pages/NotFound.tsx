import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
   return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
         <h1>404 - Not Found</h1>
         <p>The page you're looking for doesn't exist.</p>
         <Link to="/">Go Home</Link>
      </div>
   );
};

export default NotFound;
