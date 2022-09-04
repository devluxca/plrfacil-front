<script>
	export let text 
</script>

<div class="card-body">
	<slot/>
</div>

<style>
    .card-body{
        display: flex;
        flex-direction: row;
        flex-direction: var(--card-header-direction, row);
    }
</style>