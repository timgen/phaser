var Camera = require('./Camera');
var Class = require('../../utils/Class');
var Vector3 = require('../../math/Vector3');

//  Local cache vars
var tmpVec3 = new Vector3();

//  Phaser.Cameras.Sprite3D.PerspectiveCamera

var PerspectiveCamera = new Class({

    Extends: Camera,

    //  FOV is converted to radians automatically
    initialize:

    /**
     * [description]
     *
     * @class PerspectiveCamera
     * @extends Phaser.Cameras.Sprite3D.Camera
     * @memberOf Phaser.Cameras.Sprite3D
     * @constructor
     * @since 3.0.0
     *
     * @param {Phaser.Scene} scene - [description]
     * @param {integer} fieldOfView - [description]
     * @param {integer} viewportWidth - [description]
     * @param {integer} viewportHeight - [description]
     */
    function PerspectiveCamera (scene, fieldOfView, viewportWidth, viewportHeight)
    {
        if (fieldOfView === undefined) { fieldOfView = 80; }
        if (viewportWidth === undefined) { viewportWidth = 0; }
        if (viewportHeight === undefined) { viewportHeight = 0; }

        Camera.call(this, scene);

        /**
         * [description]
         *
         * @property {integer} viewportWidth
         * @default 0
         * @since 3.0.0
         */
        this.viewportWidth = viewportWidth;

        /**
         * [description]
         *
         * @property {integer} viewportHeight
         * @default 0
         * @since 3.0.0
         */
        this.viewportHeight = viewportHeight;

        /**
         * [description]
         *
         * @property {integer} fieldOfView
         * @default 80
         * @since 3.0.0
         */
        this.fieldOfView = fieldOfView * Math.PI / 180;

        this.update();
    },

    /**
     * [description]
     *
     * @method Phaser.Cameras.Sprite3D.PerspectiveCamera#setFOV
     * @since 3.0.0
     *
     * @param {[type]} value - [description]
     *
     * @return {[type]} [description]
     */
    setFOV: function (value)
    {
        this.fieldOfView = value * Math.PI / 180;

        return this;
    },

    /**
     * [description]
     *
     * @method Phaser.Cameras.Sprite3D.PerspectiveCamera#update
     * @since 3.0.0
     *
     * @return {[type]} [description]
     */
    update: function ()
    {
        var aspect = this.viewportWidth / this.viewportHeight;

        //  Create a perspective matrix for our camera
        this.projection.perspective(
            this.fieldOfView,
            aspect,
            Math.abs(this.near),
            Math.abs(this.far)
        );

        //  Build the view matrix 
        tmpVec3.copy(this.position).add(this.direction);

        this.view.lookAt(this.position, tmpVec3, this.up);

        //  Projection * view matrix
        this.combined.copy(this.projection).multiply(this.view);

        //  Invert combined matrix, used for unproject
        this.invProjectionView.copy(this.combined).invert();

        this.billboardMatrixDirty = true;

        this.updateChildren();

        return this;
    }

});

module.exports = PerspectiveCamera;
