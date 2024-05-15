import React from 'react'
import styles from './NotFoundFilter.module.scss'

const NotFoundFilter = () => {
  return (
    <div className={styles.root}>
    <h1>
      <span>😕</span>
      <br />
      Ничего не найдено
    </h1>
  </div>
  )
}

export default NotFoundFilter
