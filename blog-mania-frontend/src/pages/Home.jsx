import React from 'react'
import Nav from '../components/Nav'
import Header from '../components/Header'
import CardList from '../components/CardList'
import Footer from '../components/Footer'

/**
 * Renders the main Home page component of the application.
 * Parameters: None.
 * This component acts as the primary layout for the public-facing homepage, assembling the main navigation, header, blog list, and footer components.
 */
const Home = () => {
  return (
    <>
      <Nav/>
      <Header/>
      <CardList/>
      <Footer/>
    </>
  )
}

export default Home
