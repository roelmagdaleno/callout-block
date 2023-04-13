=== Callout ===
Contributors:      rokumetal
Tags:              callout, callout box, featured box, styled box, block
Requires at least: 6.2
Tested up to:      6.2
Requires PHP:      7.4
Stable tag:        1.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A styled box for featured content.

== Description ==

The Callout Block plugin registers a WordPress block that allows you to add a styled box for featured content to your WordPress block editor.

=== Key Features ===

* Includes 200+ icons powered by [Heroicons](https://heroicons.com)
* Use custom icons (loaded from SVG string or link)
* Design your callout block using inner blocks
* Transform your callout block to a reusable block
* Compatible with the Site Editor

=== Development ===

* [View on GitHub](https://github.com/roelmagdaleno/callout-block)

== Installation ==

This section describes how to install the plugin and get it working.

1. Upload the plugin files to the `/wp-content/plugins/callout-block` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the "Plugins" screen in WordPress.
3. Inside the Block Editor, search the "Callout" block and insert it.

== Frequently Asked Questions ==

= Can I use custom icons? =

Yes. Open the modal with the icons, go to the "Custom SVG" tab and insert your SVG string or a link (the extension must end with `.svg`). After that, click on "Insert" button and the icon will be inserted and can be styled.

= Can be this block reusable? =

Yes. Transform your callout box to a reusable block as usual. Then, if you want to use it later in a post or page, insert it from the reusable blocks section.

If you want to edit the content for the reusable block, you have to transform your block to a regular block. If you don't do that, the callout box will be updated across your website (unless if that's what you want it).

== Screenshots ==

1. Callout with an icon from the library.
2. Callout with a custom icon (The icon was inserted from a link).
3. Callout with more styling. The icon is bigger, the block has a border radius and a left border. The paragraph and button were moved by modifying their custom attributes.
4. Icon Library.
5. Custom SVG (SVG string and preview). You can insert SVG string or from a link.

== Changelog ==

= 1.1.0 =

This version is only compatible with WP 6.2 or higher. If you are using WP 6.1, please use the previous version.

Also, attempt to recovery the block if it's broken after update.

* FIX: Flex property missing after update WP 6.2 (#5)

= 1.0.0 =

* Initial release


