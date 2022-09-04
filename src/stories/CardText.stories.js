import CardText from './CardText.svelte';

import { action } from '@storybook/addon-actions';

export default {
    component: CardText,
    title: 'Card Components/ Card Text',
    text: {control: 'text'},
};

const Template = (args) => ({
  Component: CardText,
  props: args,
  on: {
  },
});

export const Default = Template.bind({});
Default.args = {
    text: 'Card Title'
};