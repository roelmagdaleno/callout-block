import { heroicons } from '../icons';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import SVG from 'react-inlinesvg';
import Heroicon from './Heroicon';
import {
	__experimentalGrid as Grid,
	Button,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	Flex,
	FlexBlock,
	FlexItem,
	Icon,
	Modal,
	Notice,
	SearchControl,
	TabPanel,
	TextareaControl,
} from '@wordpress/components';

const gridIcons = ( icons, iconType, props ) => {
	const { attributes, setAttributes, setOpen } = props;

	return (
		<Grid columns={ 8 } gap={ 6 } style={ { height: '500px' } }>
			{ icons.map( ( icon ) => {
				return (
					<Button
						key={ `icon-${ icon.name }` }
						variant="tertiary"
						className={ `wp-callout-box-icon-button` }
						label={ icon.name }
						showTooltip={ true }
						isPressed={ attributes.icon === icon.component }
						onClick={ () => {
							setAttributes( { icon: icon.component, iconType } );
							setOpen( false );
						} }
					>
						<span className={ `wp-callout-box-icon ${ iconType }` }>
							<Icon
								icon={ () => (
									<Heroicon
										component={ icon.component }
										type={ iconType }
									/>
								) }
								size={ 30 }
							/>
						</span>
						<span className="wp-callout-box-icon-name">
							{ icon.name }
						</span>
					</Button>
				);
			} ) }
		</Grid>
	);
};

export default function IconsModal( props ) {
	const { attributes, isOpen, setAttributes, setOpen } = props;

	if ( ! isOpen ) {
		return null;
	}

	const [ iconType, setIconType ] = useState( attributes.iconType );
	const [ searchInput, setSearchInput ] = useState( '' );
	const [ customSVG, setCustomSVG ] = useState( attributes.customIcon || '' );
	const [ isCustomSVGValid, setIsCustomSVGValid ] = useState(
		customSVG.trim() !== ''
	);

	let icons = heroicons;

	if ( searchInput ) {
		icons = icons.filter( ( icon ) =>
			icon.name.includes( searchInput.toLowerCase() )
		);
	}

	const libraryTab = (
		<Flex style={ { height: '100%', alignItems: 'unset' } }>
			<FlexItem style={ { width: '200px' } }>
				<SearchControl
					value={ searchInput }
					onChange={ setSearchInput }
				/>
				<div style={ { marginTop: '1rem' } }>
					<ToggleGroupControl
						label="Type"
						value={ iconType }
						isBlock
						onChange={ ( iconType ) => setIconType( iconType ) }
					>
						<ToggleGroupControlOption
							value="outline"
							label="Outline"
						/>
						<ToggleGroupControlOption value="solid" label="Solid" />
					</ToggleGroupControl>
				</div>
				<div style={ { marginTop: '1rem' } }>
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
				</div>
			</FlexItem>
			<FlexBlock style={ { overflowY: 'scroll' } }>
				{ gridIcons( icons, iconType, props ) }
			</FlexBlock>
		</Flex>
	);

	const customSVGTab = (
		<Flex style={ { height: '100%', alignItems: 'unset', gap: '30px' } }>
			<FlexBlock className="wp-callout-box__custom-icon-textarea-wrapper">
				<TextareaControl
					label={ __( 'Custom Icon', 'callout-block' ) }
					hideLabelFromVision={ true }
					placeholder={ __(
						'Insert the SVG from a string or link',
						'callout-block'
					) }
					value={ customSVG }
					onChange={ setCustomSVG }
					rows={ 30 }
				/>
			</FlexBlock>
			<FlexItem style={ { flex: '0.5' } }>
				<div className="wp-callout-box__custom-icon-box">
					<SVG
						src={ customSVG }
						width={ 150 }
						height={ 150 }
						onError={ () => setIsCustomSVGValid( false ) }
						onLoad={ () => setIsCustomSVGValid( true ) }
						preProcessor={ ( code ) => {
							// It will use size from the block
							code = code.replace( /width=".*?"/g, '' );
							code = code.replace( /height=".*?"/g, '' );

							setCustomSVG( code );

							return code;
						} }
					/>
				</div>
				<div className="wp-callout-box__custom-icon-actions">
					<Button
						variant="primary"
						disabled={ ! isCustomSVGValid }
						onClick={ () => {
							setOpen( false );
							setAttributes( {
								icon: '', // Empty, so we can use custom icon.
								customIcon: customSVG.trim(),
								usingCustomSVG: true,
							} );
						} }
					>
						Insert
					</Button>
					<Button
						variant="link"
						disabled={ ! isCustomSVGValid }
						onClick={ () => {
							setCustomSVG( '' );
							setIsCustomSVGValid( false );
						} }
					>
						Clear
					</Button>
				</div>
				{ customSVG !== '' && ! isCustomSVGValid && (
					<Notice
						status="error"
						isDismissible={ false }
						className="wp-callout-box__custom-icon-notice"
					>
						{ __( 'The inserted SVG is invalid.', 'callout-block' ) }
					</Notice>
				) }
			</FlexItem>
		</Flex>
	);

	return (
		<Modal
			title={ __( 'Callout Icon', 'callout-block' ) }
			className="wp-callout-box-modal"
			onRequestClose={ () => setOpen( false ) }
			isFullScreen={ true }
		>
			<TabPanel
				className="wp-callout-box-tab-panel"
				activeClass="active-tab"
				initialTabName={
					attributes.usingCustomSVG ? 'custom-svg' : 'library'
				}
				tabs={ [
					{
						name: 'library',
						title: 'Library',
					},
					{
						name: 'custom-svg',
						title: 'Custom SVG',
					},
				] }
			>
				{ ( tab ) => {
					return tab.name === 'library' ? libraryTab : customSVGTab;
				} }
			</TabPanel>
		</Modal>
	);
}
