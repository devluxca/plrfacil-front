<div on:click class="card-container">
	<slot></slot>
</div>

<style>	
	.card-container {
		display: flex;
		cursor: var(--card-cursor);
		background-color: var(--card-color, hsla(0, 0%, 100%, 0.753));
		flex-direction: var(--card-direction, column);
		border-radius: 6px;
		box-shadow: 10px 0px 66px -10px rgb(0, 0, 0, 0.25);
		padding: var(--card-padding, 10px);
		margin: 20px;
		position: relative;
		width: var(--card-width, 100);
		height: var(--card-height, 100%);
		max-width: 100%;
		max-height: 85%;
		text-align: left;
	}
</style>