import { createContext, useContext, useState, type ReactNode } from "react";

const PlanningContext = createContext<{ values: Record<string, string>; setValues: React.Dispatch<React.SetStateAction<Record<string, string>>> } | null>(null);

export function PlanningPreviewProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<Record<string, string>>({});
  return <PlanningContext.Provider value={{ values, setValues }}>{children}</PlanningContext.Provider>;
}

export function usePlanningPreview() {
  const context = useContext(PlanningContext);
  if (!context) throw new Error("PlanningPreviewProvider is required");
  return context;
}
