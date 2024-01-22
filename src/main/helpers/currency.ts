export function formatCurrency(value: number): string {
    const formatOption = {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };

    return (value).toLocaleString('pt-BR', formatOption)
}