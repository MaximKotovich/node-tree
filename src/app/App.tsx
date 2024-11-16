import { queryClient } from '../shared/api/query-client.ts'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactElement } from 'react'
import './style.scss'
import { TreePage } from '../pages'

function App(): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <TreePage />
    </QueryClientProvider>
  )
}

export default App
