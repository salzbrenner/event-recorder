import Ripple from './Ripple';
import withEventLogging from '../withEventLogging';

export const RippleWithLogging = withEventLogging(
  Ripple,
  Ripple.monitoredEvents
);
