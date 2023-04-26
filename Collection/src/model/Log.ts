import { LogInterface } from "../interface/Log";

export class Log implements LogInterface {
  success = (msg: string, obj: any) => {
    const style = "color: white; background-color: #126bae;padding: 2px 5px;";
    this.log(msg, obj, style);
  };
  warn = (msg: string, obj: any) => {
    const style = "color: white; background-color: #f4a261;padding: 2px 5px;";
    this.log(msg, obj, style);
  };
  error = (msg: string, obj: any) => {
    const style = "color: white; background-color: #e63946;padding: 2px 5px;";
    this.log(msg, obj, style);
  };
  info = (msg: string, obj: any) => {
    const style = "color: white; background-color: #a8dadc;padding: 2px 5px;";
    this.log(msg, obj, style);
  };
  debug = (msg: string, obj: any) => {
    const style = "color: white; background-color: #457b9d;padding: 2px 5px;";
    this.log(msg, obj, style);
  };
  fatal = (msg: string, obj: any) => {
    const style = "color: white; background-color: #1d3557;padding: 2px 5px;";
    this.log(msg, obj, style);
  };
  log = (msg: string, obj: any, style: string) => {
    if (obj) {
      console.log(`%cCollectionJs ${msg}`, style, obj);
    } else {
      console.log(`%cCollectionJs ${msg}`, style);
    }
  };
}
