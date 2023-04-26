import { CollectInterface } from "../interface/Collect";
import { LogCollectionToolsConfigInterface } from "../interface/LogCollectionToolsConfig";

export class Collect implements CollectInterface {
  collectVisitData(config: LogCollectionToolsConfigInterface): void {
    // 循环询问在线状态

    throw new Error("Method not implemented.");
  }
  collectErrorData(config: LogCollectionToolsConfigInterface): void {
    // 收集错误数据

    throw new Error("Method not implemented.");
  }
  collectVisitDataWhenJumpPage(
    config: LogCollectionToolsConfigInterface
  ): void {
    // 收集页面跳转数据

    throw new Error("Method not implemented.");
  }
}
