import { ReactElement } from 'react'
import style from './style.module.scss'

export const Spinner = (): ReactElement => {
  return (
    <div className={style.spinnerContainer}>
      <div className={style.spinner}></div>
    </div>
  )
}
