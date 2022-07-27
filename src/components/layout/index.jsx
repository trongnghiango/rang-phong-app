import React from 'react';
import Footer from '../footer';
import Header from '../header';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 relative">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;