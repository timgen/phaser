/**
 * [description]
 *
 * @function Phaser.Actions.SetTint
 * @since 3.0.0
 * 
 * @param {array} items - An array of Game Objects. The contents of this array are updated by this Action.
 * @param {number} topLeft - [description]
 * @param {number} [topRight] - [description]
 * @param {number} [bottomLeft] - [description]
 * @param {number} [bottomRight] - [description]
 *
 * @return {array} The array of Game Objects that was passed to this Action.
 */
var SetTint = function (items, topLeft, topRight, bottomLeft, bottomRight)
{
    for (var i = 0; i < items.length; i++)
    {
        items[i].setTint(topLeft, topRight, bottomLeft, bottomRight);
    }

    return items;
};

module.exports = SetTint;
