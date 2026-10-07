import type { ComponentType } from "react";
import type { Template } from "@/data/templates";
import Barbearia from "./Barbearia";
import Transportadora from "./Transportadora";
import Joalheria from "./Joalheria";
import Clinica from "./Clinica";
import Restaurante from "./Restaurante";

export const demos: Record<string, ComponentType<{ t: Template }>> = {
  barbearia: Barbearia,
  transportadora: Transportadora,
  joalheria: Joalheria,
  clinica: Clinica,
  restaurante: Restaurante,
};
