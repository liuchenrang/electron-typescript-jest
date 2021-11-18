import * as fs from "fs";
fs.stat("/Users/chen/IdeaProjects/js-2-ts", (x, e) => {
    // console.log(x,e)
    if (e && e.isDirectory()) {
       console.log(" exxist")
    } else {
       console.log("not exxist")

    }
})