import { Fingerprint } from "../interface/Fingerprint";
// lodash
import _ from "lodash";
// import CryptoJs
import CryptoJS from "crypto-js";
/**
 * GenerateFingerprint：根据浏览器特征生成浏览器指纹
 */
export default class GenerateFingerprint implements Fingerprint {
  // 获取指纹
  getFinger(): string {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const userAgent = navigator.userAgent;
    const plugins = Array.from(navigator.plugins).map(
      (plugin) => plugin.filename || plugin.name
    );
    const timezone = new Date().getTimezoneOffset();
    const language = navigator.language;
    const webglInfo = (() => {
      try {
        const gl =
          canvas.getContext("webgl") ||
          (canvas.getContext("experimental-webgl") as WebGLRenderingContext);
        if (gl) {
          return (
            gl.getExtension("WEBGL_debug_renderer_info")
              ?.UNMASKED_RENDERER_WEBGL || ""
          );
        }
        return "";
      } catch (e) {
        return "";
      }
    })();

    const data = [
      canvas.toDataURL(),
      `${ctx.font} ${ctx.fillStyle} ${ctx.strokeStyle}`,
      `${userAgent}${plugins.join()}${timezone}${language}${webglInfo}`,
    ];

    const hash = CryptoJS.MD5(data.join("")).toString();
    return hash;
  }
}
