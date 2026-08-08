import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '../utils/supabaseClient';

export interface Participant {
  userId: string;
  displayName: string;
  color: string;
  joinedAt: number;
}

export type RoomEventType =
  | 'code_change'
  | 'lang_change'
  | 'run_output'
  | 'timer_sync'
  | 'webrtc_offer'
  | 'webrtc_answer'
  | 'webrtc_ice';

export interface RoomEvent {
  type: RoomEventType;
  senderId: string;
  payload: unknown;
}

interface UseRoomChannelOptions {
  roomId: string;
  participant: Participant;
  onEvent: (event: RoomEvent) => void;
  onParticipantsChange: (participants: Participant[]) => void;
}

const PARTICIPANT_COLORS = [
  '#6366f1', '#ec4899', '#14b8a6', '#f59e0b',
  '#ef4444', '#8b5cf6', '#10b981', '#f97316',
];

export function pickColor(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = (hash * 31 + userId.charCodeAt(i)) & 0xffffffff;
  }
  return PARTICIPANT_COLORS[Math.abs(hash) % PARTICIPANT_COLORS.length];
}

export function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function useRoomChannel({
  roomId,
  participant,
  onEvent,
  onParticipantsChange,
}: UseRoomChannelOptions) {
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const throttleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const broadcast = useCallback(
    (type: RoomEventType, payload: unknown) => {
      if (!channelRef.current) return;
      channelRef.current.send({
        type: 'broadcast',
        event: 'room_event',
        payload: { type, senderId: participant.userId, payload } satisfies RoomEvent,
      });
    },
    [participant.userId],
  );

  /** Throttled code broadcast — fires at most every 80ms */
  const broadcastCode = useCallback(
    (code: string) => {
      if (throttleRef.current) return;
      throttleRef.current = setTimeout(() => {
        throttleRef.current = null;
        broadcast('code_change', { code });
      }, 80);
    },
    [broadcast],
  );

  useEffect(() => {
    if (!roomId) return;

    const channel = supabase.channel(`practice:${roomId}`, {
      config: { broadcast: { self: false }, presence: { key: participant.userId } },
    });

    channel
      .on('broadcast', { event: 'room_event' }, ({ payload }: { payload: RoomEvent }) => {
        onEvent(payload);
      })
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState<Participant>();
        const participants: Participant[] = Object.values(state).flatMap(
          (entries) => entries as Participant[],
        );
        onParticipantsChange(participants);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track(participant);
        }
      });

    channelRef.current = channel;

    return () => {
      if (throttleRef.current) clearTimeout(throttleRef.current);
      channel.unsubscribe();
      channelRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, participant.userId]);

  return { broadcast, broadcastCode };
}
