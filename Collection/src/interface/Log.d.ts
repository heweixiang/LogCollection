/**
 * log输出
 */
export interface LogInterface {
  // 成功
  success: (msg: string, obj: any) => void;
  // 警告
  warn: (msg: string, obj: any) => void;
  // 错误
  error: (msg: string, obj: any) => void;
  // 信息
  info: (msg: string, obj: any) => void;
  // 调试
  debug: (msg: string, obj: any) => void;
  // 严重
  fatal: (msg: string, obj: any) => void;
  // log输出
  log: (msg: string, obj: any, style: string) => void;
}
