<script>
	export let icon, text
	
	import Button from './Button.svelte';
	import Span from './Span.svelte';
	import Icon from './Icon.svelte';
</script>


<Button>
	<Icon
		isSvg={false}
		name={icon}
		styles=''
		src=''
	/>
	<Span
		type='text'
		text={text}	
	/>
</Button>
