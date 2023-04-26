export interface LogCollectionToolsConfigInterface {
  isInit: boolean;
  // ******** 收集开关控制 ********
  // 是否开启收集数据
  isCollection: boolean;
  // 收集访问数据，window.onload 之后收集
  isCollectionVisitData: boolean;
  // 是否收集错误数据，接管 window.onerror并收集报错堆栈信息
  isCollectionErrorData: boolean;
  // 多久收集一次在线状态
  collectionOnlineStatusTime: number;
  // 跳转页面时是否收集数据（精细）
  isCollectionVisitDataWhenJumpPage: boolean;

  // ******** 收集数据上传请求配置 ********
  // 当前浏览器指纹
  fingerprint: string;
}
