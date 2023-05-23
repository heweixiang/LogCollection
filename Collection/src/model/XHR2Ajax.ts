/**
 * @file XHR2Ajax.ts
 * @description 先简单封装仅供调用，后续这里可以由用户自定义
 */
// 引入ajax
import { LogCollectionToolsConfigInterface } from "../interface/LogCollectionToolsConfig";

/**
 * 
 * @param _config 基础收集配置
 * @param url 请求接口
 * @param type 请求类型
 * @param data 请求数据
 */
export function send(
  _config: LogCollectionToolsConfigInterface,
  url: string,
  type: string,
  data: any
) {
  const URL = _config.baseUploadUrl + url;
  const form = checkCollectForm(
    URL,
    type,
    "multipart/form-data"
  ) as HTMLFormElement;
  addInputToForm(form, data);
  document.body.appendChild(form);
  // 提交表单
  form.submit();

  // 向form表单中添加input
  function addInputToForm(form: HTMLFormElement, data: any) {
    for (const key in data) {
      const input = document.createElement("input");
      input.type = "text";
      input.name = key;
      input.value = data[key];
      form.appendChild(input);
    }
  }

  // 检测是否存在日志收集表单，如果存在则删除，并新建一个日志收集表单返回
  function checkCollectForm(URL: string, type: string, enctype: string) {
    // 检测跨域iframe是否存在
    checkCollectIframe();
    let form = document.getElementById("collectForm");
    if (form) {
      document.body.removeChild(form);
    }
    form = document.createElement("form") as HTMLFormElement;
    form.id = "collectForm";
    form.style.display = "none";
    form.setAttribute("action", URL);
    form.setAttribute("method", type);
    form.setAttribute("enctype", enctype);
    form.setAttribute("target", "collectIframe");
    return form;

    // 检测是否存在需要跨域使用的iframe，如果不存在则创建
    function checkCollectIframe() {
      let iframe = document.getElementById("collectIframe");
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.id = "collectIframe";
        iframe.style.display = "none";
        document.body.appendChild(iframe);
      }
    }
  }
}
