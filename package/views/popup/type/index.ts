// 向晚（Ava）、贝拉（Bella）、珈乐（Carol）、嘉然（Diana）、乃琳（Eileen）
export type Skin = 'Ava' | 'Carol' | 'Diana' | 'Eileen' | 'Bella';
export interface LiveBroadcastInfo {
  theme: {
    skin: Skin;
  };
  user: {
    avatar?: string;
    name?: string;
    cover?: string;
    sign?: string;
    fans?: number;
    fansName?: string;
  };
}

export interface VideoInfo {
  aid?: number;
  author?: string;
  bvid?: string;
  comment?: number;
  copyright?: string;
  created?: number;
  description?: string;
  hide_click?: boolean;
  is_live_playback?: number;
  is_pay?: number;
  is_steins_gate?: number;
  is_union_video?: number;
  length?: string;
  mid?: number;
  pic?: string;
  play?: number;
  review?: number;
  subtitle?: string;
  title?: string;
  typeid?: number;
  video_review?: number;
}
