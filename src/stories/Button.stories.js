import Button from './Button.svelte';

import { action } from '@storybook/addon-actions';

export default {
  component: Button,
  title: 'Buttons / Button',
  argTypes: {
    onClick: { action: 'onClick' },
  },
};

const Template = (args) => ({
  Component: Button,
  props: args,
  on: {
    click: args.onClick,
  },
}
);

export const Primary = Template.bind({});
Primary.args = {
  
};