import { PropsWithChildren } from "react"

interface IProps extends PropsWithChildren {
  className?: string
}

const Wrapper = ({ children, ...props }: IProps) => {
  return (
    <div
      style={{
        display: "flex",
      }}
      {...props}
    >
      {children}
    </div>
  )
}
export default Wrapper
