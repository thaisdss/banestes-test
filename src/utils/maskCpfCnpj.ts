export const maskCpfCnpj = (value: string) => {
    value = value.replace(/\D/g,"") 

    if(value.length === 14) {                          
        value= value.replace(/^(\d{2})(\d)/,"$1.$2")             
        value= value.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3") 
        value= value.replace(/\.(\d{3})(\d)/,".$1/$2")           
        value= value.replace(/(\d{4})(\d)/,"$1-$2")              
        return value
    }
                 
    value= value.replace(/(\d{3})(\d)/,"$1.$2")       
    value= value.replace(/(\d{3})(\d)/,"$1.$2")       
    value= value.replace(/(\d{3})(\d{1,2})$/,"$1-$2") 
    return value
}