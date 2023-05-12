import {
  CollectInterface,
  CollectBrowserDataInterface,
  CollectUserDefinedInterface,
} from "../interface/Collect";
import { LogCollectionToolsConfigInterface } from "../interface/LogCollectionToolsConfig";
import { send } from "./XHR2Ajax";

export class Collect implements CollectInterface {

  // 由开发者触发埋点
  collectUserTrigger(_config: CollectUserDefinedInterface): void {
    throw new Error("Method not implemented.");
  }


  // 由系统埋点触发
  collectStatusAndUpload(browserData: CollectBrowserDataInterface): void {
    send("http://localhost:3000/collect", "POST", browserData);
  }



  collectVisitData(_config: LogCollectionToolsConfigInterface): void {
    // 循环询问在线状态
    const collectData: CollectBrowserDataInterface = {
      source: "",
      entryPage: "",
      searchWord: "",
      fingerprint: "",
      isJumpOut: false,
      jumpOutPage: "",
      jumpToPage: ""
    };
    // 网页跳转来源
    collectData.source = document.referrer;
    // 入口页面
    collectData.entryPage = window.location.href;
    // 搜索词
    collectData.searchWord =
      new URLSearchParams(window.location.search).get("q") || "";
    // 访客识别码
    collectData.fingerprint = _config.fingerprint;
    // 当前用户焦点是否在当前页面 焦点进行记录，否则不在页面视为跳出
    if (document.hasFocus()) {
      this.collectStatusAndUpload(collectData);
    }
  }


  collectErrorData(_config: LogCollectionToolsConfigInterface): void {
    // 收集错误数据
    const collectData: CollectBrowserDataInterface = {
      source: "",
      entryPage: "",
      searchWord: "",
      fingerprint: "",
      isJumpOut: false,
      jumpOutPage: "",
      jumpToPage: ""
    };

    this.collectStatusAndUpload(collectData);
  }


  collectVisitDataWhenJumpPage(
    _config: LogCollectionToolsConfigInterface
  ): void {
    // 收集页面跳转数据
    const collectData: CollectBrowserDataInterface = {
      source: "",
      entryPage: "",
      searchWord: "",
      fingerprint: "",
      isJumpOut: false,
      jumpOutPage: "",
      jumpToPage: ""
    };

    this.collectStatusAndUpload(collectData);
  }
}
