
export type ModalContent = {
  header: string
  confirmButton: ModalEvent
}

export enum ModalEvent {
  ADD = 'add',
  RENAME = 'rename',
  DELETE = 'delete',
}
