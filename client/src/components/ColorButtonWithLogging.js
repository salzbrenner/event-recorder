import ColorButton from './ColorButton';
import withEventLogging from '../withEventLogging';
export const COLOR_BUTTON_REF = 'COLOR_BUTTON_REF';

const ColorButtonWithLogging = withEventLogging(
  ColorButton,
  ['click'],
  COLOR_BUTTON_REF
);

export default ColorButtonWithLogging;
