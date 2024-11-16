import { ReactElement } from 'react'
import style from './style.module.scss'

export const SomethingWentWrong = (): ReactElement => (
    <div className={style.container}>
      <h1 className={style.title}>Something went wrong</h1>
      <h2>please refresh page</h2>
      <button onClick={() => location.reload()}>
        Refresh <span>⟳</span>
      </button>
    </div>
)
