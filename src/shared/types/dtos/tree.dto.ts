export type TreeResponseDto = {
  id: number
  name: string
  children: TreeNodeDto[]
}


export type TreeNodeDto = {
  id: number
  name: string
  children: TreeNodeDto[]
}


export type CreateNodeTreeParams = {
  parentNodeId: number
  nodeName: string
}

export type RenameNodeTreeParams = {
  nodeId: number
  newNodeName: string
}

