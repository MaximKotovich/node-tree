import { TreeResponseDto } from '../../../shared/types/dtos/tree.dto.ts'
import { ReactElement } from 'react'
import style from './style.module.scss'
import { TreeNode } from '../../../entities/tree-node'


type TreeListProps = {
  tree: TreeResponseDto
}

export const TreeList = ({ tree }: TreeListProps): ReactElement => {
  return (
    <div className={style.treeListContainer}>
      <TreeNode node={{...tree, name: 'Root'}} />
    </div>
  )
}
