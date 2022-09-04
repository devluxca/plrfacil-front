<script>
	export let type
	export let text = ''
</script>

{#if type == 'pro'}
	<span class="{type}">PRO</span>
{:else}
	<span class="text">{text}</span>
{/if}


<style>
	.text{
	font-size: var(--span-text--font-size, 45px);
	color: var(--span-text-color, #CCC);
    font-weight: 400;
    font-family: 'Roboto';
    line-height: 26px;
	}	

.pro {
	font-size: var(--span-pro-font-size, 14px);
	color: var(--span-pro-color, #231E39);
	background-color: var(--span-pro-bg-color, #FEBB0B);
	border-radius: 3px;
	
	font-weight: bold;
	padding: 3px 7px;
	position: absolute;
	top: 30px;
	left: 30px;
}
</style>