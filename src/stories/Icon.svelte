<head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
</head>

<script>
	import {Tooltip} from 'sveltestrap'

    export let isSvg = false
	export let hasTooltip = false
    export let id, src, styles, name, tooltipPlacement, tooltipMessage = ''
</script>

{#if isSvg}
	<img class="{styles}" alt="{name}" src="{src}"/>
{:else}
	<i id={id} class="bi bi-{name} "></i>
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
		color: var(--icon-color, #CCC);
		padding-right: 5px;
		font-size: var(--icon-size, 45px);
	}
	
	.bi-check2-square{
		position: absolute;
		top: 5px;
		right: 10px;
	}
	
	.round{
		border: 1px solid #4f83d6;
		border-radius: 50%;
		padding: 5px;
}
</style>
