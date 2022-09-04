<script>
    import { Card, CardHeader, CardTitle, CardBody, CardText } from '@lib/card'
    import { Icon } from '@lib/details'
    export let id, name, text, tooltipMessage, tooltipPlacement
</script>

<Card
    --card-color="rgb(58,97,199,0.2)"
    --card-padding="0"
>
    <CardHeader 
        --card-header-color="rgb(58,97,199,0.2)"
        --card-header-direction="row"
        --card-header-width="100%"
    >
        <CardTitle 
            {text}
        />
        <Icon 
            {id} 
            isSvg={false} 
            name='info-square'
            --icon-size="26px"
            --icon-padding="0px"
            hasTooltip
            {tooltipPlacement}
            {tooltipMessage} 
        />
    </CardHeader>
    <CardBody>
        <slot/>
    </CardBody>
</Card>