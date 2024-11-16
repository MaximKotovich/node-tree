import style from './style.module.scss'

type ButtonProps = {
  title: string
  variant?: 'confirm' | 'delete' | 'clear'
  onClick?: () => void
}

export const Button = ({ variant = 'clear', title, onClick }: ButtonProps) => {


  return (
    <button className={`${style.buttonContainer} ${style[variant]}`} onClick={onClick}>
      {title}
    </button>
  )
}
