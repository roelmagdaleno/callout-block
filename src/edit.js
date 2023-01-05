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
	Button,
	Modal,
	PanelBody,
	PanelRow,
	SearchControl,
	Flex,
	FlexItem,
	FlexBlock,
	__experimentalGrid as Grid,
	MenuGroup,
	MenuItem,
} from '@wordpress/components';

import { heroicons } from "./icons";

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
	} = attributes;

	const [ isOpen, setOpen ] = useState( false );

	const inspectorControls = (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Icon', 'callout-box' ) } initialOpen={ true }>
					<p>{ __( 'Icons powered by', 'callout-box' ) } <a href="https://heroicons.com" target="_blank">heroicons</a>.</p>

					<PanelRow className={ `callout-box-icon__panel-row` }>
						<Button
							variant="secondary"
							onClick={ () => setOpen( true ) }
						>
							Select Icon
						</Button>
						<IconsModal
							isOpen={ isOpen }
							setOpen={ setOpen }
						/>
						{ icon && (
							<Button variant="secondary">
								Select Icon
							</Button>
						) }
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</>
	);

	return (
		<Fragment>
			{ inspectorControls }
			<div { ...useBlockProps() }>
				{ <BlockControls /> }
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
