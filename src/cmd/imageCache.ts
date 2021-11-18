import * as fs from "fs";
import request from "request";
import * as crypto from "crypto";
import * as urllib from "url";
import * as path from "path"
import async from "async"
import * as os from "os";

export type ImageMeta<T> = {
  url: string
  meta: T
  cacheFile?: string
}

export class ImageCache {
  private readonly pathLocal: string;
  private readonly expireTime: number;
  // unit M
  private readonly cacheSize: number = 100
  private mockNow:number = 0
  constructor(args: {cachePath: string, expireTime: number, cacheSize?: number}) {
    this.pathLocal = args.cachePath;
    this.expireTime = args.expireTime
    if (args.cacheSize > -1){
      this.cacheSize = args.cacheSize
    }
  }
  setMockNow(now: number){
      this.mockNow = now
  }
  isCacheSync(url: string): boolean {
    return fs.existsSync(this.getFullPathFile(url));
  }

  md5Factory(): crypto.Hash {
    return crypto.createHash("md5");
  }

  isCache(
    url: string,
    yesCallback: (url: string, fullPath: string) => void,
    noCallback: (url: string, fullPath: string) => void
  ): void {
    const fullPath = this.getFullPathFile(url);
    fs.stat(fullPath, (err, stats) => {
      if (!err) {
        yesCallback(url, fullPath);
      } else {
        noCallback(url, fullPath);
      }
    });
  }

  getImageExt(url: string): string {
    const urlInfo = new urllib.URL(url);
    const paths = urlInfo.pathname.split("/");
    const lastPath = paths[paths.length - 1];
    const lastExtInfo: string[] = lastPath.split(".");
    const ext = lastExtInfo.length > 0 ? lastExtInfo[lastExtInfo.length - 1] : "";
    const extInfo = ext.split("!");
    if (extInfo.length > 1) {
      return extInfo[0]
    }
    return ext;
  }

  debug(info: any): void {
    console.error("info", info);
  }

  mkdirSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    }
    if (this.mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
    return false;
  }

  getImage<T>(imageMeta: ImageMeta<T>, fail: (error: Error, meta: ImageMeta<T>) => void, success: (dest: ImageMeta<T>) => void): void {
    const fileName = this.getFullPathFile(imageMeta.url);
    let that = this
    this.isCache(imageMeta.url, function (url, fullPath) {
      imageMeta.cacheFile = fullPath
      success(imageMeta);
      return
    }, function (url, fullPath) {
      const crateResult = fs.promises.mkdir(path.parse(fullPath).dir, {recursive: true});
      crateResult.then(() => {
        request(imageMeta.url)
          .on("error", function (err: any) {
            fail(err, imageMeta);
          })
          .on('close', function () {
            imageMeta.cacheFile = fileName
            success(imageMeta);
          })
          .pipe(fs.createWriteStream(fileName));
      }).catch(x => {
        fail(x, imageMeta)
      })
    })
    return;
  }

  getImages<T>(imageMetas: ImageMeta<T>[], fail: (error: Error, failMeata: ImageMeta<T>[]) => void, success: (dest: ImageMeta<T>[]) => void): void {
    //imageMetas
    let asyncNum = 5
    const reduce = function (err: Error, result: ImageMeta<T>[]): void {
      if (err != null) {
        fail(err, result)
      } else {
        success(result);
      }
    };
    let itemProcess = (item: ImageMeta<T>, callback: async.AsyncResultCallback<ImageMeta<T>, Error>) => {
      // 请求成功
      this.getImage(item, (err, meat) => {
        callback(err, item);
      }, (suc) => {
        callback(null, item);
      });
    };
    async.mapLimit(imageMetas, asyncNum, itemProcess, reduce)
  }

  hash(url: string): string {
    return this.md5Factory().update(url).digest("hex");
  }
  getNow(): number{
    if(this.mockNow > 0){
      return this.mockNow
    }
   return +new Date(); 
  }
  //相同网址,有效期内拥有相同的本地名称
  getFullPathFile(url: string): string {
    const hex = this.hash(url);
    const ext = this.getImageExt(url);
    const time = this.getNow();
    const timeDiff = time - time % this.expireTime + this.expireTime;
    return path.join(this.pathLocal,  hex + "." + timeDiff + "." + ext)
  }

  protected getGcTime(fileName: string): number {
    const fileInfo = fileName.split(".");
    if (fileInfo.length == 3) {
      return parseInt(fileInfo[1]);
    }
    return 0;
  }
  protected async getCacheSize(files) : Promise<number>{
    let total:number = 0
    for (const f of files) {
      const localCacheFile = path.join(this.pathLocal, f);
      let stat = await fs.promises.stat(localCacheFile);
      if (stat){
        total += stat.size
      }
    }
    return new Promise<number>(function (resolve, reject) {
      if (total == 0){
        reject("error")
      }else{
        resolve(total)
      }
    })
  }
  protected async removeCache(files:string[]) : Promise<boolean>{
    this.debug("imageCache do removeCache")
    let now: number = this.getNow()
    let expireTime: number = this.expireTime;
    let error:Error
    for (const f of files) {
      const localCacheFile = path.join(this.pathLocal, f);
      const gcTime = this.getGcTime(localCacheFile)
      if (gcTime == 0) {
        this.debug(`removeCacheError ${localCacheFile} gcTime ${gcTime} now ${now}`)
        fs.unlink(localCacheFile, (err) => {
          this.debug(err)
          error = err
        })
      } else {
        //防止并发,到期后删除到期数据的5s前的
        if (gcTime + (expireTime + 5000) < now) {
          let gcDate = new Date(gcTime).toLocaleString()
          this.debug(`removeCacheSucc ${localCacheFile} gcTime ${gcDate} now ${now}`)
          fs.unlink(localCacheFile, (err) => {
            error = err
          })
        }else{
          let gcDate = new Date(gcTime).toLocaleString()
          this.debug(`noNeedCacheRemove ${localCacheFile} gcTime ${gcDate} now ${now}`)
        }
      }
    }
    return new Promise<boolean>(function (resolve, reject) {
      if (error){
        reject(error)
      }else{
        resolve(true)
      }
    })
  }
  gc():void {
    (async  () => {
      try {
        let files = await fs.promises.readdir(this.pathLocal);
        if (files) {
            if(this.cacheSize > 0){
                let cacheSize = await this.getCacheSize(files);
                const useSize = cacheSize / 1024 / 1024;
                // this.debug("imageCache use size " +  useSize + " M")
                //缓存大于1024M
                if (useSize > this.cacheSize) {
                  await this.removeCache(files)
                }else{
                  this.debug("imageCache disk is not full useSize " + useSize + " useSet " + this.cacheSize)
                }
            }else{
              await this.removeCache(files)
            }
        }
      } catch (e) {
        this.debug(e)
      }
    })()
  }
}
export default new ImageCache(
  {
    cachePath: path.join(os.homedir() ,"erpImageCache"),
    expireTime: 2*60*1000,
    cacheSize: 100
  }
)
