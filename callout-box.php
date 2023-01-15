<?php

/**
 * Plugin Name:       Callout Box
 * Description:       Add a styled box for featured content in the WordPress block editor.
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Version:           1.0.0
 * Author:            Roel Magdaleno
 * Author UI:         https://roelmagdaleno.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       callout-box
 *
 * @package           Callout Box
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_callout_box_block_init() {
	register_block_type( __DIR__ . '/build' );
}

add_action( 'init', 'create_callout_box_block_init' );
