import * as fs from "fs";
import * as os from "os"
import { resolve } from "path/posix";
import { loadImage } from "sb-canvas";
function sum(a, b) {
    return a + b;
  }
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
test('test request', () => {
    expect(sum(1, 2)).toBe(3);
});

test("file exist do ",()=>{
    let dirpath = os.homedir() + "/ddd/d3d"
    const path =  fs.promises.mkdir(dirpath, { recursive: true });
    let i = 1;
    path.then(x=>{
         i = 2;
        //  console.log(x)
         expect(i).toBe(2);
    }).catch(x=>{
        i = 3;
        expect(i).toBe(2);
    })
})

test("promose reject",()=>{

})