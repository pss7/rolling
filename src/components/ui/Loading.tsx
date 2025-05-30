import { FadeLoader } from "react-spinners";

interface LoadingProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function Loading({
  width,
  height,
  color
}: LoadingProps) {

  return (
    <>
      <FadeLoader width={width} height={height} color={color} />;
    </>
  )

}