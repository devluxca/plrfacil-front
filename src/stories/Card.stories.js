import Card from './Card.svelte';

import { action } from '@storybook/addon-actions';

export default {
    component: Card,
    title: 'Card Components/Card',
};

const Template = (args) => ({
  Component: Card,
  props: args,
  on: {
  },
});

export const Default = Template.bind({});
Default.args = {
};