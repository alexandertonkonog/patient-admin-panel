export const TEETH_OPTIONS = [
  { label: "Кариес", value: "caries" },
  { label: "Пульпит", value: "pulpitis" },
  { label: "Периодонтит", value: "periodontitis" },
  { label: "Отсутствует", value: "missing" },
  { label: "Искусственная коронка", value: "crown" },
  { label: "Имплант", value: "implant" },
] as const;

export const GUMS_OPTIONS = [
  { label: "Гингивит", value: "gingivitis" },
  { label: "Пародонтит", value: "periodontitis" },
  { label: "Рецессия десны", value: "recession" },
  { label: "Кровоточивость", value: "bleeding" },
  { label: "Отек", value: "swelling" },
] as const;

export const BITE_OPTIONS = [
  { label: "Открытый прикус", value: "open" },
  { label: "Глубокий прикус", value: "deep" },
  { label: "Перекрестный прикус", value: "cross" },
  { label: "Мезиальный прикус", value: "mesial" },
  { label: "Дистальный прикус", value: "distal" },
] as const;

export const TMJ_OPTIONS = [
  { label: "Щелчки", value: "clicks" },
  { label: "Боли", value: "pain" },
  { label: "Ограничение открывания", value: "limitedOpening" },
  { label: "Блокировка", value: "locking" },
  { label: "Гипермобильность", value: "hypermobility" },
] as const;

export const MUSCLES_OPTIONS = [
  { label: "Боли при пальпации", value: "palpationPain" },
  { label: "Спазм", value: "spasm" },
  { label: "Гипертонус", value: "hypertonus" },
  { label: "Асимметрия", value: "asymmetry" },
  { label: "Утомляемость", value: "fatigue" },
] as const;
