export const formatCurrency = (value: number): string => {
  const formatOption = {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  return (value).toLocaleString('pt-BR', formatOption)
}

export const availableFormat = (value: string): string => {
  const availableMap: Record<string, string> = {
    'false': 'Disponível',
    'true': 'Alugado'
  }
  return availableMap[value] || value
}
