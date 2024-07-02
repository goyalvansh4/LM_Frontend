import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'


const GlobalAxios = () => {

  let token = Cookies.get("auth_token");
  
  return (
    <>

    </>
  )
}

export default GlobalAxios