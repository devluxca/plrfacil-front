<button on:click>
  <slot />
</button>

<style>
	button{
		border: none;
		width: fit-content;
		opacity: 0.8;
		margin-top: 10px;
		background: var(--plrfacil-blue, #000);
		color: var(--plrfacil-white, #FFF);
		border-radius: 4px;
		padding: 10px;
	}
	
	button:focus {
		border: none;
		outline: none;
 	}
  
	button:hover {
		opacity: 1;
  }
</style>
