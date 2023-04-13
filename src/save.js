import classnames from 'classnames';
import Heroicon from './components/Heroicon';
import { Icon } from '@wordpress/components';
import parseIcon from './utils/parser-icon';
import {
	__experimentalGetGapCSSValue as getGapCSSValue,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const {
		customIcon,
		icon,
		iconColorValue,
		iconGap,
		iconType,
		iconWidth,
		usingCustomSVG,
	} = attributes;

	const isIconSelected = icon !== '' || customIcon !== '';

	const iconGapStyles =
		isIconSelected && iconGap !== '0' ? { gap: iconGap } : {};

	// Get the `gap` value from "Dimensions > Block Spacing"
	const gapValue = getGapCSSValue( attributes.style?.spacing?.blockGap );

	const iconStyles = isIconSelected
		? { width: `${ iconWidth }px`, height: `${ iconWidth }px` }
		: {};

	if ( iconColorValue ) {
		iconStyles.color = iconColorValue;
	}

	let iconToBeRender = '';

	if ( isIconSelected ) {
		/**
		 * We can't call the `SVG` component here, so let's call `parseIcon`,
		 * so can return a `JSX.Element`.
		 *
		 * I don't know why `SVG` component doesn't work in `save`
		 * but it does in `edit`.
		 *
		 * @type {*|JSX.Element}
		 *
		 * @since 1.0.0
		 */
		iconToBeRender = usingCustomSVG ? (
			parseIcon( customIcon )
		) : (
			<Heroicon
				component={ icon }
				type={ iconType }
				width={ iconWidth }
				height={ iconWidth }
			/>
		);
	}

	const iconClasses = classnames( 'wp-callout-box-icon__container', {
		'using-from-library': icon !== '',
		'using-custom-svg': usingCustomSVG,
	} );

	const innerBlocksProps = useInnerBlocksProps.save(
		useBlockProps.save( { style: iconGapStyles } )
	);

	return (
		<div { ...innerBlocksProps }>
			{ isIconSelected && (
				<div className={ iconClasses } style={ iconStyles }>
					<Icon icon={ iconToBeRender } size={ iconWidth } />
				</div>
			) }
			<div style={ { gap: gapValue } }>
				{ innerBlocksProps.children }
			</div>
		</div>
	);
}
