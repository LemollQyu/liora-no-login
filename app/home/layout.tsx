import { ReactNode } from "react";

interface LayoutHomeProps {
  children: ReactNode;
}

export default function LayoutHome({ children }: LayoutHomeProps) {
  return (
    <>
      <div className="px-3 pt-5 bg-graysmooth min-h-screen">{children}</div>
    </>
  );
}
