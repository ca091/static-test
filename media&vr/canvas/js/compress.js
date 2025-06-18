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
        if (img.width < maxWidth && img.height < maxHeight) {
          resolve({ file: file, width: img.width, height: img.height });
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
              resolve({ file: compressedFile, width: canvas.width, height: canvas.height });
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

export function getCanvasLimits() {
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  let maxTextureSize = 0;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    }
  } catch (e) {
    console.warn(e)
  }

  return {
    userAgent: navigator.userAgent,
    // 基于 WebGL 纹理大小的单边最大尺寸
    maxTextureSize,
    // 是否为苹果设备
    isAppleDevice: isIOS
  }
}

export function setCanvasWH(img, maxL = 0) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw Error('Unable to get 2D context from canvas')
  }
  if (maxL) {
    const scale = Math.min(maxL / img.width, maxL / img.height, 1);
    console.log('canvas scale', scale)
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
  } else {
    console.log('canvas 原图大小', img.width, img.height)
    canvas.width = img.width
    canvas.height = img.height
  }
  return { canvas, ctx }
}

export async function generateImageBlob (url, bgColor, maxL){
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = function () {
      try {
        const { canvas, ctx: context } = setCanvasWH(img, maxL)
        context.fillStyle = bgColor === "transparent" ? "transparent" : `${bgColor}`;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            if (!maxL) return generateImageBlob(url, bgColor, 4096)
            else if (maxL >= 4096) return generateImageBlob(url, bgColor, maxL - 1024)
            else {
              reject(new Error("Failed to create image blob"));
            }
          }
        }, "image/png");
      } catch (error) {
        reject(
          new Error(
            `Error processing image: ${error instanceof Error ? error.message : String(error)}`
          )
        );
      }
    };

    img.onerror = function () {
      reject(new Error("Image loading failed"));
    };
  });
}
