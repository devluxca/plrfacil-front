<script>
    import { Navbar } from '@lib/navbar'
    import {RowOfCards, NichoCard, QuestionCard} from '@lib/card'
    
    export let multipleChoice = false

    import { selecting } from '@utils/object'

    let objects = [
        {	
            id:1,
            title: "Saúde",
            img: "saude.svg",
            text: "Por exemplo: Se você vende algo que ensina como melhorar  relacionamento amoroso alheio, isso se encaixa no nicho de relacionamentos",
            isSelected: false
        },
        {	
            id:2,
            title: "Relacionamentos",
            img: "relacionamento.svg",
            text: "Por exemplo: Se você vende algo que ensina como melhorar  relacionamento amoroso alheio, isso se encaixa no nicho de relacionamentos",
            isSelected: false
        },
        {	
            id:3,
            title: "Finanças",
            img: "financas.svg",
            text: "Por exemplo: Se você vende algo que ensina como melhorar  relacionamento amoroso alheio, isso se encaixa no nicho de relacionamentos",
            isSelected: false
        }
    ]

    const onSelecting = (objs) => (id) => () => { 
        objects = selecting(id, multipleChoice)(objs)
    } 
    $: onSelectingWithObjects = onSelecting(objects) 

</script>


<Navbar/>

<QuestionCard 
    id='nicho-question'
    text='Qual o nicho do seu PLR?'
    tooltipPlacement='right'
    tooltipMessage='Escolha algo relacionado a dor que o seu produto soluciona'
>
    <RowOfCards let:object {objects}>
        <NichoCard on:click={onSelectingWithObjects(object.id)}
            {...object}
        />
    </RowOfCards>
</QuestionCard>

<QuestionCard 
    id='nicho'
    text='Qual o subnicho que esse PLR está inserido?'
    tooltipPlacement='right'
    tooltipMessage='Escolha sempre subnichos bem específicos como por exemplo "Professoras secando na água" '
>
Olá
</QuestionCard>