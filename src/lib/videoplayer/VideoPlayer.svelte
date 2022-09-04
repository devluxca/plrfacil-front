<script>
    import { Player, Video, Ui, ClickToPlay, Spinner, Poster, DefaultUi, Scrim, Controls, PlaybackControl, ControlSpacer, TimeProgress, MuteControl } from '@vime/svelte'
    import { useState } from '@utils/hooks'

    export let id
    export let color
    export let selectComponent
    export let active
    export let showControls
    export let showFakeProgress

    const [videoTime, setVideoTime] = useState(0)
    const [videoDuration, setVideoDuration] = useState(0)
    const onTimeUpdate = ({ detail: time }) => {
        setVideoTime(time)
    }
    const setDuration = (e) => {
        setVideoDuration(e.detail)
    }

    $: videoPercentage = $videoTime / $videoDuration
    $: fakeProgressPercentage = 100 * Math.sqrt(1 - (videoPercentage -= 1) * videoPercentage) 
</script>

<div 
    {id} 
    class="component" class:active
    on:click={selectComponent(id)}

    aria-label="drag-handle"
>
    <Player
        autoplay
        theme="dark"
        --vm-player-theme={color}
        on:vmCurrentTimeChange={onTimeUpdate}
        on:vmDurationChange={setDuration}
    >
        <Video
            poster="https://media.vimejs.com/poster.png"
        >
            <source 
            data-src="https://media.vimejs.com/720p.mp4" 
            type="video/mp4"
            />
            <track 
            default 
            kind="subtitles" 
            src="https://media.vimejs.com/subs/english.vtt" 
            srclang="en" 
            label="English" 
            />
        </Video>

        {#if !showControls}
            <DefaultUi noControls>
                <Scrim />

                <Controls fullWidth pin="topLeft">
                  <ControlSpacer />
                  <MuteControl />
                </Controls>
            
                <Controls pin="center" justify="center">
                    <div style="background: {color}; padding: 15px 15px; border-radius: 5px">
                        <PlaybackControl hideTooltip />
                    </div>
                </Controls>
            
                {#if showFakeProgress}
                    <div class="video-progress-full" style="background: {color};">
                    </div>
                    <div class="video-progress-current" style="width: {fakeProgressPercentage}%; background: {color};"></div>
                {/if}
            </DefaultUi>
        {:else}
            <DefaultUi />
        {/if}
    </Player>
</div>

<style>
    .video-progress-full {
        opacity: 0.3;
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 15px;
    }
    .video-progress-current {
        position: absolute;
        left: 0px;
        bottom: 0px;
        height: 15px;
    }
    .is-half {
        transition: 5s;
    }
    .component.active {
        border: 2px solid var(--plrfacil-blue);
    }
</style>