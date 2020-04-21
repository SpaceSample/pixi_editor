import { AnimatedSprite, BitmapText, Container, Graphics, NineSlicePlane, ParticleContainer, SimpleMesh, SimpleRope, Sprite, Stage, Text, TilingSprite } from '@inlet/react-pixi';
import Rectangle from './Rectangle';
import { AttrType, checkRequeiredAttrType } from './attrs_def';
import * as PIXI from 'pixi.js';
import React from 'react';

const attrDefMap = {
  AnimatedSprite: {
    anim: { isRequired: true, type: AttrType.STRING },
    animationSpeed: { isRequired: false, type: AttrType.NUMBER, default: 1 },
    x: { isRequired: false, type: AttrType.NUMBER },
    y: { isRequired: false, type: AttrType.NUMBER },
    scale: { isRequired: false, type: AttrType.POINT, default: 1 },
    angle: { isRequired: false, type: AttrType.NUMBER },
    anchor: { isRequired: false, type: AttrType.POINT, default: 0 },
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
    anchor: { isRequired: false, type: AttrType.POINT, default: 0 },
    visible: { isRequired: false, type: AttrType.BOOL, default: true },
  },
  Text: {
    text: { isRequired: false, type: AttrType.STRING },
    style: { isRequired: false, type: AttrType.JSON, default: '{"fontFamily":"Arial","fill":"#000000","align":"center","fontSize":"26px"}' },
    x: { isRequired: false, type: AttrType.NUMBER },
    y: { isRequired: false, type: AttrType.NUMBER },
    scale: { isRequired: false, type: AttrType.POINT, default: 1 },
    angle: { isRequired: false, type: AttrType.NUMBER },
    anchor: { isRequired: false, type: AttrType.POINT, default: 0.5 },
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
  attrs.style = new PIXI.TextStyle(attrs.style || attrDefMap.Text.style.default);
  attrs.anchor = attrs.anchor || attrDefMap.Text.anchor.default;
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
      try{
        PIXI.Loader.shared.add(jsonFile).load();
      } catch(e) {
        console.log(e);
      }
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