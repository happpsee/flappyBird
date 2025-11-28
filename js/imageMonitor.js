


/**
 *  图片加载管理器, 提供图片的加载，缓存和管理功能
 * 
 * @returns {Object} 图片管理实例
 * @returns {Function} returns.getImage 获取已经加载的图片对象
 * @returns {Function} returns.loadImage 批量加载图片
 *  
 */
class ImageMonitor {
  constructor() {
    this.imgArray = {};
    this.defaultImage = null;//可设置默认图片
    this.maxRetires = 3;//最大重试次数
  }


  /**
   * 获取已经加载的图片对象
   * @param {string} src 图片的src链接 
   * @returns {Image} 对应的图片对象
   */
  getImage(src)  {
    return this.imgArray[src] || this.defaultImage;
  }


  loadSingleImage(src, retries = this.maxRetires) {
   return  new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      
      img.onload = () => {
        resolve(img);
      }
      img.onerror = () => {
        if (retries <= 0) {
          reject(Error('图片加载失败'));
          return false;
        }
        
        setTimeout(() => {
          this.loadSingleImage(src, retries - 1)
          .then(resolve)
          .catch(reject);
        }, 500);
      }
    });
  }

  /**
   * 批量加载图片, 所有图片加载完成后执行完成回调
   * @param {Object} arr 图片链接对象 
   * @param {Function} callback 所有图片加载完成后要执行的回调函数 
   */
   async loadImage(arr)  {
    const entries = Object.entries(arr);

    try {
      await Promise.all(entries.map(async ([title, src]) => {
          const img = await this.loadSingleImage(src);
          this.imgArray[title] = img;
      }));
    } catch(err) {
      throw err;
    }
  }
}


export const imageMonitor = new ImageMonitor();

