import {useSession} from 'next-auth/react';
import {currentTrackIdState,isPlayingState} from '../atoms/songAtom'
import {useState} from 'react'
import {useRecoilState} from 'recoil'
import useSongInfo from '../hooks/useSongInfo'
import { useEffect } from 'react/cjs/react.development';
import useSpotify from '../hooks/useSpotify'

function Player() {
    const spotifyApi=useSpotify();
    const {data:session,status}=useSession()
    const [currentTrackId, setCurrentTrackId]=useRecoilState(currentTrackIdState)
    const [isPlaying,setIsPlaying]=useRecoilState(isPlayingState)
    const [volume,setVolume]=useState(50)
    
    const songInfo=useSongInfo();
    
    const fetchCurrentSong=()=>{
        if(!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then((data)=>{
                console.log("Now Playing: ",data.body?.item);
                setCurrentTrackId(data.body?.item.id);

                spotifyApi.getMyCurrentPlaybackState().then((data)=>{
                    setVolume(50)
                });
            })
        }
    }

    useEffect(()=>{
        if(spotifyApi.getAccessToken() && !currentTrackId)
        {
          fetchCurrentSong();
          setVolume(50);
        }
    },[currentTrackId,spotifyApi,session])
    return (
        <div>
            <div>
                <img className="hidden md:inline h-10 w-10" 
                src={songInfo?.album?.images?.[0]?.url} alt=""/>
            </div>
        </div>
    )
}

export default Player
