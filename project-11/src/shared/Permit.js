import React from 'react'
import { getCookie } from './Cookie';
import LoginCheck from '../components/LoginCheck';

const Permit = (props) => {
  const { children } = props
  const user = getCookie("Name");
  const token = getCookie("Token");

  if ( user && token) {
    return (
      <div>
        { children }
      </div>
    )
  }

  return <LoginCheck/>
}

export default Permit;
   


   