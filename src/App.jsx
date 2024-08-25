import React from 'react'
import Nav from './Nav'
import "./global.css"
import { BrowserRouter as Router } from 'react-router-dom'
import Categories from './Categories'
import { ChakraProvider } from '@chakra-ui/react'
import { WidgetProvider } from './Context'


const App = () => {
  return (
    <WidgetProvider>
      <ChakraProvider>
        <Router>
          <Nav />
          <Categories />
        </Router>
      </ChakraProvider>
    </WidgetProvider>

  )
}

export default App
