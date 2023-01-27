// this helper class will help with dynamically assign string variables to existing strings

class Translate {
    private static toReplace = "%%%"

    public static translate(stringToTransform: string, ...args: string[]){
        for (let arg of args){
            stringToTransform = stringToTransform.replace(this.toReplace, arg)
        }
        return stringToTransform
    }
}

export default Translate
