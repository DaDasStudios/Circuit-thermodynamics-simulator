
interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: string
}

export const buttomThemes = {
  blue: "border-blue-500 text-blue-600 hover:bg-blue-500 focus:outline-blue-900",
  red: "border-red-500 text-red-600 hover:bg-red-500 focus:outline-red-900",
}

const Button = (props: IProps) => {
  return (
    <button
      className={`${props.theme && "button " + props.theme} ${props.className}`}
      {...props}
    ></button>
  )
}
export default Button
