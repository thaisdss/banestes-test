export const clearFormatCurrency = (value: string) => {
    return value
    .replace(/[R$\s]/g, '')
    .replace(/\./g, '')
    .replace(',', '.') 
}