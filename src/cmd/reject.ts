async function loadData(bool:boolean): Promise<string>{
    return new Promise<string>((resolve, reject)=>{
            if(bool){
                resolve("success")
            }else{
                reject("fail")
            }
    })
}
(async () => {
    try {
        const result = await loadData(false);
    } catch (error) {
        console.log(error)
    }
})() 