<?php

namespace elektromann\openlayers\bundles;

use yii\web\View;
use yii\web\AssetBundle;

/**
 * Main frontend application asset bundle.
 */
class OpenLayersAsset extends AssetBundle
{
    public $sourcePath = '@elektromann/openlayers/assets';
    
    public $js = [
        'https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.3.0/build/ol.js',
        'javascript/position.js',
        'javascript/layers.js',
        'javascript/event.js',
        'javascript/map.js',
    ];
    
    public $css = [
        'https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.3.0/css/ol.css',
        'css/map.css',
    ];

    public $jsOptions = [
        'position' => View::POS_HEAD,
    ];
    
    public $cssOptions = [
        'position' => View::POS_HEAD,
    ];
}
