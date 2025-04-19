export const maskRg = (value: string) => {
    return value.replace(/\D/g,"") 
                .replace(/(\d{1})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1-$2')
}