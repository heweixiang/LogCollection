/**
 * @file XHR2Ajax.ts
 * @description 先简单封装仅供调用，后续这里可以由用户自定义
 */
// 引入ajax

export function send(url: string, type: string, data: any) {
  // 解决跨域问题
  const xhr = new XMLHttpRequest();
  xhr.open(type, url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  }
  xhr.onerror = function (err) {
    console.log(err);
  }  
}
