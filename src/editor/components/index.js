import { AnimatedSprite, BitmapText, Container, Graphics, NineSlicePlane, ParticleContainer, SimpleMesh, SimpleRope, Sprite, Stage, Text, TilingSprite } from '@inlet/react-pixi';
import Rectangle from './Rectangle';
import { AttrType, checkRequeiredAttrType } from './attrs_def';

const attrDefMap = {
  Sprite: {
    image: {isRequired: true, type: AttrType.STRING},
    x: {isRequired: false, type: AttrType.NUMBER},
    y: {isRequired: false, type: AttrType.NUMBER},
    scale: {isRequired: false, type: AttrType.POINT},
  }
};

function checkRequiredAttrs(componentName, attrs){
  checkRequeiredAttrType(attrs, attrDefMap[componentName]);
}

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
export { getComponentSymbol, checkRequiredAttrs };