import { Graphics } from 'pixi.js';
import { PixiComponent } from '@inlet/react-pixi';

export default PixiComponent('Rectangle', {
  create: props => {
    return new Graphics();
  },
  didMount: (instance, parent) => {
    // apply custom logic on mount
  },
  willUnmount: (instance, parent) => {
    // clean up before removal
  },
  applyProps: (instance, oldProps, newProps) => {
    const { fill, line, x, y, width, height } = newProps;
    instance.clear();
    fill && instance.beginFill(fill);
    line && instance.lineStyle(line);
    instance.drawRect(x, y, width, height);
    instance.endFill();
  },
});
