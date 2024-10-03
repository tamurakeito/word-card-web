export const Spacer = ({
  width = 0,
  height = 0,
}: {
  width?: number;
  height?: number;
}) => {
  return <div style={{ width: width, height: height }}></div>;
};
