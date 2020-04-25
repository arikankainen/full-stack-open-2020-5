import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({message, messageStyle}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messageStyle}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  messageStyle: PropTypes.string.isRequired,
}

export default Notification