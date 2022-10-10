import { ThemeProvider } from "styled-components";
import Footer from "./components/Footer";
import Header from "./components/Header";
import React from "react";
import { Cardlist } from "./components/CardList";
import GlobalStyles from "./components/styles/Global";



const theme = {
  colors: {
    header: '#fff',
    body: 'radial-gradient(ellipse at bottom, #033297 20%, black)',
    footer: '#fff'
  },
  mobile: '768px'
}

function App() {

  return (
    <ThemeProvider theme = {theme}>
    <>
    <GlobalStyles />
    <Header/>
    <Cardlist/>
    <Footer/>
    </>
    </ThemeProvider>
  );
}

export default App;
