import Icon from './Icon.svelte';

import { action } from '@storybook/addon-actions';

export default {
    component: Icon,
    title: 'Details / Icon',
    isSvg: {control: 'boolean'},
    hasTooltip: {control: 'boolean'},
    src: {control: 'text'},
    styles: {
        control: { styles: 'select' },
        options: ['round'],
      },
    name: { control: 'text' },
    tooltipMessage: { control: 'text' }
};

const Template = (args) => ({
  Component: Icon,
  props: args,
  on: {
  },
});

export const BootstrapIcon = Template.bind({});
BootstrapIcon.args = {
    isSvg: false,
    hasTooltip: false,
    name: 'house'
};

export const SvgIcon = Template.bind({});
SvgIcon.args = {
    isSvg: true,
    src: 'https://randomuser.me/api/portraits/women/79.jpg',
    styles: 'round',
    name: 'Foto de perfil'
  };

  export const TooltipIcon = Template.bind({});
  TooltipIcon.args = {
      id: 'name',
      isSvg: false,
      hasTooltip: true,
      tooltipPlacement: 'top',
      tooltipMessage: 'Tooltip Message',
      name: 'house'
    };