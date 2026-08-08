import { useEffect, useRef, useState, useCallback } from 'react';

const STUN_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
];

interface UseWebRTCOptions {
  /** Whether this peer should initiate (create offer) */
  isInitiator: boolean;
  /** Callback to send a signaling message to the remote peer via your transport */
  onSignal: (type: 'webrtc_offer' | 'webrtc_answer' | 'webrtc_ice', data: unknown) => void;
}

export interface WebRTCState {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isConnected: boolean;
  isLocalMuted: boolean;
  isCameraOff: boolean;
  isEnabled: boolean;
}

export function useWebRTC({ isInitiator, onSignal }: UseWebRTCOptions) {
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const makingOffer = useRef(false);

  const [state, setState] = useState<WebRTCState>({
    localStream: null,
    remoteStream: null,
    isConnected: false,
    isLocalMuted: false,
    isCameraOff: false,
    isEnabled: false,
  });

  const getOrCreatePC = useCallback((): RTCPeerConnection => {
    if (pcRef.current) return pcRef.current;

    const pc = new RTCPeerConnection({ iceServers: STUN_SERVERS });

    pc.onicecandidate = ({ candidate }) => {
      if (candidate) {
        onSignal('webrtc_ice', candidate.toJSON());
      }
    };

    pc.ontrack = (event) => {
      const [remoteStream] = event.streams;
      setState((s) => ({ ...s, remoteStream }));
    };

    pc.onconnectionstatechange = () => {
      setState((s) => ({ ...s, isConnected: pc.connectionState === 'connected' }));
    };

    pcRef.current = pc;
    return pc;
  }, [onSignal]);

  /** Enable camera + mic and start the WebRTC session */
  const enable = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;

      const pc = getOrCreatePC();
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      setState((s) => ({ ...s, localStream: stream, isEnabled: true }));

      if (isInitiator) {
        makingOffer.current = true;
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        onSignal('webrtc_offer', pc.localDescription?.toJSON());
        makingOffer.current = false;
      }
    } catch (err) {
      console.warn('[WebRTC] getUserMedia failed:', err);
    }
  }, [getOrCreatePC, isInitiator, onSignal]);

  /** Handle an incoming signaling message from the remote peer */
  const handleSignal = useCallback(
    async (type: string, data: unknown) => {
      const pc = getOrCreatePC();

      try {
        if (type === 'webrtc_offer') {
          const offerCollision =
            makingOffer.current || pc.signalingState !== 'stable';
          if (offerCollision && !isInitiator) return; // polite peer ignores

          await pc.setRemoteDescription(new RTCSessionDescription(data as RTCSessionDescriptionInit));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          onSignal('webrtc_answer', pc.localDescription?.toJSON());
        } else if (type === 'webrtc_answer') {
          await pc.setRemoteDescription(new RTCSessionDescription(data as RTCSessionDescriptionInit));
        } else if (type === 'webrtc_ice') {
          await pc.addIceCandidate(new RTCIceCandidate(data as RTCIceCandidateInit));
        }
      } catch (err) {
        console.warn('[WebRTC] signaling error:', err);
      }
    },
    [getOrCreatePC, isInitiator, onSignal],
  );

  const toggleMic = useCallback(() => {
    const stream = localStreamRef.current;
    if (!stream) return;
    stream.getAudioTracks().forEach((t) => {
      t.enabled = !t.enabled;
    });
    setState((s) => ({ ...s, isLocalMuted: !s.isLocalMuted }));
  }, []);

  const toggleCamera = useCallback(() => {
    const stream = localStreamRef.current;
    if (!stream) return;
    stream.getVideoTracks().forEach((t) => {
      t.enabled = !t.enabled;
    });
    setState((s) => ({ ...s, isCameraOff: !s.isCameraOff }));
  }, []);

  const hangUp = useCallback(() => {
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    pcRef.current?.close();
    pcRef.current = null;
    localStreamRef.current = null;
    setState({
      localStream: null,
      remoteStream: null,
      isConnected: false,
      isLocalMuted: false,
      isCameraOff: false,
      isEnabled: false,
    });
  }, []);

  useEffect(() => {
    return () => {
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
      pcRef.current?.close();
    };
  }, []);

  return { state, enable, handleSignal, toggleMic, toggleCamera, hangUp };
}
