<script>
    import { map } from 'ramda'
    import { selecting } from '@utils/object'

    import {Row, Col} from 'sveltestrap'
    
    import { NichoCard } from '@lib/card'
    import { Card, CardHeader, CardTitle, CardBody, CardText } from '@lib/card'
    import { Icon } from '@lib/details'

    export let objects

</script>

    <Row>
        {#each objects as object}
            <Col>
                <slot {object}/>
            </Col>
        {/each}
    </Row>

