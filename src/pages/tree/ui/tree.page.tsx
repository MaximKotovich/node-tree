import { ReactElement } from 'react'
import style from './style.module.scss'
import { useGetTree } from '../../../shared/api/tree.api.ts'
import { SomethingWentWrong } from '../../../widgets'
import { TreeList } from '../../../features'
import { Spinner } from '../../../shared/ui-kit/spinner'


export const TreePage = (): ReactElement => {
  const { data, isError, isLoading } = useGetTree()

  if (isError) {
    return <SomethingWentWrong />
  }

  if(isLoading) {
    return <div className={style.spinnerContainer}>
      <Spinner/>
    </div>
  }

  return (
    <section className={style.container}>
      {data ? <TreeList tree={data} /> : <p>Root</p>}
    </section>
  )
}
