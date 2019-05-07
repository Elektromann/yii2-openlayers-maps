<?php

namespace elektromann\openlayers;

use yii\web\View;
use yii\helpers\Html;
use yii\base\InvalidConfigException;
use elektromann\openlayers\OpenLayersComponent;
use elektromann\openlayers\bundles\OpenLayersAsset;

/**
 * To learn about this widget visit the wiki:
 *
 * https://github.com/Elektromann/yii2-openlayers-maps/wiki
 */
class Map extends \yii\base\Widget
{
    const TYPE_SIMPLE = "simple";
    const TYPE_STAMEN_WATERCOLOR = "stamenWaterColor";
    const TYPE_STAMEN_TERRAIN = "stamenTerrain";
    const TYPE_XYZ_ESRI = "xyzEsri";
    const TYPE_BINGMAPS = "bingMaps";
    
    const GEOCODING_NOMINATIM = "nominatim";
    const GEOCODING_BINGMAPS = "bingMaps";

    public $mapId = "map";
    public $boxWidth = "100%";
    public $boxHeight = "500px";
    public $type = null;
    public $center = [20.322990, 46.419281];
    public $fullScreenButton = false;
    public $markers = [];
    public $zoom = 13;
    public $geocoding = [];


    private $options;

    private static $mapIdList;

    /**
     * @param string $type
     * @return array|string
     */
    public function getType($type = null) {
        $result = [
            self::TYPE_SIMPLE,
            self::TYPE_STAMEN_WATERCOLOR,
            self::TYPE_STAMEN_TERRAIN,
            self::TYPE_XYZ_ESRI,
            self::TYPE_BINGMAPS,
        ];
        
        if($type === null) {
            return $result;
        }
        
        if(in_array($type, $result)) {
            return $type;
        }
        
        return null;
    }

    /**
     * {@inheritdoc}
     */
    public function init()
    {
        OpenLayersAsset::register($this->view);
        
        $this->initType();
        $this->initBingMaps();
        $this->initGeocoding();
        
        if(!empty(self::$mapIdList)) {
            $mapId = $this->mapId;
            $counter = 0;
            
            while (in_array($mapId, self::$mapIdList)) {
                $mapId = $this->mapId . ++$counter;
            }
            
            $this->mapId = $mapId;
        }
        
        self::$mapIdList[] = $this->mapId;
        
        $this->createOptions();
    }
    
    /**
     * Initializing map type
     * @throws InvalidConfigException
     */
    private function initType()
    {
        if($this->type === null) {
            $this->type = self::TYPE_SIMPLE;
        } else{
            if(is_array($this->type)) {
                $type = array_key_exists(0, $this->type) ? $this->type[0] : '[]';
            } else {
                $type = $this->type;
            }
            
            if ($this->getType($type) === null) {
                throw new InvalidConfigException("Wrong type: {$type}!");
            }
        }
    }
    
    /**
     * Initializing Bing Maps options
     * @throws InvalidConfigException
     */
    private function initBingMaps()
    {
        if(is_array($this->type) && array_key_exists(0, $this->type) && $this->type[0] == self::TYPE_BINGMAPS) {
            if(!array_key_exists('apiKey', $this->type) && OpenLayersComponent::getProperty('bingMapsKey') === null) {
                throw new InvalidConfigException("If you use Bing Map type, you need to set api key!");
            } elseif(!array_key_exists('apiKey', $this->type)) {
                $this->type['apiKey'] = OpenLayersComponent::getProperty('bingMapsKey');
            }
            
            if(!array_key_exists('mapType', $this->type)) {
                $this->type['mapType'] = 'AerialWithLabels';
            }
        }
        
        if($this->type == self::TYPE_BINGMAPS) {
            
            if(OpenLayersComponent::getProperty('bingMapsKey') === null) {
                throw new InvalidConfigException("If you use Bing Map type, you need to set api key!");
            }
            
            $this->type = [
                self::TYPE_BINGMAPS,
                'mapType' => 'AerialWithLabels',
                'apiKey' => OpenLayersComponent::getProperty('bingMapsKey'),
            ];
        }
    }
    
    /**
     * Initializing geocoding options
     * @throws InvalidConfigException
     */
    private function initGeocoding()
    {
        if(is_array($this->type) && array_key_exists(0, $this->type) && $this->type[0] == self::TYPE_BINGMAPS) {
            if(!array_key_exists("apiKey", $this->geocoding)) {
                $this->geocoding['apiKey'] = $this->type['apiKey'];
            }
            
            if(!array_key_exists(0, $this->geocoding)) {
                $this->geocoding[0] = self::GEOCODING_BINGMAPS;
            }
        } elseif(!in_array(0, $this->geocoding)) {
            $this->geocoding[0] = self::GEOCODING_NOMINATIM;
        }
        
        if($this->geocoding[0] === self::GEOCODING_BINGMAPS){
            if(!array_key_exists('apiKey', $this->geocoding) && OpenLayersComponent::getProperty('bingMapsKey') === null) {
                throw new InvalidConfigException("If you use Bing Map geocoding, you need to set api key!");
            } elseif(!array_key_exists('apiKey', $this->geocoding)) {
                $this->geocoding['apiKey'] = OpenLayersComponent::getProperty('bingMapsKey');
            }
        } elseif ($this->geocoding[0] !== self::GEOCODING_NOMINATIM) {
            throw new InvalidConfigException("Wrong geocoding type: {$this->geocoding[0]}!");
        }
        
        if(!array_key_exists("limit", $this->geocoding)) {
            $this->geocoding["limit"] = 1;
        }
    }
    
    /**
     * {@inheritdoc}
     */
    public function run()
    {
        $this->view->registerJs("new map({$this->options}).addMap();", View::POS_END);
        
        return Html::tag('div', '', ['id' => $this->mapId, 'class' => "map", 'style' => "width: {$this->boxWidth}; height: {$this->boxHeight};"]);
    }
    
    /**
     * Create options for JavaScript
     */
    private function createOptions()
    {
        $options = [
            'id' => $this->mapId,
            'type' => $this->type,
            'center' => $this->center,
            'fullScreenButton' => $this->fullScreenButton,
            'markers' => $this->markers,
            'zoom' => $this->zoom,
            'geocoding' => $this->geocoding,
        ];
        
        $this->options = json_encode($options);
    }
}
