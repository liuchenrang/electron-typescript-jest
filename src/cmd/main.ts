import { ImageCache, ImageMeta } from "./imageCache";
import async from "async"
let images = [
  "http://pic.qqtn.com/up/2017-7/2017070615385277399.jpg",
  "http://picm.bbzhi.com/dongwubizhi/gaoqingkeaixiaomaomibizhi/gaoqingkeaixiaomaomibizhi_414331_m.jpg",
  "http://p1.so.qhmsg.com/t01fa138c072885220d.jpg",
  "https://img.zcool.cn/community/0187995d392ca6a8012187f436ec85.jpg@2o.jpg",
  "http://picm.bbzhi.com/dongwubizhi/shijiegedidongwubizhidierji/animal_2008_animal_1680_desktop_02_44726_m.jpg",
  "http://pic.qqtn.com/up/2017-11/2017112115493386866.jpg",
  "https://img.zcool.cn/community/010c6c5d566487a8012187f4aa669d.jpg@1280w_1l_2o_100sh.jpg",
  "http://dpic.tiankong.com/fs/07/QJ8890236932.jpg",
  "http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1407/15/c2/36309842_1405378903921_mthumb.jpg",
  "https://img.zcool.cn/community/01cfdb5d390aa4a80120695c18f852.jpg@2o.jpg",
  "http://picture.ik123.com/uploads/allimg/170818/12-1FQQ45014.jpg",
  "http://pic.qqtn.com/up/2017-11/2017112115493322500.jpg",
  "http://pic7.58cdn.com.cn/p1/big/n_v2e6fee21965e04e7db384f95cc340d6e0.jpg",
  "https://p0.ssl.img.360kuai.com/t01ca02eb4045aebfa7.gif",
  "https://pics0.baidu.com/feed/503d269759ee3d6d320303579ea252244d4adea4.jpeg?token=20c56550b7bf7270245147c8d7069c8d&s=1DDAAB576F0B6E4142DD3D620300A073",
  "http://pic12.photophoto.cn/20090910/0035035993595153_b.jpg",
  "http://pic6.photophoto.cn/20080220/0035035928271734_b.jpg",
  "https://pic.rmb.bdstatic.com/8003eebf2fd4fa9c0a2b0b4ed1885c82.jpeg",
  "http://photocdn.sohu.com/20110315/Img304353869.jpg",
  "http://pic40.nipic.com/20140325/2839526_100227799000_2.jpg",
  "http://5b0988e595225.cdn.sohucs.com/images/20190512/4afc2ddf32a94396b7ec8460b3b5b3e5.jpeg",
  "http://imgres.guaiguai.com/guaiguai/437/2180672-202007051352035f016a8338283.jpg",
  "http://d00.paixin.com/thumbs/1007995/12747016/staff_1024.jpg?watermark/1/image/aHR0cDovL2QwMC5wYWl4aW4uY29tL3dtX2RwXzM2MF9iaWdnZXIucG5n/dissolve/100/gravity/SouthWest/dx/0/dy/0",
  "http://img95.699pic.com/for_360_sitemap_imgs/005/01/38/11/66.jpg",
  "https://bpic.wotucdn.com/23/54/64/23546491-5e654e520d8aeb3f8c706d89efffe364.jpg!/fw/1024/quality/91/unsharp/true/compress/true/watermark/url/bG9nby53YXRlci52OC5wbmc=/repeat/true/align/center/format/jpg",
  "http://pic23.nipic.com/20120920/10050379_145851151164_2.jpg",
  "http://n.sinaimg.cn/translate/201/w1080h721/20180404/Rzei-fysuuya5342197.jpg",
  "http://n.sinaimg.cn/sinacn09/560/w1080h1080/20180826/af72-hifuvpf8970735.jpg",
  "http://spider.nosdn.127.net/c3b7453cb99e2ed4dbe2c18ba8b46e66.jpeg",
  "http://p4.so.qhmsg.com/t0185cb2353db961cf3.jpg",
  "http://picnew11.photophoto.cn/20170620/gaoqingmaomisheyingtu-28832013_1.jpg",
  "http://5b0988e595225.cdn.sohucs.com/images/20190512/da12301f8654442a88a9864bba087701.jpeg",
  "https://img.zcool.cn/community/01021a5d390c79a8012187f44eb891.jpg@2o.jpg",
  "http://pic249.nipic.com/file/20191026/29172131_175026792449_2.jpg",
  "http://pic14.photophoto.cn/20100109/0035035957625544_b.jpg",
  "http://p0.so.qhmsg.com/t018c667414a3eb1510.jpg",
  "http://n.sinaimg.cn/sinacn10111/434/w640h594/20190118/47d7-hrvcwnk1111672.jpg",
  "http://p4.so.qhmsg.com/t01a7197e09bfb12ccf.jpg",
  "http://p4.so.qhmsg.com/t0130dfe5b0b93c9794.jpg",
  "https://p0.ssl.img.360kuai.com/t0189d00182789069ac.jpg",
  "http://n.sinaimg.cn/sinacn20110/30/w1080h1350/20190311/2612-htzuhtp7140657.jpg",
  "http://5b0988e595225.cdn.sohucs.com/images/20181225/f5a34248199f4fc9a13f4cd99a2b73b1.jpeg",
  "http://p2.so.qhmsg.com/t01ce96cfd8448a6144.jpg",
  "http://p3.so.qhmsg.com/t01d642c502193ca54e.jpg",
  "http://pic2.cxtuku.com/00/03/24/b591fed92f33.jpg",
  "http://p3.music.126.net/2_wdnfquZBJm6SqSdnc3Iw==/7893393976022365.jpg",
  "https://icweiliimg1.pstatp.com/weili/bl/455600175129034932.jpg",
  "https://p0.ssl.img.360kuai.com/t013ac84efc0f577448.jpg?size=500x439",
  "https://bpic.wotucdn.com/23/49/30/23493065-8b5f2f5c822715e43636d6bcdc6505b0.jpg!/fw/264/quality/91/unsharp/true/compress/true/canvas/264x458a0a0/watermark/url/bG9nby53YXRlci52MTAucG5n/repeat/true/align/center",
  "http://pic40.nipic.com/20140325/2839526_100405514000_2.jpg",
  "http://pic18.nipic.com/20120202/1369025_214441992487_2.jpg",
  "http://pic165.nipic.com/file/20180519/24969966_224526440000_2.jpg",
  "http://pic165.nipic.com/file/20180519/24969966_230136840000_2.jpg",
  "https://bpic.wotucdn.com/23/49/30/23493044-826034162049fcbddf3352efe53b2f5a.jpg!/fw/264/quality/91/unsharp/true/compress/true/canvas/264x458a0a0/watermark/url/bG9nby53YXRlci52MTAucG5n/repeat/true/align/center",
  "https://bpic.wotucdn.com/23/54/63/23546362-e1ea6db0ba0478ec9564c66c76c4b2e0.jpg!/fw/1024/quality/91/unsharp/true/compress/true/watermark/url/bG9nby53YXRlci52OC5wbmc=/repeat/true/align/center/format/jpg",
  "http://pic111.nipic.com/file/20160930/5553190_164111199000_2.jpg",
  "http://pic71.nipic.com/file/20150630/9195996_165048561416_2.jpg",
  "http://pic2bj.shejibao.com/img/2016/08/22/b819a3390a25363c3e31d8e43cbad943.jpg@!width_1000",
  "https://img.tuguaishou.com/ips_templ_preview/07/9f/64/lg_3333995_1599879796_5f5c3a74c0fbf.jpg!w1024_w?auth_key=2244832561-0-0-01cdf8c48387a0c1f100097b458b133f",
  "http://pic.ntimg.cn/file/20180619/24888768_145359014000_2.jpg",
  "https://bpic.588ku.com//back_origin_min_pic/21/03/24/5d43c2bbfaac14e2f17f98b96643e3fb.jpg!/fw/750/quality/99/unsharp/true/compress/true",
  "http://img95.699pic.com/for_360_sitemap_imgs/005/01/35/82/34.jpg",
  "https://bpic.588ku.com/back_list_pic/20/11/06/13761997cd0d118e575ca6fd6525a493.jpg!/fh/600/quality/90/unsharp/true/compress/true",
  "https://bpic.588ku.com/back_list_pic/20/08/04/6614c0ce30f1fb7c159c4f0ebd9a6752.jpg!/fh/300/quality/90/unsharp/true/compress/true",
  "http://pic.ntimg.cn/file/20190123/9114691_121117005080_2.jpg",
  "https://pic.ibaotu.com/20/01/05/thumbnail/ingimage/39/ing2_36439_1ef5c5caf3d2af240d097938e2db309d.jpg!w340",
  "http://pic337.nipic.com/file/20201029/31579040_170054633991_2.jpg",
  "http://pic.ntimg.cn/20121009/3858546_175256164147_2.jpg",
  "http://pic.ntimg.cn/file/20180607/25447303_092828640316_2.jpg",
  "https://bpic.588ku.com/back_list_pic/20/08/04/2e635899893dac48aa57fa2654c4210f.jpg!/fh/600/quality/90/unsharp/true/compress/true",
  "https://pic.ibaotu.com/20/01/05/thumbnail/ingimage/65/ing1_50365.jpg!ww7002",
  "http://pic.ntimg.cn/file/20151214/8741746_133230674000_2.jpg",
  "https://img.tuguaishou.com/ips_templ_preview/d3/72/ab/lg_3337322_1600143515_5f60409b47446.jpg!w1024_w?auth_key=2233071596-0-0-a8d4035d757b20d578e8a35379b5bfac",
  "http://pic298.nipic.com/file/20200603/31619609_223454941837_2.jpg",
  "http://img95.699pic.com/search/501/026/820.jpg",
  "https://bpic.588ku.com/back_list_pic/20/11/06/cf5ad0e03a5bb3422313a0f73b10a31e.jpg!/fh/600/quality/90/unsharp/true/compress/true",
  "http://pic.ibaotu.com/20/01/05/thumbnail/ingimage/46/ing2_37946_a96538bdc4ce8495e563af3c836beb83.jpg!w340",
  "http://pic.ntimg.cn/20121019/8075012_205610200182_2.jpg",
  "http://picture.ik123.com/uploads/allimg/160923/4-160923163J0.jpg",
  "http://pic313.nipic.com/file/20200728/31953519_133000430000_2.jpg",
  "http://pic18.nipic.com/20120114/4880174_155036142000_2.jpg",
  "http://pic11.nipic.com/20101209/2531170_125329923932_2.jpg",
  "http://pic183.nipic.com/file/20180928/27574792_164220130983_2.jpg",
  "http://pic.ibaotu.com/01/51/05/58q888piCsbu.jpg-0.jpg!ww700",
  "http://pic244.nipic.com/file/20191001/19605932_141203076300_2.jpg",
  "http://pic246.nipic.com/file/20191011/24199702_150257390031_2.jpg",
  "http://pic242.nipic.com/file/20190923/12304177_084319009000_2.jpg",
  "http://pic292.nipic.com/file/20200515/31542651_160310911526_2.jpg",
  "http://pic37.nipic.com/20140122/17755792_090933285000_2.jpg",
  "http://pic242.nipic.com/file/20190923/12304177_083039959000_2.jpg",
  "http://pic246.nipic.com/file/20191011/24199702_150253412038_2.jpg",
  "https://bpic.588ku.com/back_list_pic/19/09/23/4c6182ebc48eca0fac97c273bf668fbe.jpg!/fh/300/quality/90/unsharp/true/compress/true",
  "http://pic179.nipic.com/file/20180829/27588209_161059322033_2.jpg",
  "http://pic183.nipic.com/file/20180908/27588209_175950562085_2.jpg",
  "http://pic165.nipic.com/file/20180519/24969966_230754610000_2.jpg",
  "http://pic201.nipic.com/file/20181230/26129549_090811497034_2.jpg",
  "http://pic47.nipic.com/20140909/2531170_144501985000_2.jpg",
  "http://pic2.cxtuku.com/00/00/05/b1752a52640c.jpg",
  "http://pic200.nipic.com/file/20181228/24805065_150046507262_2.jpg",
  "http://pic165.nipic.com/file/20180519/24969966_224037824000_2.jpg",
  "http://pic50.photophoto.cn/20190111/0008118875414949_b.jpg",
  "http://pic119.nipic.com/file/20170108/2290814_111214320000_2.jpg",
  "http://pic165.nipic.com/file/20180519/24969966_223229824000_2.jpg",
  "https://bpic.588ku.com/back_list_pic/20/11/06/1fad3ca1a9b35c22d9a2ec29d746da46.jpg!/fh/600/quality/90/unsharp/true/compress/true",
  "http://pic165.nipic.com/file/20180519/24969966_204255863000_2.jpg",
  "http://pic23.nipic.com/20120917/9810586_093838194107_2.jpg",
];

const imageCache = new ImageCache(
  {
    cachePath:"/Users/chen/IdeaProjects/js-2-ts/ele/src/cmd/cache",
    expireTime: 1*10*1000,
    cacheSize: 0
  }
);
  
  
let asyncNum: number  = 3
let meta:ImageMeta<Number> = {url: "http://pic.qqtn.com/up/2017-7/2017070615385277399.jpg", meta: 1}
imageCache.getImage(meta,(err,fail)=>{

},(meta)=>{
    console.log(meta)
});
const metas:ImageMeta<Number>[] = images.slice(3).map((v, i) => {
    let meta: ImageMeta<Number>;
    return { url: v, meta: i };
})
// imageCache.getImages(metas,(err,x)=>{
//     console.log("error",err)
// },(scc)=>{
//     console.log(scc)
// })
imageCache.gc()
 


 
