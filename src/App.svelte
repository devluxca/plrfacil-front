<script>
  import Router, { replace } from 'svelte-spa-router'
  import { routes } from './routes/'

  import { isNil } from 'ramda'

  const conditionsFailed = async () => {
		const currentUser = null
		if (isNil(currentUser)) {
			replace('/login')
		}
	}
</script>

<Router {routes} on:conditionsFailed={conditionsFailed} />