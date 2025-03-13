class LoopingStructure{
    constructor(){
        this.data = [];
     }  
     loops(){
        let data = ["Apple","Banana","Mango","Orange"];
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            console.log(element);
            console.log(`Fruit at index ${i} is ${element}`);
            
        }
        // for (;;) {
        //     console.log("Infinite loop");
        //     // break;
            
        // }
        // for (let i="aniket"; i.length<10; i+="aniket") {
        //     console.log(i);
        // }
        
     }
}
LoopingStructure.prototype.loops();
