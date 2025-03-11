import React, { useMemo } from "react";
import { ReactFlow, Background, Controls, Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface TreatmentPlanProps {
  teeth: Record<string, boolean>;
  gums: Record<string, boolean>;
  bite: Record<string, boolean>;
  tmj: Record<string, boolean>;
  muscles: Record<string, boolean>;
}

const PROBLEM_LABELS: Record<string, string> = {
  // Зубы
  caries: "Лечение кариеса",
  pulpitis: "Лечение пульпита",
  periodontitis: "Лечение периодонтита",
  missing: "Протезирование",
  crown: "Установка коронки",
  implant: "Имплантация",
  // Десны
  gingivitis: "Лечение гингивита",
  recession: "Лечение рецессии",
  bleeding: "Устранение кровоточивости",
  swelling: "Снятие отека",
  // ВНЧС
  clicks: "Устранение щелчков",
  pain: "Снятие боли",
  limitedOpening: "Восстановление открывания",
  locking: "Устранение блокировки",
  hypermobility: "Лечение гипермобильности",
  // Мышцы
  palpationPain: "Снятие болей при пальпации",
  spasm: "Устранение спазма",
  hypertonus: "Снижение гипертонуса",
  asymmetry: "Коррекция асимметрии",
  fatigue: "Устранение утомляемости",
};

const generateTreatmentPlan = (data: TreatmentPlanProps) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let nodeId = 1;

  // Начальный узел
  nodes.push({
    id: "start",
    data: { label: "Диагностика" },
    position: { x: 0, y: 250 },
    type: "input",
    style: { background: "#1976d2", color: "white", minWidth: 150 },
  });

  let lastNodeId = "start";
  let xPos = 200;

  const addProblemNode = (problem: string) => {
    const id = `node_${nodeId++}`;
    nodes.push({
      id,
      data: {
        label: PROBLEM_LABELS[problem] || problem,
      },
      position: { x: xPos, y: 250 },
      style: {
        background: "#05070A",
        color: "white",
        border: "1px solid #1976d2",
        minWidth: 150,
      },
    });
    edges.push({
      id: `edge_${nodeId}`,
      source: lastNodeId,
      target: id,
      animated: true,
      style: { stroke: "#1976d2" },
    });
    lastNodeId = id;
    xPos += 200;
  };

  // Добавляем узлы для каждой категории проблем
  Object.entries(data).forEach(([_, problems]) => {
    Object.entries(problems).forEach(([problem, isSelected]) => {
      if (isSelected && PROBLEM_LABELS[problem]) {
        addProblemNode(problem);
      }
    });
  });

  // Конечный узел
  nodes.push({
    id: "end",
    data: { label: "Завершение лечения" },
    position: { x: xPos, y: 250 },
    type: "output",
    style: { background: "#2e7d32", color: "white", minWidth: 150 },
  });

  edges.push({
    id: `edge_final`,
    source: lastNodeId,
    target: "end",
    animated: true,
    style: { stroke: "#2e7d32" },
  });

  return { nodes, edges };
};

export const TreatmentPlan: React.FC<TreatmentPlanProps> = (props) => {
  const { nodes, edges } = useMemo(() => generateTreatmentPlan(props), [props]);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
