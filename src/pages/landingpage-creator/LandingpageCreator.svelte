<script>
    import { flip } from 'svelte/animate';
    import { dndzone, SOURCES, TRIGGERS } from 'svelte-dnd-action'
    import { Icon } from 'sveltestrap'
    import { useState } from '@utils/hooks'
    import { clickOutside } from '@utils/dom'
    import { propEq, findIndex, filter, pipe, not } from 'ramda'
    import { Row, Col } from 'sveltestrap'
    import { v4 as uuidv4 } from 'uuid'

    import { ColorPicker } from '@lib/color-picker'
    import { Label } from '@lib/form'
    import { Checkbox } from '@lib/checkbox'
    import { VideoPlayer } from '@lib/videoplayer'

    const [openedAdd, setOpenedAdd] = useState(false)
    const onOpenAdd = () => setOpenedAdd(!$openedAdd)
    const onCloseAdd = () => setOpenedAdd(false)

    const flipDurationMs = 200;
    const [dragDisabled, setDragDisabled] = useState(true)

    let isDrag = false
    const handleConsider = (e) => {
        isDrag = true
        const {items: newItems, info: {source, trigger}} = e.detail
        setContent({
            ...$content,
            components: newItems
        })

        if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
            setDragDisabled(true)
            isDrag = false
        }
    }
    const handleFinalize = (e) => {
        const {items: newItems, info: {source}} = e.detail
        setContent({
            ...$content,
            components: newItems
        })

        if (source === SOURCES.POINTER) {
            setDragDisabled(true)
            isDrag = false
        }
    }
    const startDrag = (e) => {
        e.preventDefault()
        setDragDisabled(false)
    }
    const handleKeyDown = (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && $dragDisabled) setDragDisabled(false)
    }

    const [content, setContent] = useState({ components: [] })
    const addVideoplayer = () => setContent({ 
        ...$content, 
        components: [
            ...$content.components,
            {
                id: uuidv4(),
                type: 'videoplayer',
                color: 'red',
                afterTime: 10,
                showControls: false,
                showFakeProgress: true
            }
        ] 
    })
    const isVideoplayer = propEq('type', 'videoplayer')

    const updateComponent = (newComponent) => {
        const indexComponent = getFocusedComponentIndex()
        const newContent = $content

        newContent.components[indexComponent] = newComponent

        setFocusedComponent(newComponent)
        setContent(newContent)
    }


    const updateSubcomponent = (newSubcomponent) => {
        const indexComponent = getFocusedComponentBySubcomponentIndex()
        const subindexComponent = getIndexBySubcomponent($content.components[indexComponent].slot.components)
        const newContent = $content

        newContent.components[indexComponent].slot.components[subindexComponent].slot.components = [
            ...newContent.components[indexComponent].slot.components[subindexComponent].slot.components,
            newSubcomponent
        ]

        setFocusedComponent(newSubcomponent)
        setContent(newContent)
    }

    const toggleVideoControls = (e) => updateComponent({
            ...$focusedComponent,
            showControls: e.target.checked
        })

    const toggleFakeProgress = (e) => updateComponent({
            ...$focusedComponent,
            showFakeProgress: e.target.checked
        })

    const addCTA = () => {
        const cta = {
            id: uuidv4(),
            type: 'cta',
            text: 'Texto',
            color: 'blue'
        }
        if (isColumn($focusedComponent)) {
            updateSubcomponent(cta)
        } else {
            setContent({
                ...$content,
                components: [
                    ...$content.components,
                    cta,
                ]
            })
        } 
    }
    const isCTA = propEq('type', 'cta')

    const addText = () => setContent({
        ...$content,
        components: [
            ...$content.components,
            {
                id: uuidv4(),
                type: 'text',
                text: 'Texto',
                color: '#FFFFFF',
                fontSize: '16px',
                textAlign: 'left'
            }
        ]
    })
    const isText = propEq('type', 'text')

    const addContainer = () => {
        const containerComponent = {
            id: uuidv4(),
            type: 'container',
            slot: {
                components: []
            }
        }
        setContent({
        ...$content,
            components: [
                ...$content.components,
                containerComponent,
            ]
        })
        setFocusedComponent(containerComponent)
    }
    const addContainerColumn = () => updateComponent({
        ...$focusedComponent,
        slot: {
            components: [
                ...$focusedComponent.slot.components,
                {
                    id: `${$focusedComponent.id}|${uuidv4()}`,
                    type: 'column',
                    slot: {
                        components: []
                    }
                }
            ]
        }
    })
    const removeColumn = (subid) => () => updateComponent({
        ...$focusedComponent,
        slot: {
            components: filter(pipe(propEq('id', subid), not))($focusedComponent.slot.components)
        }
    })
    const isContainer = propEq('type', 'container')
    const isColumn = propEq('type', 'column')

    const addColumnComponent = () => {
        setOpenedAdd(true)
    }

    const [focusedComponent, setFocusedComponent] = useState({})
    const selectColumn = (subcomponent) => () => setFocusedComponent(subcomponent)
    const selectComponent = (id) => (e) => setFocusedComponent($content.components.find(propEq('id', id)))
    const deselectComponent = () => setFocusedComponent({})

    const deleteComponent = (id) => () => {
        setContent({
            ...$content,
            components: filter(pipe(propEq('id', id), not))($content.components)
        })
        setFocusedComponent({})
    }

    const getFocusedComponentIndex = () => findIndex(propEq('id', $focusedComponent.id))($content.components)
    const getFocusedComponentBySubcomponentIndex = () => findIndex(propEq('id', $focusedComponent.id.split('|')[0]))($content.components)
    const getIndexBySubcomponent = (components) => findIndex(propEq('id', $focusedComponent.id))(components)

    const changeColor = (e) => updateComponent({
            ...$focusedComponent,
            color: e.detail
        })

    const onChangeText = (e) => updateComponent({
        ...$focusedComponent,
            text: e.target.value
    })

    const onChangeFontSize = (e) => updateComponent({
        ...$focusedComponent,
        fontSize: `${e.target.value}px`
    })
    const onChangeAlign = (align) => (e) => updateComponent({
        ...$focusedComponent,
        textAlign: align
    })
