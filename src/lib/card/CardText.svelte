<script>
	export let text
</script>

<h6 class="card-text">
	{text}
</h6>

<style>
	.card-text{
		padding: var(--card-text-padding, 10px);
		color: var(--card-text-color, rgb(0,0,0,0.5));
		font-size: var(--card-text-font-size, '20px');
		text-align: var(--card-text-align, left)
	}
</style>


