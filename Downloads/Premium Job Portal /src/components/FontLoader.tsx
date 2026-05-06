
import React from 'react';

export const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
    
    body {
      font-family: 'Inter', 'Hind Siliguri', sans-serif;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Hind Siliguri', 'Inter', sans-serif;
    }
  `}</style>
);
