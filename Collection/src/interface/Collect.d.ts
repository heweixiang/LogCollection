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
}

// 收集哪些数据
export interface CollectDataInterface extends CollectBrowserDataInterface {
  // 服务端收集
  // 访问时间
  visitTime: string;
  // 地理位置
  location: string;
  // IP地址
  ip: string;
  // 访问设备
  device: string | "PC" | "移动端";
  // 新老访客
  isNewVisitor: boolean;
  // 访问时长
  visitDuration: number;
  // 访问页数
  visitPage: number;
}

// 客户端收集
export interface CollectBrowserDataInterface {
  // 来源 直接访问 | 来源链接（包括搜索引擎，暂不考虑别名）
  source: "直接访问" | string;
  // 入口页面
  entryPage: string;
  // 搜索词
  searchWord: string;
  // 访客识别码
  fingerprint: string;
  // 跳出网站
  isJumpOut: boolean;
  // 跳出网站的页面
  jumpOutPage: string;
}

// 开发者定义收集
export interface CollectUserDefinedInterface {
  // 用户ID
  userId: string;
  // 触发事件
  event: string;
  // 触发描述
  eventDesc: string;
  // 携带数据
  data: any;
}
