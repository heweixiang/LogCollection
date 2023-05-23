/**
 * 获取IP地址：这个需要通过RTCPeerConnection来获取，但是这个对象在不同的浏览器中的实现不一样，所以需要做兼容处理（比较复杂，用户不一定配合所以不采用，交给后端解决）
 */
export default async function getIP(): Promise<string> {
  return new Promise((resolve, reject): any => {
    const RTCPeerConnection = getWebRTC();
    if (!RTCPeerConnection) return "WebRTC not supported by browser";
    // 通过RTCPeerConnection获取IP
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    pc.createDataChannel("");
    pc.createOffer().then(pc.setLocalDescription.bind(pc));
    pc.onicecandidate = (ice: any) => {
      if (!ice || !ice.candidate || !ice.candidate.candidate) return;
      const ip = ice.candidate.candidate.split(" ")[4];
      pc.onicecandidate = () => {};
      pc.close();
      // 检测IP的格式是否正确
      if (ip && ip.match(/^\d+.\d+.\d+.\d+$/)) resolve(ip);
      else return resolve("IP format error");
    };
  });
}

// 获取对应版本的webRTC对象
function getWebRTC(): any {
  // @ts-ignore
  return (
    window.RTCPeerConnection ||
    // @ts-ignore
    window.mozRTCPeerConnection ||
    // @ts-ignore
    window.webkitRTCPeerConnection
  );
}
