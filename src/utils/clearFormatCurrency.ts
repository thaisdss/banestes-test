export const clearFormatCurrency = (value: string) => {
    value = value.replace(/[R$\s]/g, '')

    if(value.includes(',')) {
        value = value.replace(',', '.')
        value = value.replace('.', '')
    }

    return value
}