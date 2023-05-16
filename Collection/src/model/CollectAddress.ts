/**
 * 获取IP地址
 */
export default function getIP(): string {
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
    console.log("ip", ip);
    pc.onicecandidate = () => {};
    pc.close();
    // 检测IP的格式是否正确
    if (ip && ip.match(/^\d+.\d+.\d+.\d+$/)) return ip;
    else return "can not get ip";
  };
  return "";
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
