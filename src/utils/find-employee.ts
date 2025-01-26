import ORG, { AgentType } from "../agents/org";

const findEmployee = (agent: AgentType, id: string): AgentType | null => {
  if (agent.employees.length === 0) {
    if (agent.id === id) {
      return agent;
    }
    return null;
  }

  for (const employee of ORG.employees) {
    const found = findEmployee(employee, id);
    if (found) {
      return found;
    }
  }

  return null;
};

export default findEmployee;
