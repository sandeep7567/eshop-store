import { PropsWithChildren } from "react"

export const Container = ({
  children,
}:PropsWithChildren) => {
  return (
    <div className='mx-auto max-w-7xl'>
      {children}
    </div>
  )
};