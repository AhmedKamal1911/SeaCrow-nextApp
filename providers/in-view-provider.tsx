"use client";
import { createContext, ReactNode, useContext } from "react";
type ContextValue = { isInview: boolean };
const InViewContext = createContext<ContextValue | null>(null);

export default function InViewContextProvider({
  children,
  isInview,
}: {
  children: ReactNode;
  isInview: boolean;
}) {
  return (
    <InViewContext.Provider value={{ isInview }}>
      {children}
    </InViewContext.Provider>
  );
}
export function useInView() {
  const context = useContext(InViewContext);
  if (context === null) {
    throw new Error("You Must use usInView Hook under his provider");
  }
  return context;
}
