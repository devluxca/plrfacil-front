<script>
	export let text 
</script>

<div class="card-header">
	<slot/>
    <!-- <hr> -->
</div>

<style>
    .card-header{
        display: flex;
        background-color: var(--card-header-color, #FFF);
        flex-direction: var(--card-header-direction, row);
        width: var(--card-header-width, 20%);
        padding: var(--card-header-padding, 10px);
        border: none;
    }
</style>