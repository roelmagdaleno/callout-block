/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalUseGradient as useGradient,
	BlockControls,
	ContrastChecker,
	InspectorControls,
	RichText,
	useBlockProps,
	withColors,
} from '@wordpress/block-editor';

import {
	Fragment,
} from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {JSX.Element} Element to render.
 */
export function Edit( props ) {
	const {
		attributes,
		backgroundColor,
		iconColor,
		setAttributes,
		setBackgroundColor,
		setIconColor,
		setTextColor,
		textColor,
	} = props;

	const {
		backgroundColorValue,
		content,
		iconColorValue,
		textColorValue,
	} = attributes;

	const colors = [
		{
			colorValue: textColor.color || textColorValue,
			onColorChange: ( colorValue ) => {
				setTextColor( colorValue );
				setAttributes( { textColorValue: colorValue } );
			},
			label: __( 'Text color', 'callout-box' )
		},
		{
			colorValue: iconColor.color || iconColorValue,
			onColorChange: ( colorValue ) => {
				setIconColor( colorValue );
				setAttributes( { iconColorValue: colorValue } );
			},
			label: __( 'Icon color', 'callout-box' )
		},
		{
			colorValue: backgroundColor.color || backgroundColorValue,
			onColorChange: ( colorValue ) => {
				setBackgroundColor( colorValue );
				setAttributes( { backgroundColorValue: colorValue } )
			},
			label: __( 'Background color', 'callout-box' )
		},
	];

	const inspectorControls = (
		<>
			<InspectorControls>
				<div>
					<PanelColorGradientSettings
						title={ __( 'Color', 'callout-box' ) }
						initialOpen={ true }
						enableAlpha={ true }
						settings={ colors }
						__experimentalHasMultipleOrigins={ true }
					>
						<ContrastChecker
							{ ...{
								textColor: textColorValue,
								backgroundColor: backgroundColorValue
							} }
							isLargeText={ false }
						/>
					</PanelColorGradientSettings>
				</div>
			</InspectorControls>
		</>
	);

	return (
		<Fragment>
			{ inspectorControls }
			<div { ...useBlockProps() }>
				{
					<BlockControls />
				}
				<RichText
					onChange={ ( content ) => setAttributes( { content } ) }
					placeholder="Type your content"
					tagName="p"
					value={ content }
				/>
			</div>
		</Fragment>
	);
}

const colorAttributes = {
	textColor: 'text-color',
	iconColor: 'icon-color',
	backgroundColor: 'background-color',
};

export default withColors( colorAttributes )( Edit );
