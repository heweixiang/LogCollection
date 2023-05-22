import { LogCollectionToolsConfigInterface } from "../interface/LogCollectionToolsConfig";
/**
 * 收集接口
 */
export interface CollectInterface {
  // 收集访问数据
  collectVisitData(config: LogCollectionToolsConfigInterface): void;
  // 收集错误数据
  collectErrorData(config: LogCollectionToolsConfigInterface): void;
  // 收集页面跳转数据
  collectVisitDataWhenJumpPage(config: LogCollectionToolsConfigInterface): void;
  // 收集状态并上传
  collectStatusAndUpload(config: CollectBrowserDataInterface): void;
  // 用户触发收集
  collectUserTrigger(config: CollectUserDefinedInterface): void;

  // 收集基本访问数据
  collectBaseVisitData(
    config: LogCollectionToolsConfigInterface
  ): Promise<CollectBrowserDataInterface>;
}

// 收集哪些数据
export interface CollectDataInterface
  extends CollectBrowserDataInterface,
    CollectUserDefinedInterface {
  // 开发者或自动收集
  collectType: string;
}

// 自动收集
export interface CollectBrowserDataInterface {
  // 来源地址
  source: string;
  // 入口页面
  entryPage: string;
  // 搜索词
  searchWord: string;
  // 访客识别码
  fingerprint: string;
  // 屏幕分辨率
  screenResolution: string;
  // 访问IP
  ip: string;
  // 用户UA
  userAgent: string;
  // 浏览器名称
  browserName: string;
  // 浏览器版本
  browserVersion: string;
  // 浏览器内核
  browserKernel: string;
  // 操作系统
  os: string;
}

// 开发者定义收集
export interface CollectUserDefinedInterface {
  // 事件类型
  eventType: string;
  // 事件描述
  eventDesc: string;
  // 事件名称
  eventName: string;
  // 触发元素
  triggerElement: HTMLElement;
  // 触发位置
  triggerPosition: string;
  // 触发时间(传入客户端时间戳,后端按需覆盖)
  triggerTime: number;
  // 用户信息
  userInfo: string;
  // 事件其它信息
  eventOtherInfo: string;
}
