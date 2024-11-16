import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query'
import { axiosInstance } from './base-axios.ts'
import { CreateNodeTreeParams, RenameNodeTreeParams, TreeResponseDto } from '../types/dtos/tree.dto.ts'
import { AxiosError, AxiosResponse } from 'axios'
import { queryClient } from './query-client.ts'

const URI: { [key: string]: string } = {
  get: '/api.user.tree.get',
  create: '/api.user.tree.node.create',
  rename: '/api.user.tree.node.rename',
  delete: '/api.user.tree.node.delete',
}

const treeName = import.meta.env.VITE_ROOT_NODE

export function useNodeTreeCreate(): UseMutationResult<
  void,
  AxiosError,
  CreateNodeTreeParams
> {
  return useMutation({
    mutationFn: async (params: CreateNodeTreeParams) => await axiosInstance.post(URI.create, {}, {
        params: {
          ...params,
          treeName
        },
      }),
    onSuccess: () => queryClient.refetchQueries({
      queryKey: ['tree-list'],
      type: 'active'
    })
  })
}

export function useNodeTreeRename(): UseMutationResult<
  void,
  AxiosError,
  RenameNodeTreeParams
> {
  return useMutation({
    mutationFn: async (params: RenameNodeTreeParams) => await axiosInstance.post(URI.rename, {}, {
        params: {
          ...params,
          treeName
        },
      }),
    onSuccess: () => queryClient.refetchQueries({
      queryKey: ['tree-list'],
      type: 'active'
    })
  })
}

export function useNodeTreeDelete(): UseMutationResult<
  void,
  AxiosError,
  number
> {
  return useMutation({
    mutationFn: async (nodeId: number) => await axiosInstance.post(URI.delete, {}, {
        params: {
          nodeId,
          treeName
        },
      }),
    onSuccess: () => queryClient.refetchQueries({
      queryKey: ['tree-list'],
      type: 'active'
    })
  })
}

export function useGetTree(): UseQueryResult<TreeResponseDto, AxiosError> {
  return useQuery({
    queryKey: ["tree-list"],
    queryFn: async () => {
      const response: AxiosResponse<TreeResponseDto> = await axiosInstance.post(URI.get, {}, {
        params: {
          treeName
        }
      })
      return response.data
    }
  })
}
