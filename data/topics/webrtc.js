export const webrtcContent = {
  slug: "webrtc",
  briefDescription: [
    "WebRTC (Web Real-Time Communication) is a browser API that enables direct peer-to-peer audio, video, and data transfer between browsers — without a media server. Technologies like Google Meet, Zoom web, and Discord's browser client are built on WebRTC. The key advantage: once the connection is established, media flows directly peer-to-peer, which means low latency and no server bandwidth costs for the actual media traffic.",
    "Setting up a WebRTC call requires a signaling server (typically built with WebSockets). The two peers exchange SDP (Session Description Protocol) messages: the caller creates an SDP 'offer' describing its media capabilities, and the callee creates an 'answer'. They also exchange ICE (Interactive Connectivity Establishment) candidates — possible network paths for the connection. The browser API navigator.mediaDevices.getUserMedia() requests access to the user's camera and microphone, returning a MediaStream.",
    "STUN servers help peers discover their public IP address when behind NAT (Network Address Translation). TURN servers relay media through an intermediate server when direct P2P fails — needed for users behind strict corporate firewalls or symmetric NATs. TURN servers are expensive (bandwidth costs) so they're only used as a fallback. RTCDataChannel lets you send arbitrary data (text, files, game state) peer-to-peer with low latency. For group calls with many participants, an SFU (Selective Forwarding Unit) like mediasoup or livekit is used instead of full mesh P2P.",
  ],
  keyConcepts: [
    "WebRTC: peer-to-peer audio/video/data in the browser — no media server needed",
    "RTCPeerConnection: core connection object that manages the P2P session",
    "getUserMedia(): requests camera/mic access, returns a MediaStream",
    "SDP (Session Description Protocol): describes media capabilities in offer/answer",
    "ICE (Interactive Connectivity Establishment): finds best network path between peers",
    "ICE candidates: all possible connection paths (local IP, public IP, TURN relay)",
    "Signaling server (WebSocket): exchanges SDP offers/answers and ICE candidates",
    "STUN server: helps peer discover its public IP behind NAT (free, stateless)",
    "TURN server: relays media when direct P2P fails — fallback, costs bandwidth",
    "RTCDataChannel: send arbitrary text/binary data P2P with ultra-low latency",
    "Offer/Answer flow: caller creates offer → sends via signal → callee creates answer",
    "SFU (Selective Forwarding Unit): for group calls with 3+ participants",
  ],
  codeExample: {
    language: "javascript",
    title: "WebRTC Video Call: getUserMedia, RTCPeerConnection, Signaling",
    code: `// ── Client-side WebRTC Video Call ────────────────
const socket = io('wss://signal.example.com')

const iceConfig = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },  // Free STUN
    {
      urls: 'turn:turn.example.com:3478',       // Paid TURN (fallback)
      username: 'user',
      credential: 'password'
    }
  ]
}

let pc = null

async function startCall(remoteUserId) {
  // 1. Get local camera + mic
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
    audio: true
  })
  document.getElementById('localVideo').srcObject = localStream

  // 2. Create peer connection
  pc = new RTCPeerConnection(iceConfig)

  // 3. Add local tracks to connection
  localStream.getTracks().forEach(track => pc.addTrack(track, localStream))

  // 4. When remote stream arrives, show it
  pc.ontrack = ({ streams }) => {
    document.getElementById('remoteVideo').srcObject = streams[0]
  }

  // 5. Send ICE candidates to remote peer via signaling
  pc.onicecandidate = ({ candidate }) => {
    if (candidate) socket.emit('ice-candidate', { candidate, to: remoteUserId })
  }

  // 6. Create and send SDP offer
  const offer = await pc.createOffer()
  await pc.setLocalDescription(offer)
  socket.emit('offer', { sdp: offer, to: remoteUserId })
}

// ── Callee: handle incoming offer ────────────────
socket.on('offer', async ({ sdp, from }) => {
  pc = new RTCPeerConnection(iceConfig)

  const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  localStream.getTracks().forEach(track => pc.addTrack(track, localStream))
  pc.ontrack = ({ streams }) => { document.getElementById('remoteVideo').srcObject = streams[0] }

  await pc.setRemoteDescription(new RTCSessionDescription(sdp))
  const answer = await pc.createAnswer()
  await pc.setLocalDescription(answer)
  socket.emit('answer', { sdp: answer, to: from })
})

// Handle answer + ICE candidates
socket.on('answer', ({ sdp }) => pc.setRemoteDescription(new RTCSessionDescription(sdp)))
socket.on('ice-candidate', ({ candidate }) => pc.addIceCandidate(new RTCIceCandidate(candidate)))`,
  },
}
