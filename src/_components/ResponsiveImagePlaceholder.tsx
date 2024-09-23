const ResponsiveImagePlaceholder = ({
  width = 400,
  height = 400,
}: {
  width?: number;
  height?: number;
}) => (
  <div
    className={`w-[${width}px] h-[${height}px] 2xl:w-[500px] bg-gray-200 animate-pulse rounded-md`}
  />
);

export default ResponsiveImagePlaceholder;
