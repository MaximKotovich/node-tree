import style from './style.module.scss'
import { ChangeEvent, InputHTMLAttributes, ReactElement } from 'react'

type InputProps = {
  onChange: (value: string) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

export const Input = (props: InputProps): ReactElement => (
  <input
    {...props}
    onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)}
    className={style.input}
  />
)
