export function getPreloadImg(imgSrc) {
  return new Promise(resolve => {
    const img = new Image()
    // img.crossOrigin = "Anonymous";
    img.src = imgSrc
    img.onload = () => resolve(img)
  })
}

export function fileToImg(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export function compressImage(file, maxWidth = 1280, maxHeight = 1280, quality = 1) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('无法获取 canvas 的 2D 上下文'));
          return;
        }

        // 计算缩放比例
        const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        // 绘制图片到 canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 导出压缩后的图片
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, { type: file.type });
              resolve(compressedFile);
            } else {
              reject(new Error('图片压缩失败'));
            }
          },
          file.type,
          quality // 压缩质量，范围 0-1
        );
      };
      img.onerror = () => reject(new Error('图片加载失败'));
    };
    reader.onerror = () => reject(new Error('文件读取失败'));
  });
}
