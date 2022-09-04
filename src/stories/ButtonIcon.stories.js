import ButtonIcon from './ButtonIcon.svelte';

import { action } from '@storybook/addon-actions';

export default {
  component: ButtonIcon,
  title: 'Buttons / ButtonIcon',
  argTypes: {
    onClick: { action: 'onClick' },
  },
};

const Template = (args) => ({
  Component: ButtonIcon,
  props: args,
  on: {
    click: args.onClick,
  },
    icon:{ control:'text' },
    text:{ control:'text' }
}
);

export const Primary = Template.bind({});
Primary.args = {
    icon: 'house',
    text: 'Botão'
 };