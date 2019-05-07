<?php

namespace elektromann\openlayers;

use Yii;
use yii\base\Component;

/**
 * 'bingMapsKey' => 'Your Bing Maps Key from http://www.bingmapsportal.com/'
 */
class OpenLayersComponent extends Component
{
    public $bingMapsKey;
    
    /**
     * @param string $property_name
     * @return type
     */
    public static function getProperty($property_name)
    {
        if(array_key_exists('OpenLayersComponent', Yii::$app->components)) {
            return Yii::$app->OpenLayersComponent->$property_name;
        }
        
        return null;
    }
}