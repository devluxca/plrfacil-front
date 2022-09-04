import CardTitle from './CardTitle.svelte';

import { action } from '@storybook/addon-actions';

export default {
    component: CardTitle,
    title: 'Card Components/ Card Title',
    text: {control: 'text'},
};

const Template = (args) => ({
  Component: CardTitle,
  props: args,
  on: {
  },
});

export const Default = Template.bind({});
Default.args = {
    text: 'Card Title'
};