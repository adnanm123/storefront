import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Categories from './Components/Categories';
import Products from './Components/Products';
import ActiveCategory from './Components/ActiveCategory';

function App() {
  return (
    <div className="App">
      <Header />
        <ActiveCategory />
        <Categories />
        <Products />
        <Footer />
    </div>
  )
}

export default App
