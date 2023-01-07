import {
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import Icon from "./Icon";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {JSX.Element} Element to render.
 */
export default function save( props ) {
	const {
		attributes,
	} = props;

	const {
		icon,
		iconColorValue,
		iconGap,
		iconNextContent,
		iconType,
		iconWidth,
	} = attributes;

	const iconGapStyles = icon && iconGap !== '0' ? {
		gap: iconGap
	} : {};

	const blockProps = useBlockProps.save( {
		className: iconNextContent && 'icon-next-to-content',
		style: iconGapStyles,
	} );

	const iconStyles = icon ? {
		width: `${ iconWidth }px`,
		height: `${ iconWidth }px`,
	} : {};

	if ( iconColorValue ) {
		iconStyles.color = iconColorValue;
	}

	return (
		<div { ...blockProps }>
			{
				icon && (
					<div
						className="wp-callout-box-icon__container"
						style={ iconStyles }
					>
						<Icon
							component={ icon }
							method={ iconType }
							width={ iconWidth }
							height={ iconWidth }
						/>
					</div>
				)
			}
			<InnerBlocks.Content />
		</div>
	);
}
