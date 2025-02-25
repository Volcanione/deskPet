/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LogLevel } from '../Framework/src/live2dcubismframework'

/**
 * Sample Appで使用する定数
 */

// Canvas width and height pixel values, or dynamic screen size ('auto').
export let CanvasSize: { width: number; height: number } | 'auto' = 'auto';

// 画面
export let ViewScale = 1.0;
export let ViewMaxScale = 1.0;
export let ViewMinScale = 1.0;


export let ViewLogicalLeft = 0;
export let ViewLogicalRight = 0;
export let ViewLogicalBottom = 0;
export let ViewLogicalTop = 200;

export let ViewLogicalMaxLeft = 0;
export let ViewLogicalMaxRight = 0;
export let ViewLogicalMaxBottom = 0;
export let ViewLogicalMaxTop = 0;


export let Size = 200;//高度大小


export let container = document.body;//高度大小



// 相対パス
export let ResourcesPath = '';



export let MandatoryMotions = false;//强制动作触发

export let MouseFollow = false;//鼠标视线跟踪





// モデルの後ろにある背景の画像ファイル
export let BackImageName = 'back_class_normal.png';

// 歯車
export let GearImageName = 'icon_gear.png';
export let BgImgUrl = '';

// 終了ボタン

// モデル定義---------------------------------------------
// モデルを配置したディレクトリ名の配列
// ディレクトリ名とmodel3.jsonの名前を一致させておくこと
export let ModelDir: string[] = ['Haru', 'Hiyori', 'Mark', 'Natori', 'Rice'];
export let ModelDirSize: number = ModelDir.length;

// 外部定義ファイル（json）と合わせる
export let MotionGroupIdle = 'Idle'; // アイドリング
export let MotionGroupTapBody = 'TapBody'; // 体をタップしたとき

// 外部定義ファイル（json）と合わせる
export let HitAreaNameHead = 'Head';
export let HitAreaNameBody = 'Body';

// モーションの優先度定数
export let PriorityNone = 0;
export let PriorityIdle = 1;
export let PriorityNormal = 2;
export let PriorityForce = 3;

// デバッグ用ログの表示オプション
export let DebugLogEnable = true;
export let DebugTouchLogEnable = false;

// Frameworkから出力するログのレベル設定
export let CubismLoggingLevel: LogLevel = LogLevel.LogLevel_Verbose;

// デフォルトのレンダーターゲットサイズ
export let RenderTargetWidth = 1900;
export let RenderTargetHeight = 1000;


export default {
  CanvasSize,
  ViewScale,
  ViewMaxScale,
  ViewMinScale,
  ViewLogicalLeft,
  ViewLogicalRight,
  ViewLogicalBottom,
  ViewLogicalTop,
  ViewLogicalMaxLeft,
  ViewLogicalMaxRight,
  ViewLogicalMaxBottom,
  ViewLogicalMaxTop,
  ResourcesPath,
  BackImageName,
  GearImageName,
  ModelDir,
  ModelDirSize,
  MotionGroupIdle,
  MotionGroupTapBody,
  HitAreaNameHead,
  HitAreaNameBody,
  PriorityNone,
  PriorityIdle,
  PriorityNormal,
  PriorityForce,
  DebugLogEnable,
  DebugTouchLogEnable,
  CubismLoggingLevel,
  RenderTargetWidth,
  RenderTargetHeight,
  MandatoryMotions,
  BgImgUrl,
  MouseFollow,
  Size,
  container
}