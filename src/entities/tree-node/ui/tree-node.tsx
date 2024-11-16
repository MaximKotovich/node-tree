import { ReactElement, useMemo, useState } from 'react'
import { TreeNodeDto } from '../../../shared/types/dtos/tree.dto.ts'
import { ModalContent, ModalEvent } from '../../../shared/ui-kit/modal/lib/types.ts'
import style from './style.module.scss'
import { Input } from '../../../shared/ui-kit/input'
import { Modal } from '../../../shared/ui-kit/modal'
import { useNodeTreeCreate, useNodeTreeDelete, useNodeTreeRename } from '../../../shared/api/tree.api.ts'
import { SomethingWentWrong } from '../../../widgets'
type TreeNodeProps = {
  node: TreeNodeDto
}

export const TreeNode = ({ node }: TreeNodeProps): ReactElement => {
  const { mutate: nodeTreeCreateMutate, isError: isErrorCreateNode } = useNodeTreeCreate()
  const { mutate: nodeTreeRenameMutate, isError: isErrorRenameNode } = useNodeTreeRename()
  const { mutate: nodeTreeDeleteMutate, isError: isErrorDeleteNode } = useNodeTreeDelete()

  const [isExpanded, setIsExpanded] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [modalContent, setModalContent] = useState<ModalContent>({
    header: '',
    confirmButton: ModalEvent.ADD
  })

  const buildModalChildren = useMemo(() =>
    modalContent.confirmButton === ModalEvent.DELETE
      ? <p>Do you want to delete "{node.name}"?</p>
      : <Input value={inputValue} onChange={setInputValue} />,
    [modalContent, inputValue, node])

  const handleOpenModal = (event: ModalEvent, node:TreeNodeDto): void => {
    setInputValue(node.name)

    switch (event) {
      case ModalEvent.ADD: setModalContent(() => ({
        header: 'Add',
        confirmButton: ModalEvent.ADD,
      }))
        break
      case ModalEvent.RENAME: setModalContent(() => ({
        header: 'Rename',
        confirmButton: ModalEvent.RENAME,
      }))
        break
      case ModalEvent.DELETE: setModalContent(() => ({
        header: 'Delete',
        confirmButton: ModalEvent.DELETE,
      }))
    }
    setIsOpenModal(true)
  }

  const handleConfirm = () => {
    switch (modalContent.confirmButton) {
      case ModalEvent.ADD: nodeTreeCreateMutate({ parentNodeId: node.id, nodeName: inputValue })
        break
      case ModalEvent.RENAME: nodeTreeRenameMutate({ nodeId: node.id, newNodeName: inputValue })
        break
      case ModalEvent.DELETE: nodeTreeDeleteMutate(node.id)
    }
    setIsOpenModal(false)
  }

  const handleCloseModal = (): void => {
    setIsOpenModal(false)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if(isErrorDeleteNode || isErrorCreateNode || isErrorRenameNode) {
    return <SomethingWentWrong />
  }

  return (
    <>
      <div className={style.treeConeContainer}>
        <div onClick={toggleExpand} className={style.treeNodeContent}>
          {node.children?.length > 0 && <span>{isExpanded ? '▼' : '▶'}</span>}
          {node.name}
          <div className={style.treeNodeEvents} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => handleOpenModal?.(ModalEvent.ADD, node)}>&#10010;</button>
            <button onClick={() => handleOpenModal?.(ModalEvent.RENAME, node)}>&#9998;</button>
            <button onClick={() => handleOpenModal?.(ModalEvent.DELETE, node)}>&#10006;</button>
          </div>
        </div>
        {isExpanded && node.children && (
          <div>
            {node.children.map((child) => (
              <TreeNode key={child.id} node={child} />
            ))}
          </div>
        )}
      </div>
      <Modal
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        header={modalContent.header}
        confirmButton={modalContent.confirmButton}
        onConfirm={handleConfirm}
      >
        {buildModalChildren}
      </Modal>
    </>
  )
}