</script>

{#if $focusedComponent.id}
<aside class="side-controls">
    <h2>Customizar vídeo</h2>

    <div class="side-controls-component">
        {#if isVideoplayer($focusedComponent)}
        <Label 
            --label-color="var(--plrfacil-white)"
            text="Escolha a cor"
        />
        <ColorPicker value={$focusedComponent.color} on:change={changeColor} />

        <h3>Controles</h3>
        <section class="option-control">
            <Checkbox 
                --checkbox-theme="var(--plrfacil-white)"
                checked={$focusedComponent.showControls} 
                text="Exibir controles do vídeo?" 
                on:change={toggleVideoControls} 
            />
        </section>

            {#if !$focusedComponent.showControls}
                <section class="option-control">
                    <Checkbox 
                        --checkbox-theme="var(--plrfacil-white)"
                        checked={$focusedComponent.showFakeProgress} 
                        text="Exibir barra de progresso fake?" 
                        on:change={toggleFakeProgress} 
                    />
                </section>
            {/if}
        {/if}

        {#if isCTA($focusedComponent)}
            <Label 
                --label-color="var(--plrfacil-white)"
                text="Texto do botão"
            />
            <input value={$focusedComponent.text} on:keyup={onChangeText} />

            <Row>
                <Label 
                    --label-color="var(--plrfacil-white)"
                    text="Escolha a cor"
                />
                <ColorPicker value={$focusedComponent.color} on:change={changeColor} />
            </Row>
        {/if}

        {#if isText($focusedComponent)}
            <Row>
                <Label 
                    --label-color="var(--plrfacil-white)"
                    text="Digite o texto desejado"
                />
                <input value={$focusedComponent.text} on:keyup={onChangeText} />
            </Row>

            <Row>
                <div class="align-buttons">
                    <button on:click={onChangeAlign('left')} >
                        <Icon name="text-left" />
                    </button>
                    <button on:click={onChangeAlign('center')} >
                        <Icon name="text-center" />
                    </button>
                    <button on:click={onChangeAlign('right')} >
                        <Icon name="text-right" />
                    </button>
                </div>    
            </Row>

            <Row>
                <Label 
                    --label-color="var(--plrfacil-white)"
                    text="Escolha o tamanho da fonte"
                />
                <input type="range" min="8" max="82" on:change={onChangeFontSize} />
            </Row>

            <Row>
                <Label 
                    --label-color="var(--plrfacil-white)"
                    text="Escolha a cor"
                />
                <ColorPicker value={$focusedComponent.color} on:change={changeColor} />
            </Row>
        {/if}

        {#if isContainer($focusedComponent)}
            <div class="add-container-column-button" on:click={addContainerColumn}>
                Adicionar coluna
            </div>

            {#each $focusedComponent.slot.components as subcomponent}
                {#if isColumn(subcomponent)}
                <div class="column-config">
                    <p>Coluna</p>
                    <div class="column-config-actions">
                        <div class="config-icon" on:click={selectColumn(subcomponent)}>
                            <Icon name="gear" />
                        </div>    
                        <div class="delete-icon" on:click={removeColumn(subcomponent.id)}>
                            <Icon name="trash" />
                        </div>    
                    </div>
                </div>
                {/if}
            {/each}
        {/if}

        {#if isColumn($focusedComponent)}
        <div class="add-container-column-button" on:click={addColumnComponent}>
            Adicionar componente
        </div>
        {/if}
    </div>

    <div class="side-controls-general">
        <div class="delete-icon" on:click={deleteComponent($focusedComponent.id)}>
            <Icon name="trash" style="color: var(--plrfacil-white);font-size: 32px; opacity: 0.6" />
        </div>
    </div>
</aside>
{/if}
<section class="controls">
    <div class="add-icon" on:click={onOpenAdd}>
        <Icon name="plus" style="font-size: 22px;" />
        {#if $openedAdd}
            <section class="opened-add-dropdown" use:clickOutside on:click_outside={onCloseAdd}>
                <ul>
                    <li on:click={addVideoplayer}>
                        Video
                    </li>
                    <li on:click={addCTA}>
                        Call-To-Action
                    </li>
                    <li on:click={addText}>Texto</li>
                    <li on:click={addContainer}>
                        Container
                    </li>
                </ul>
            </section>
        {/if}
    </div>
</section>
<div 
    use:dndzone={{ items: $content.components, morphDisabled: true, dragDisabled: $dragDisabled, flipDurationMs, dropTargetStyle: {outline: '#3A61C7 solid 2px'}, centreDraggedOnCursor: true }}
    on:consider={handleConsider}
    on:finalize={handleFinalize}
    class="body-container"
>
    {#each $content.components as component (component.id)}
    <div 
        tabindex={$dragDisabled ? 0 : -1} 
        class="animate-container component" 
        class:active={component.id === $focusedComponent.id} 
        animate:flip={{ duration: flipDurationMs }} 
        on:click={selectComponent(component.id)}
    >
        {#if isVideoplayer(component)}
            {#if !isDrag}
            <VideoPlayer 
                {...component}
                {selectComponent}
                active={component.id === $focusedComponent.id}
            />
            {:else}
            <div class="videoplayer-skeleton">
                <Icon name="camera-fill" />
            </div>
            {/if}
        {/if}
        {#if isCTA(component)}
            <div 
                id={component.id} 
                class="cta"
                on:click={selectComponent(component.id)}

                aria-label="drag-handle"
            >
                <button 
                style="
                    background: {component.color};
                ">{component.text}</button>
            </div>
        {/if}
        {#if isText(component)}
            <p style="
                color: {component.color}; 
                font-size: {component.fontSize};
                text-align: {component.textAlign};
                ">{component.text}</p>
        {/if}
        {#if isContainer(component)}
            <div
                class="body-container-component"
            >
                {#each component.slot.components as subcomponent (subcomponent.id)}
                    {#if isColumn(subcomponent)}
                        <Col auto style={$focusedComponent.id === subcomponent.id ? 'border: 2px solid var(--plrfacil-blue);' : ''}>
                            {#each subcomponent.slot.components as subOneComponent}
                                {#if isCTA(subOneComponent)}
                                    <div 
                                        id={subOneComponent.id} 
                                        class="cta"
                                        aria-label="drag-handle"
                                    >
                                        <button>{subOneComponent.text}</button>
                                    </div>
                                {/if}
                            {/each}
                        </Col>
                    {/if}
                    {#if isCTA(subcomponent)}
                        <div 
                            id={subcomponent.id} 
                            class="cta"
                            on:click={selectComponent(subcomponent.id)}
                        
                            aria-label="drag-handle"
                        >
                            <button>{subcomponent.text}</button>
                        </div>
                    {/if}
                {/each}
            </div>
        {/if}
        <div 
            class="draggable-button"
            style={$dragDisabled ? 'cursor: grab' : 'cursor: grabbing'}
            on:mousedown={startDrag}
            on:touchstart={startDrag}
            on:keydown={handleKeyDown}    
        >
            <Icon name="arrows-move" />
        </div>
    </div>
    {/each}
</div>
<section class="body" on:click={deselectComponent}>
</section>

<style>
    .config-icon {
        cursor: pointer;
    }
    .column-config-actions {
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
    .column-config {
        position: relative;
        padding: 10px;
        margin: 10px 0px;
        border-radius: 5px;
        background: var(--plrfacil-white);

        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .column-config p {
        margin: 0px;
        font-size: 18px;
    }
    .add-container-column-button {
        background: var(--plrfacil-white);
        padding: 10px;
        text-align: center;
        border-radius: 5px;
        color: var(--plrfacil-dark);
        cursor: pointer;
    }
    .side-controls-component h3 {
        margin-top: 25px;
        margin-bottom: 25px;
        color: var(--plrfacil-white);
    }
    .option-control {
        margin-top: 10px;
    }
    
    :global(vm-playback-control) {
        --vm-control-scale: 1.7;
    }

    .videoplayer-skeleton {
        border: 2px solid var(--plrfacil-gray);
        padding: 20px;
        display: flex;
        justify-content: center;
    }
    .animate-container {
        position: relative;
        display: block;
        height: 100%;
    }
    .draggable-button {
		position: absolute;
        top:0px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        margin-left: 10px;
		right: -25px;
        height: 100%;
        width: 50px;
	}
    .delete-icon {
        cursor: pointer;
    }

    .side-controls-general {
        margin-top: auto;
        display: flex;
        justify-content: flex-end;
        margin-right: 20px;
    }
    .side-controls {
        z-index: 5;
        position: absolute;
        background: var(--plrfacil-opacity-blue);
        width: 300px;
        height: 100vh;

        padding: 10px;

        display: flex;
        flex-direction: column;
    }
    .side-controls h2 {
        color: var(--plrfacil-gray);
        font-family: 'Roboto';
        font-size: 24px;

        margin-bottom: 60px;
    }
    .opened-add-dropdown {
        border-radius: 5px;
        position: absolute;
        background: var(--plrfacil-white);
        bottom: -225px;
        left: -50px;
    }
    .opened-add-dropdown ul {
        list-style: none;
        padding: 2px 5px;
    }
    .opened-add-dropdown ul li {
        opacity: 0.7;
        padding: 10px;
        cursor: pointer;
    }
    .opened-add-dropdown ul li:hover {
        opacity: 1;
    }
    .controls {
        z-index: 20;
        position: absolute;
        top: 20px;
        right: 20px;
        background: var(--plrfacil-white);
        padding: 10px;
        border-radius: 10px;
    }
    .add-icon {
        cursor: pointer;
    }
    .body {
        z-index: 1;
        position: fixed;
        width: 100vw;
        height: 100vh;
        background: var(--plrfacil-dark);
    }
    .body-container {
        margin-top: 20px;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        left: 50%;
        transform: translateX(-50%);
        z-index: 5;
        min-width: 800px;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
        color: var(--plrfacil-white);
    }
    .body-container-component {
        display: flex;
    }
    .component {
        width: 100%;
        height: 100%;
    }
    .component.active {
        border: 2px solid var(--plrfacil-blue);
    }

    .component .cta button {
        border: none;
        font-size: 18px;
        font-family: 'Roboto';
        font-weight: bold;
        padding: 5px 15px;
        width: 100%;
        border-radius: 5px;
        margin-top: 30px;
        margin-bottom: 30px;
        background: var(--plrfacil-blue);
        color: var(--plrfacil-white);
    }
</style>