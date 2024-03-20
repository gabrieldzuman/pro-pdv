import React from 'react';

function PDVPage({ onLogout }) {
  return (
    <div>
      <h1>Point of Sale (PDV) App</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default PDVPage;
