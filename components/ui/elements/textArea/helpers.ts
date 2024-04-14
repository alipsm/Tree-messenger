import TextBoxInterface from "./interface"

const textBoxHelpers =(()=>{
    const getColor=(status:"success"|"error")=>{
        let colors={
            success:"#19C18F",
            error:"#FF8686"
        }
        return colors[status]
    }
    return {getColor}
})()

module.exports = textBoxHelpers
