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
} from '@wordpress/components';

import { heroicons } from "./icons";

import Icon from "./Icon";

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
		setAttributes,
	} = props;

	const {
		content,
		icon,
	} = attributes;

	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	const gridIcons = (
		<Grid
			columns={ 8 }
			gap={ 6 }
		>
			{ heroicons.map( ( icon ) => {
				return (
					<Button
						key={ `icon-${ icon.name }` }
						variant="tertiary"
						className={ `wp-callout-box-icon-button` }
						label={ icon.name }
						title={ icon.name }
					>
						<span className="wp-callout-box-icon">
							<Icon icon={ icon } method="outline" />
						</span>
						<span className="wp-callout-box-icon-name">
							{ icon.name }
						</span>
					</Button>
				);
			} ) }
		</Grid>
	);

	const inspectorControls = (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Icon', 'callout-box' ) } initialOpen={ true }>
					<p>{ __( 'Icons powered by', 'callout-box' ) } <a href="https://heroicons.com" target="_blank">heroicons</a>.</p>

					<PanelRow className={ `callout-box-icon__panel-row` }>
						<Button
							variant="secondary"
							onClick={ openModal }
						>
							Select Icon
						</Button>
						{ isOpen && (
							<Modal
								title={ __( 'Callout Icon', 'callout-box' ) }
								onRequestClose={ closeModal }
								isFullScreen={ true }
							>
								<Flex style={{ height: "100%", alignItems: "unset" }}>
									<FlexItem>
										<SearchControl />
									</FlexItem>
									<FlexBlock style={{ padding: "1rem", overflowY: "scroll" }}>
										{ gridIcons }
									</FlexBlock>
								</Flex>
							</Modal>
						) }
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
