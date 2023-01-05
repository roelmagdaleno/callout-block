import { __ } from '@wordpress/i18n';

import {
	BlockControls,
	InspectorControls,
	RichText,
	useBlockProps,
	withColors,
} from '@wordpress/block-editor';

import {
	Fragment,
	useState,
} from '@wordpress/element';

import {
	__experimentalNumberControl as NumberControl,
	__experimentalUnitControl as UnitControl,
	Button,
	PanelBody,
	PanelRow,
	ToggleControl,
} from '@wordpress/components';

import Icon from "./Icon";

import './editor.scss';
import IconsModal from "./components/IconsModal";

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
		setAttributes,
	} = props;

	const {
		content,
		icon,
		iconType,
		iconWidth,
		iconNextContent,
		iconGap,
	} = attributes;

	const [ isOpen, setOpen ] = useState( false );

	const inspectorControls = (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Icon', 'callout-box' ) } initialOpen={ true }>
					<p>{ __( 'Icons powered by', 'callout-box' ) } <a href="https://heroicons.com" target="_blank">heroicons</a>.</p>

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
							{
								icon && (
									<Button
										variant="link"
										style={{ marginLeft: "10px" }}
										onClick={ () => setAttributes( { icon: '' } ) }
									>
										Clear
									</Button>
								)
							}
						</div>
					</PanelRow>

					<PanelRow>
						<div className="wp-callout-box-setting-box">
							<ToggleControl
								label={ __( 'Next to the content', 'callout-box' ) }
								checked={ iconNextContent }
								disabled={ icon === '' }
								onChange={ ( iconNextContent ) => setAttributes( { iconNextContent } ) }
							/>
						</div>
					</PanelRow>

					<PanelRow>
						<div className="wp-callout-box-setting-box">
							<NumberControl
								label={ __( 'Width', 'callout-box' ) }
								value={ iconWidth }
								min={ 0 }
								disabled={ icon === '' }
								onChange={ ( iconWidth ) => setAttributes( { iconWidth } ) }
							/>
						</div>
					</PanelRow>

					<PanelRow>
						<div className="wp-callout-box-setting-box">
							<UnitControl
								label={ __( 'Gap', 'callout-box' ) }
								value={ iconGap }
								disabled={ icon === '' }
								min={ 0 }
								onChange={ ( iconGap ) => setAttributes( { iconGap } ) }
							/>
						</div>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</>
	);

	const iconGapStyles = icon && iconGap !== '0' ? {
		gap: iconGap
	} : {};

	return (
		<Fragment>
			{ inspectorControls }
			<div
				{ ...useBlockProps( {
					className: iconNextContent && 'icon-next-to-content',
					style: iconGapStyles,
				} ) }
			>
				{ <BlockControls /> }
				{
					icon && (
						<div
							className="wp-callout-box-icon__container"
							style={{ width: `${ iconWidth }px`, height: `${ iconWidth }px` }}
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
	iconColor: 'icon-color',
};

export default withColors( colorAttributes )( Edit );
