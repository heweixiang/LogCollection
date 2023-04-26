/**
 * @file XHR2Ajax.ts
 * @description 先简单封装仅供调用，后续这里可以由用户自定义
 */

export function send(url: string, type: string, data: any) {
  const xhr = new XMLHttpRequest();
  xhr.open(type, url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
}
