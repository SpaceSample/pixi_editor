import { AnimatedSprite, BitmapText, Container, Graphics, NineSlicePlane, ParticleContainer, SimpleMesh, SimpleRope, Sprite, Stage, Text, TilingSprite } from '@inlet/react-pixi';
import Rectangle from './Rectangle';
import { AttrType, checkRequeiredAttrType } from './attrs_def';
import * as PIXI from 'pixi.js';
import React from 'react';

const attrDefMap = {
  AnimatedSprite: {
    anim: { isRequired: true, type: AttrType.STRING },
    animationSpeed: { isRequired: false, type: AttrType.NUMBER },
    x: { isRequired: false, type: AttrType.NUMBER },
    y: { isRequired: false, type: AttrType.NUMBER },
    scale: { isRequired: false, type: AttrType.POINT, default: 1 },
    angle: { isRequired: false, type: AttrType.NUMBER },
    visible: { isRequired: false, type: AttrType.BOOL, default: true },
  },
  Container: {
    x: { isRequired: false, type: AttrType.NUMBER },
    y: { isRequired: false, type: AttrType.NUMBER },
    scale: { isRequired: false, type: AttrType.POINT, default: 1 },
    angle: { isRequired: false, type: AttrType.NUMBER },
    visible: { isRequired: false, type: AttrType.BOOL, default: true },
  },
  Sprite: {
    image: { isRequired: true, type: AttrType.STRING },
    x: { isRequired: false, type: AttrType.NUMBER },
    y: { isRequired: false, type: AttrType.NUMBER },
    scale: { isRequired: false, type: AttrType.POINT, default: 1 },
    angle: { isRequired: false, type: AttrType.NUMBER },
    visible: { isRequired: false, type: AttrType.BOOL, default: true },
  },
  Text: {
    text: { isRequired: false, type: AttrType.STRING },
    style: { isRequired: false, type: AttrType.JSON },
    x: { isRequired: false, type: AttrType.NUMBER },
    y: { isRequired: false, type: AttrType.NUMBER },
    width: { isRequired: false, type: AttrType.NUMBER },
    height: { isRequired: false, type: AttrType.NUMBER },
    scale: { isRequired: false, type: AttrType.POINT, default: 1 },
    angle: { isRequired: false, type: AttrType.NUMBER },
    visible: { isRequired: false, type: AttrType.BOOL, default: true },
  },
};

function checkRequiredAttrs(componentName, attrs) {
  return checkRequeiredAttrType(attrs, attrDefMap[componentName]);
}

function getAttrDef(componentName) {
  return attrDefMap[componentName];
}

const originComponents = { AnimatedSprite, BitmapText, Container, Graphics, NineSlicePlane, ParticleContainer, SimpleMesh, SimpleRope, Sprite, Stage, Text, TilingSprite };

const TextWrapper = (props) => {
  const attrs = { ...props };
  if (attrs.style) {
    attrs.style = new PIXI.TextStyle(attrs.style);
  }
  return React.createElement(Text, attrs, props.children);
};

const AnimatedSpriteWrapper = (props) => {
  const attrs = { ...props };
  if (attrs.anim) {
    const [jsonFile, animName] = attrs.anim.split(':');
    const res = PIXI.Loader.shared.resources[jsonFile];
    if (res && res.spritesheet && res.spritesheet.animations) {
      attrs.textures = res.spritesheet.animations[animName];
    } else if (animName) {
      PIXI.Loader.shared.add(jsonFile).load();
    }
  }
  if (attrs.textures) {
    attrs.isPlaying = true;
    return React.createElement(AnimatedSprite, attrs, props.children);
  }
  return null;
};

const ComponentMap = {
  ...originComponents,
  Text: TextWrapper,
  AnimatedSprite: AnimatedSpriteWrapper,
  Rectangle,
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
export { getComponentSymbol, checkRequiredAttrs, AttrType, getAttrDef };