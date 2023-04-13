# Callout Block

![Callout Block](https://i.imgur.com/oJWTOBJ.png)

The Callout Block plugin registers a WordPress block that allows you to add a styled box for featured content to your WordPress block editor.

### Key Features

- Includes 200+ icons powered by [Heroicons](https://heroicons.com)
- Use custom icons (loaded from SVG string or link)
- Design your callout block using inner blocks
- Transform your callout block to a reusable block
- Compatible with the Site Editor

## Styling

Style your callout block by using multiple features.

### Border

A callout block have borders (left, top, right, and bottom) and each of them have its own color, size, and radius.

### Colors

Change the color of the next components from the callout block:

- Background
- Link
- Icon
- Text

You can select a custom color using HEX, RGB or HSL or select it from a default list.

The background color supports solid and gradient colors.

### Dimensions

Add a padding and margin to the callout block. The dimensions can be edited globally or by side (left, top, right, and bottom).

Inside the **Dimensions** settings, you'll find a block spacing setting where you can select the gap between your inner blocks.

### Typography

Change the typography of a callout block:

- Appearance
- Decoration
- Font family
- Letter case
- Letter spacing
- Line height

## Layout

Change the layout orientation (horizontal, vertical), justification, and the alignment.

The only thing that might change, when you manipulate the layout, is the icon position. That is due to the inner blocks container is full width.

## Icon

Icons powered by [Heroicons](https://heroicons.com).

Insert an icon, from the library, to the callout block and edit its color, size, and a gap between the icon and the content.

An icon from [Heroicons](https://heroicons.com) can be outlined or solid.

## Custom Icons

If you don't want to use an icon from [Heroicons](https://heroicons.com) you can insert a custom icon by using an SVG string or by inserting a link inside the text box.

Also, you can insert a custom icon as an inner block, for example, install the [Icon Block](https://github.com/ndiego/icon-block/) plugin and customize it.

### String

Inside the text box, insert an SVG string and will render automatically to preview it. After that, insert it into the callout block.

### Link

Inside the text box, insert an SVG that lives inside an external link, for example:

```text
https://upload.wikimedia.org/wikipedia/commons/0/09/Wordpress-Logo.svg
```

The link extension should end with `.svg`, otherwise will throw an error. After that, insert it into the callout block.

## Requirements

- WordPress 6.2+
- PHP 7.4+
