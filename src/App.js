import React, { useState } from 'react';
import { Router } from '@reach/router';
import ThemeContext from './ThemeContext';
import NavBar from './NavBar';
import Details from './Details';
import SearchParams from './SearchParams';

const App = () => {
  const themeHook = useState('peru');

  return (
    <ThemeContext.Provider value={themeHook}>
      <div>
        <NavBar />
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
