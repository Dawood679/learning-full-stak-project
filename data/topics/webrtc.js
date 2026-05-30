export const webrtcContent = {
  slug: "webrtc",
  briefDescription: [
    "WebRTC (Web Real-Time Communication) is a browser API that enables peer-to-peer audio, video, and data transfer directly between browsers without an intermediate server. It's the technology behind Google Meet, Zoom web, and many collaborative tools.",
    "A WebRTC connection requires a signaling server (typically via WebSocket) to exchange SDP (Session Description Protocol) offers/answers and ICE candidates. Once signaling is complete, media flows peer-to-peer via SRTP — the server is no longer in the data path.",
    "STUN servers help peers discover their public IP addresses. TURN servers relay media when direct P2P connection fails (behind strict NATs/firewalls). ICE (Interactive Connectivity Establishment) tries all possible connection paths and picks the best one.",
  ],
  keyConcepts: [
    "RTCPeerConnection: the core connection object",
    "SDP: Session Description Protocol — offer/answer exchange",
    "ICE candidates: connection path discovery",
    "STUN servers: NAT traversal, public IP discovery",
    "TURN servers: media relay fallback",
    "getUserMedia(): access camera and microphone",
    "RTCDataChannel: arbitrary binary/text data P2P",
    "Signaling server via WebSocket for coordination",
  ],
  codeExample: {
    language: "javascript",
    title: "WebRTC Video Call with Signaling",
    code: `// Both peers share this signaling server via WebSocket

// Caller side
const pc = new RTCPeerConnection({
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'turn:turn.example.com', username: 'user', credential: 'pass' }
  ]
})

// Add local video stream
const stream = await navigator.mediaDevices.getUserMedia({
  video: true, audio: true
})
stream.getTracks().forEach(track => pc.addTrack(track, stream))
document.getElementById('localVideo').srcObject = stream

// Send ICE candidates to remote peer via signaling
pc.onicecandidate = ({ candidate }) => {
  if (candidate) socket.emit('ice-candidate', { candidate })
}

// Receive remote stream
pc.ontrack = ({ streams }) => {
  document.getElementById('remoteVideo').srcObject = streams[0]
}

// Create and send offer
const offer = await pc.createOffer()
await pc.setLocalDescription(offer)
socket.emit('offer', { sdp: offer })

// Callee: handle offer, create answer
socket.on('offer', async ({ sdp }) => {
  await pc.setRemoteDescription(sdp)
  const answer = await pc.createAnswer()
  await pc.setLocalDescription(answer)
  socket.emit('answer', { sdp: answer })
})`,
  },
}
