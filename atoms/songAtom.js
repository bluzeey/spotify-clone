import { atom } from "recoil";

export const currentIdTrackState=atom({
    key: "currentIdTrackState",
    default:null
});

export const isPlayingState=atom({
    key:"isPlayingState",
    default:false
})