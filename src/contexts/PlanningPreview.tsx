import { createContext, useContext, useState, type ReactNode } from "react";
import type { ScenarioInput } from "@/lib/finance/scenarios";

export type ReviewSelection = {
  scenario: ScenarioInput;
  sourceKey: string;
  baselineMonthly: number;
  confirmed: boolean;
};

const PlanningContext = createContext<{
  values: Record<string, string>;
  setValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  reviewSelection: ReviewSelection | null;
  setReviewSelection: React.Dispatch<React.SetStateAction<ReviewSelection | null>>;
} | null>(null);

export function PlanningPreviewProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [reviewSelection, setReviewSelection] = useState<ReviewSelection | null>(null);
  return <PlanningContext.Provider value={{ values, setValues, reviewSelection, setReviewSelection }}>{children}</PlanningContext.Provider>;
}

export function usePlanningPreview() {
  const context = useContext(PlanningContext);
  if (!context) throw new Error("PlanningPreviewProvider is required");
  return context;
}
