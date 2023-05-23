// import GenerateFingerprint Method
import { GenerateFingerprint } from "./model/GenerateFingerprint";
import { Log } from "./model/Log";
import { Collect } from "./model/Collect";
import { LogCollectionToolsConfigInterface } from "./interface/LogCollectionToolsConfig";
const generateFingerprint = new GenerateFingerprint();
const CollectLog = new Log();
const collect = new Collect();

// 一下配置为收集数据的配置
var LogCollectionToolsConfig: LogCollectionToolsConfigInterface = {
  isInit: false,
  isCollection: true,
  isCollectionVisitData: true,
  isCollectionErrorData: true,
  // 默认1分钟收集一次在线状态(不允许小于1分钟)
  collectionOnlineStatusTime: 1000 * 60 * 1,
  isCollectionVisitDataWhenJumpPage: true,
  fingerprint: "",
  baseUploadUrl: "http://172.21.212.48:7777"
};

function Collectioning(config: LogCollectionToolsConfigInterface) {
  // clog执行收集
  CollectLog.info("执行收集", config);
  const ToolsConfig: LogCollectionToolsConfigInterface = JSON.parse(
    JSON.stringify(config)
  );
  // 从locastorage中获取fingerprint
  if (localStorage.getItem("fingerprint")) {
    ToolsConfig.fingerprint = localStorage.getItem("fingerprint") || "";
  } else {
    ToolsConfig.fingerprint = generateFingerprint.getFinger();
    // 存入历史,如果该访客临时修改页可以将其认为是上次的访客,人为删除就算了(这个管不了)
    localStorage.setItem("fingerprint", ToolsConfig.fingerprint);
  }
  // 检测是否需要收集数据
  if (!ToolsConfig.isCollection) return;
  // 收集访问数据
  if (ToolsConfig.isCollectionVisitData) {
    if (ToolsConfig.collectionOnlineStatusTime < 1000 * 60 * 1) {
      ToolsConfig.collectionOnlineStatusTime = 1000 * 60 * 1;
      // 警告
      CollectLog.warn("收集在线状态时间不允许小于1分钟，已经自动设置为1分钟。");
    }
    // 清除上一次的定时器
    if (localStorage.getItem("collection_timer")) {
      clearInterval(parseInt(localStorage.getItem("collection_timer") || "0"));
      CollectLog.info("清除上一次的定时器");
    }
    // 收集访问数据先执行一次再进入定时器
    collect.collectVisitData(ToolsConfig);
    const timer = setInterval(() => {
      collect.collectVisitData(ToolsConfig);
    }, ToolsConfig.collectionOnlineStatusTime);
    localStorage.setItem("collection_timer", timer.toString());
  }
  // 收集错误数据
  if (ToolsConfig.isCollectionErrorData) {
    collect.collectErrorData(ToolsConfig);
  }
  // 收集页面跳转数据
  if (ToolsConfig.isCollectionVisitDataWhenJumpPage) {
    collect.collectVisitDataWhenJumpPage(ToolsConfig);
  }
}

export default class LogCollectionTools {
  init(config: LogCollectionToolsConfigInterface) {
    if (LogCollectionToolsConfig.isInit) {
      Collectioning(LogCollectionToolsConfig);
      // 已经读取到历史配置<蓝色>
      CollectLog.info("已经读取到历史配置", LogCollectionToolsConfig);
    }
    if (!config || !config.isCollection) return;
    if (config.isCollection) {
      for (let key in config) {
        if (config[key] !== undefined) {
          LogCollectionToolsConfig[key] = config[key];
        }
      }
      LogCollectionToolsConfig.isInit = true;
      CollectLog.info("初始化配置", LogCollectionToolsConfig);
      Collectioning(LogCollectionToolsConfig);
    }
  }

  refreshConfig(config: LogCollectionToolsConfigInterface) {
    if (config.isCollection) {
      for (let key in config) {
        if (config[key] !== undefined) {
          LogCollectionToolsConfig[key] = config[key];
        }
      }
      CollectLog.info("刷新配置", LogCollectionToolsConfig);
      Collectioning(LogCollectionToolsConfig);
    }
  }
}

// 为了兼容老版本将原来的方法挂载到window上
// @ts-ignore
window.LogCollectionTools = new LogCollectionTools();
