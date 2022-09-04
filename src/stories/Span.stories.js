import Span from './Span.svelte';

import { action } from '@storybook/addon-actions';

export default {
  component: Span,
  title: 'Details / Span',
  argTypes: {
    type: {
        control: { type: 'select' },
        options: ['text', 'pro'],
      },
    text: {control: 'text'},
    },
};

const Template = (args) => ({
  Component: Span,
  props: args,
  on: {
  },
});

export const Pro = Template.bind({});
Pro.args = {
    type: 'pro'
};

export const Text = Template.bind({});
Text.args = {
    type: 'text',
    text: 'String'
};