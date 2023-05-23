import {
  CollectInterface,
  CollectBrowserDataInterface,
  CollectUserDefinedInterface,
} from "../interface/Collect";
import { LogCollectionToolsConfigInterface } from "../interface/LogCollectionToolsConfig";
import { send } from "./XHR2Ajax";
import { Log } from "./Log";
const CollectLog = new Log();
import CollectAddress from "./CollectAddress";

export class Collect implements CollectInterface {
  // 由开发者触发埋点
  collectUserTrigger(_config: CollectUserDefinedInterface): void {
    throw new Error("Method not implemented.");
  }

  // 由系统埋点触发
  async collectStatusAndUpload(
    _config: LogCollectionToolsConfigInterface,
    browserData: CollectBrowserDataInterface
  ) {
    send(_config, "/test/saveLog", "POST", browserData);
  }

  async collectVisitData(
    _config: LogCollectionToolsConfigInterface
  ): Promise<void> {
    // 循环询问在线状态
    const collectData: CollectBrowserDataInterface =
      await this.collectBaseVisitData(_config);
    // 当前用户焦点是否在当前页面 焦点进行记录，否则不在页面视为跳出
    if (document.hasFocus()) {
      this.collectStatusAndUpload(_config, collectData);
    } else {
      // CollectLog.info("状态失焦，判定未在线！");
    }
  }

  async collectErrorData(
    _config: LogCollectionToolsConfigInterface
  ): Promise<void> {
    // 收集错误数据
    const collectData: CollectBrowserDataInterface =
      await this.collectBaseVisitData(_config);

    this.collectStatusAndUpload(_config, collectData);
  }

  async collectVisitDataWhenJumpPage(
    _config: LogCollectionToolsConfigInterface
  ): Promise<void> {
    // 收集页面跳转数据
    const collectData: CollectBrowserDataInterface =
      await this.collectBaseVisitData(_config);

    this.collectStatusAndUpload(_config, collectData);
  }

  async collectBaseVisitData(
    _config: LogCollectionToolsConfigInterface
  ): Promise<CollectBrowserDataInterface> {
    const collectData: CollectBrowserDataInterface = {
      // 来源地址
      source: "",
      // 入口页面
      entryPage: "",
      // 搜索词
      searchWord: "",
      // 访客识别码
      fingerprint: "",
      // 屏幕分辨率
      screenResolution: "",
      // 访问IP
      ip: "",
      // 用户UA
      userAgent: "",
      // 浏览器名称
      browserName: "",
      // 浏览器版本
      browserVersion: "",
      // 浏览器内核
      browserKernel: "",
      // 操作系统
      os: "",
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
    // 屏幕分辨率
    collectData.screenResolution =
      window.screen.height + "×" + window.screen.width;
    // 访问IP
    collectData.ip = await CollectAddress();
    // 用户UA
    collectData.userAgent = navigator.userAgent;
    // 浏览器名称
    collectData.browserName = getBrowser();
    // 浏览器版本
    collectData.browserVersion = navigator.userAgent.split(" ")[1];
    // 浏览器内核
    collectData.browserKernel = getBrowserKernel();
    // 操作系统
    collectData.os = getOsInfo().version;
    return collectData;

    // 获取浏览器名称
    function getBrowser(): string {
      const UserAgent = navigator.userAgent.toLowerCase();
      let browser = null;
      const browserArray = {
        // @ts-ignore
        IE: window.ActiveXObject || "ActiveXObject" in window, // IE
        Chrome:
          UserAgent.indexOf("chrome") > -1 && UserAgent.indexOf("safari") > -1, // Chrome浏览器
        Firefox: UserAgent.indexOf("firefox") > -1, // 火狐浏览器
        Opera: UserAgent.indexOf("opera") > -1, // Opera浏览器
        Safari:
          UserAgent.indexOf("safari") > -1 && UserAgent.indexOf("chrome") == -1, // safari浏览器
        Edge: UserAgent.indexOf("edge") > -1, // Edge浏览器
        QQBrowser: /qqbrowser/.test(UserAgent), // qq浏览器
        WeixinBrowser: /MicroMessenger/i.test(UserAgent), // 微信浏览器
      };
      for (const i in browserArray) {
        if (browserArray[i]) {
          browser = i;
        }
      }
      return browser || "未知浏览器";
    }

    // 获取操作系统
    function getOsInfo(): { name: string; version: string } {
      const userAgent = navigator.userAgent.toLowerCase();
      let name = "Unknown";
      let version = "Unknown";
      if (userAgent.indexOf("win") > -1) {
        name = "Windows";
        if (userAgent.indexOf("windows nt 5.0") > -1) {
          version = "Windows 2000";
        } else if (
          userAgent.indexOf("windows nt 5.1") > -1 ||
          userAgent.indexOf("windows nt 5.2") > -1
        ) {
          version = "Windows XP";
        } else if (userAgent.indexOf("windows nt 6.0") > -1) {
          version = "Windows Vista";
        } else if (
          userAgent.indexOf("windows nt 6.1") > -1 ||
          userAgent.indexOf("windows 7") > -1
        ) {
          version = "Windows 7";
        } else if (
          userAgent.indexOf("windows nt 6.2") > -1 ||
          userAgent.indexOf("windows 8") > -1
        ) {
          version = "Windows 8";
        } else if (userAgent.indexOf("windows nt 6.3") > -1) {
          version = "Windows 8.1";
        } else if (
          userAgent.indexOf("windows nt 6.2") > -1 ||
          userAgent.indexOf("windows nt 10.0") > -1
        ) {
          version = "Windows 10";
        } else {
          version = "Unknown";
        }
      } else if (userAgent.indexOf("iphone") > -1) {
        name = "iPhone";
      } else if (userAgent.indexOf("mac") > -1) {
        name = "Mac";
      } else if (
        userAgent.indexOf("x11") > -1 ||
        userAgent.indexOf("unix") > -1 ||
        userAgent.indexOf("sunname") > -1 ||
        userAgent.indexOf("bsd") > -1
      ) {
        name = "Unix";
      } else if (userAgent.indexOf("linux") > -1) {
        if (userAgent.indexOf("android") > -1) {
          name = "Android";
        } else {
          name = "Linux";
        }
      } else {
        name = "Unknown";
      }
      return { name, version };
    }

    // 获取浏览器内核
    function getBrowserKernel(): string {
      const userAgent = navigator.userAgent.toLowerCase();
      let kernel = "Unknown";
      if (userAgent.indexOf("trident") > -1) {
        kernel = "Trident";
      } else if (userAgent.indexOf("presto") > -1) {
        kernel = "Presto";
      } else if (userAgent.indexOf("applewebkit") > -1) {
        kernel = "Webkit";
      } else if (
        userAgent.indexOf("gecko") > -1 &&
        userAgent.indexOf("khtml") == -1
      ) {
        kernel = "Gecko";
      } else {
        kernel = "Unknown";
      }
      return kernel;
    }
  }
}
