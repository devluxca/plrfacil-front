<script>
	import {Tooltip} from 'sveltestrap'

    export let isSvg = false
	export let hasTooltip = false
    export let id, src, styles, name, tooltipPlacement, tooltipMessage = ''
</script>

{#if isSvg}
	<img {id} class={styles} alt={name} {src}/>
{:else}
	<i {id} class="bi bi-{name}"></i>
	{#if hasTooltip}
		<Tooltip 
			target={id}
			placement={tooltipPlacement}
		>
			{tooltipMessage}
		</Tooltip>
	{/if}
{/if}

<style>
	i{
		cursor: pointer;
		color: var(--icon-color, var(--plrfacil-blue));
		padding: var(--icon-padding, 5px);
		font-size: var(--icon-size, 45px);
	}
	
	.bi-check2-square{
		position: absolute;
		top: 10px;
		right: 10px;
	}
	
	img{
		max-width: fit-content;
	}

	.round{
		border: 1px solid var(--round-color, var(--plrfacil-blue));
		border-radius: 50%;
		padding: var(--round-padding, 5px);
		margin: var(--round-margin);
	}
</style>
