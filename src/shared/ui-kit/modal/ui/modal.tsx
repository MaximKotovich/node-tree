import { PropsWithChildren, ReactElement } from 'react'
import style from "./style.module.scss"
import { ModalContent } from '../lib/types.ts'
import { Button } from '../../button'

type ModalProps = PropsWithChildren<{
  onClose: () => void
  isOpen: boolean
  onConfirm: () => void
} & ModalContent>

export const Modal = ({ header, confirmButton, isOpen, onClose, onConfirm, children }: ModalProps): ReactElement | null => {

  if(!isOpen){
    return null
  }

  return (
    <div className={style.modalContainer} onClick={onClose}>
      <div className={style.modalWindow} onClick={(e) => e.stopPropagation()}>
        <div className={style.modalHeader}>{header}</div>
        <div className={style.modalContent}>
          {children}
        </div>
        <div className={style.modalButtons}>
          <Button title="CANCEL" onClick={() => onClose()} />
          <Button title={confirmButton.toUpperCase()} onClick={onConfirm} variant={confirmButton === 'delete' ? 'delete' : 'confirm'} />
        </div>
      </div>
    </div>
  )
}
