<script>
    import { Card, CardHeader, CardTitle, CardBody, CardText } from '@lib/card'
    import { Icon } from '@lib/details'

    export let id, title, text, img
    export let isSelected = true
</script>

<Card on:click
    --card-cursor='pointer'
    --card-color="rgb(58,97,199,0.2)"
    --card-padding=20px
>    
    {#if isSelected}
        <Icon
            name="check2-square"
            --icon-size="30px"
        />
    {/if}
    <Icon
        isSvg
        src="{img}"
        name="nicho-icon"
        --round-color='transparent'
        --icon-padding=45px
    />
    <CardTitle
        text="{title}"
        --card-title-padding='10px 0px 0px 0px'
    />
    <CardText
        text="{text}"
        --card-text-padding='10px 0px 0px 0px'
    />
</Card>

