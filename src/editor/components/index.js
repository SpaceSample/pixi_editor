import { AnimatedSprite, BitmapText, Container, Graphics, NineSlicePlane, ParticleContainer, SimpleMesh, SimpleRope, Sprite, Stage, Text, TilingSprite } from '@inlet/react-pixi';
import Rectangle from './Rectangle';

const originComponents = { AnimatedSprite, BitmapText, Container, Graphics, NineSlicePlane, ParticleContainer, SimpleMesh, SimpleRope, Sprite, Stage, Text, TilingSprite };

const ComponentMap = {
  ...originComponents,
  Rectangle
};

const ComponentSymbolMap = {
  Container: '📂',
  Sprite: '🍒',
  AnimatedSprite: '🐟',
  Text: '🅰',
  BitmapText: '🅱',
  Graphics: '✡',
  TilingSprite: '🈁',
};

const getComponentSymbol = type => {
  const s = ComponentSymbolMap[type];
  return s || '💠';
};

export default ComponentMap;
export { getComponentSymbol };