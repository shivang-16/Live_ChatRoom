import React from 'react'
import '../Styles/message.scss'

const Message = ({user, message, messageClass}) => {
  if(user){

  }
  return (
  
    <div className='message-box'>    
        <div className={`message ${messageClass}`}>
       <div className='username'>{user}</div>
        {message}
        
        </div>
        
    </div>
     
  )
}

export default Message