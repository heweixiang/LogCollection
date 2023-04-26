// import GenerateFingerprint Method
import { GenerateFingerprint } from "./model/GenerateFingerprint";
import { Log } from "./model/Log";
import { Collect } from "./model/Collect";
import { LogCollectionToolsConfigInterface } from "./interface/LogCollectionToolsConfig";
const generateFingerprint = new GenerateFingerprint();
const log = new Log();
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
};

function Collectioning(config: LogCollectionToolsConfigInterface) {
  const ToolsConfig: LogCollectionToolsConfigInterface = JSON.parse(
    JSON.stringify(config)
  );
  ToolsConfig.fingerprint = generateFingerprint.getFinger();
  // 检测是否需要收集数据
  if (!ToolsConfig.isCollection) return;
  // 收集访问数据
  if (ToolsConfig.isCollectionVisitData) {
    if (ToolsConfig.collectionOnlineStatusTime < 1000 * 60 * 1) {
      ToolsConfig.collectionOnlineStatusTime = 1000 * 60 * 1;
    }
    // 清除上一次的定时器
    if (localStorage.getItem("collection_timer")) {
      clearInterval(parseInt(localStorage.getItem("collection_timer") || "0"));
      log.info("清除上一次的定时器");
    }
    // 收集访问数据先执行一次再进入定时器
    collect.collectVisitData(ToolsConfig);
    const timer = setInterval(() => {
      collect.collectVisitData(ToolsConfig);
    }, ToolsConfig.collectionOnlineStatusTime);
    localStorage.setItem("collection_timer", timer.toString());
  }
  // // 收集错误数据
  // if (ToolsConfig.isCollectionErrorData) {
  //   collect.collectErrorData(ToolsConfig);
  // }
  // // 收集页面跳转数据
  // if (ToolsConfig.isCollectionVisitDataWhenJumpPage) {
  //   collect.collectVisitDataWhenJumpPage(ToolsConfig);
  // }
}

export default class LogCollectionTools {
  init(config: LogCollectionToolsConfigInterface) {
    if (LogCollectionToolsConfig.isInit) {
      Collectioning(LogCollectionToolsConfig);
      // 已经读取到历史配置<蓝色>
      log.info("已经读取到历史配置", LogCollectionToolsConfig);
    }
    if (!config || !config.isCollection) return;
    if (config.isCollection) {
      LogCollectionToolsConfig.isCollection = config.isCollection;
      // 赋值config
      LogCollectionToolsConfig.isCollectionVisitData =
        config.isCollectionVisitData;
      LogCollectionToolsConfig.isCollectionErrorData =
        config.isCollectionErrorData;
      LogCollectionToolsConfig.isInit = true;
      log.info("初始化配置", LogCollectionToolsConfig);
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
      log.info("刷新配置", LogCollectionToolsConfig);
      Collectioning(LogCollectionToolsConfig);
    }
  }
}
