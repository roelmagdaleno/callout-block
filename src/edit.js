import { __ } from '@wordpress/i18n';
import Heroicon from './components/Heroicon';
import IconsModal from './components/IconsModal';
import './editor.scss';
import classnames from 'classnames';
import {
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalGetGapCSSValue as getGapCSSValue,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	BlockControls,
	ContrastChecker,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	withColors,
} from '@wordpress/block-editor';

import { useState } from '@wordpress/element';

import {
	__experimentalNumberControl as NumberControl,
	__experimentalUnitControl as UnitControl,
	Button,
	PanelBody,
	PanelRow,
	Icon,
} from '@wordpress/components';

import parseIcon from './utils/parser-icon';

export function Edit( props ) {
	const {
		attributes,
		backgroundColor,
		clientId,
		iconColor,
		setAttributes,
		setIconColor,
	} = props;

	const {
		customIcon,
		icon,
		iconColorValue,
		iconGap,
		iconType,
		iconWidth,
		usingCustomSVG,
	} = attributes;

	const [ isOpen, setOpen ] = useState( false );

	const isIconSelected = icon !== '' || customIcon !== '';

	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	const iconGapStyles =
		isIconSelected && iconGap !== '0' ? { gap: iconGap } : {};

	const iconStyles = isIconSelected
		? { width: `${ iconWidth }px`, height: `${ iconWidth }px` }
		: {};

	if ( iconColor.color || iconColorValue ) {
		iconStyles.color = iconColor.color || iconColorValue;
	}

	const blockProps = useBlockProps( {
		style: iconGapStyles,
	} );

	// Get the `gap` value from "Dimensions > Block Spacing"
	const gapValue = getGapCSSValue( attributes.style?.spacing?.blockGap );

	let iconToBeRender = '';

	if ( isIconSelected ) {
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

	const innerBlocksProps = useInnerBlocksProps( blockProps );

	return (
		<>
			<BlockControls />
			<InspectorControls>
				<PanelBody
					title={ __( 'Icon', 'callout-block' ) }
					initialOpen={ true }
				>
					<p>
						{ __( 'Icons powered by', 'callout-block' ) }{ ' ' }
						<a
							href="https://heroicons.com"
							target="_blank"
							rel="noreferrer"
						>
							Heroicons
						</a>
						.
					</p>

					<PanelRow>
						<div className="wp-callout-box-setting-box">
							<Button
								variant="secondary"
								onClick={ () => setOpen( true ) }
							>
								Select Icon
							</Button>
							<IconsModal
								isOpen={ isOpen }
								setOpen={ setOpen }
								attributes={ attributes }
								setAttributes={ setAttributes }
							/>
							{ isIconSelected && (
								<Button
									variant="link"
									style={ { marginLeft: '10px' } }
									onClick={ () => {
										setAttributes( {
											customIcon: '',
											icon: '',
											usingCustomSVG: false,
										} );
									} }
								>
									Clear
								</Button>
							) }
						</div>
					</PanelRow>

					<PanelRow>
						<div className="wp-callout-box-setting-box">
							<NumberControl
								label={ __( 'Width', 'callout-block' ) }
								value={ iconWidth }
								min={ 0 }
								disabled={ ! isIconSelected }
								onChange={ ( iconWidth ) =>
									setAttributes( {
										iconWidth: parseInt( iconWidth ),
									} )
								}
							/>
						</div>
					</PanelRow>

					<PanelRow>
						<div className="wp-callout-box-setting-box">
							<UnitControl
								label={ __( 'Gap', 'callout-block' ) }
								value={ iconGap }
								disabled={ ! isIconSelected }
								min={ 0 }
								onChange={ ( iconGap ) =>
									setAttributes( { iconGap } )
								}
							/>
						</div>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					__experimentalIsRenderedInSidebar
					settings={ [
						{
							colorValue: iconColor.color || iconColorValue,
							label: __( 'Icon', 'callout-block' ),
							onColorChange: ( colorValue ) => {
								setIconColor( colorValue );
								setAttributes( { iconColorValue: colorValue } );
							},
							isShownByDefault: true,
							resetAllFilter: () => {
								setIconColor( undefined );
								setAttributes( { iconColorValue: undefined } );
							},
						},
					] }
					__experimentalHasMultipleOrigins={ true }
					panelId={ clientId }
					{ ...colorGradientSettings }
				/>
				{ icon && (
					<ContrastChecker
						{ ...{
							textColor: iconColorValue,
							backgroundColor: backgroundColor.color,
						} }
						isLargeText={ false }
					/>
				) }
			</InspectorControls>
			<div { ...innerBlocksProps }>
				{ isIconSelected && (
					<div className={ iconClasses } style={ iconStyles }>
						<Icon icon={ iconToBeRender } size={ iconWidth } />
					</div>
				) }
				<InnerBlocks style={ { gap: gapValue } } />
			</div>
		</>
	);
}

const iconColorAttributes = {
	iconColor: 'icon-color',
	backgroundColor: 'background-color',
};

export default withColors( iconColorAttributes )( Edit );
