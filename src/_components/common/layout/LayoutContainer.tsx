import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export function LayoutContainer({ children }: ContainerProps) {
  return <div className="py-4 px-4 md:px-5 2xl:px-12">{children}</div>;
}

export function MainContentContainer({ children }: ContainerProps) {
  return <main className="max-w-[1190px] mx-auto mt-10">{children}</main>;
}
