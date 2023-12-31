const replaceDot = (text: string) => {
    // return text.replace(".", '[dot]')
    // replace all
    return text.replace(/\./g, '[dot]')
}

const resumeDot = (text: string) => {
    // return text.replace("[dot]", '.')
    // replace all
    return text.replace(/\[dot\]/g, '.')
}

export { replaceDot, resumeDot }