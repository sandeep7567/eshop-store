import { FC } from 'react'

interface NotFoundProps {
  message?: string;
}

export const NotFound: FC<NotFoundProps> = ({
  message="No results found!",
}) => {
  return (
    <div className='flex justify-center items-center h-full w-full text-muted-foreground'>
      {message}
    </div>
  )
};