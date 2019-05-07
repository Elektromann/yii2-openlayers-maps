Yii2 OpenLayers Maps
====================
Use free maps in your site

Yii2 OpenLayers Maps wiki pages
-------------------------------

* [Wiki home page](https://github.com/Elektromann/yii2-openlayers-maps/wiki)
* [Install OpenLayers map](https://github.com/Elektromann/yii2-openlayers-maps/wiki/Install)
* [Quick start](https://github.com/Elektromann/yii2-openlayers-maps/wiki/Quick-start)
* [Map types](https://github.com/Elektromann/yii2-openlayers-maps/wiki/Map-types)
    * [Bing Maps](https://github.com/Elektromann/yii2-openlayers-maps/wiki/Bing-Maps)
* [Geocoding](https://github.com/Elektromann/yii2-openlayers-maps/wiki/Geocoding)
* [Markers](https://github.com/Elektromann/yii2-openlayers-maps/wiki/Markers)
* [Other options](https://github.com/Elektromann/yii2-openlayers-maps/wiki/Other-options)

Installation
------------

The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
php composer.phar require --prefer-dist elektromann/yii2-openlayers-maps "*"
```

or add

```
"elektromann/yii2-openlayers-maps": "*"
```

to the require section of your `composer.json` file.


Usage
-----

### Show simple map

This will show a map.

```php
<?= \elektromann\openlayers\Map::widget(); ?>
```

### Set map center position

You can use longitude and latitude (LonLat) coordinates to set position.

```php
<?= \elektromann\openlayers\Map::widget([
    'center' => [-0.1276474, 51.5073219], //London
]); ?>
```

Or you can use address to find coordinates by geocoding.

```php
<?= \elektromann\openlayers\Map::widget([
    'center' => "London",
]); ?>
```

### Show multi maps

To show multi maps echo more widgets.

```php
<?= \elektromann\openlayers\Map::widget([
    'center' => "London",
]); ?>
<?= \elektromann\openlayers\Map::widget([
    'center' => [13.3888599, 52.5170365], //Berlin
]); ?>
```

### Add markers to the map

You can add markers to the map.

```php
<?= \elektromann\openlayers\Map::widget([
    'center' => [-0.1276474, 51.5073219],
    'markers' => [
        [], //Marker in the map center
        [
            'center' => "London, Bond street", //Set marker position
            'title' => "Bond street here", //Title of the marker
            'description' => "You can see Bond street", //Show wher one click on marker
        ],
    ]
]); ?>
```

More informations
-----------------

For other options and informations visit [wiki](https://github.com/Elektromann/yii2-openlayers-maps/wiki).