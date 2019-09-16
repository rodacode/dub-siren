export interface SirenEngine {
    tone: number;
    volume: number;
    mod: number;
    mod_rate: number;
    setup: () => void;
    trigger: (time: number) => void;
    setTone: (tone: number) => void;
    setVolume: (vol: number) => void;
    setMod?: (mod: number) => void;
    setMod_rate?: (mod_rate: number) => void;

}