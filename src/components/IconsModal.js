import { heroicons } from "../icons";
import { __ } from "@wordpress/i18n";
import {
	__experimentalGrid as Grid, Button,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	Flex,
	FlexBlock,
	FlexItem,
	Modal,
	SearchControl,
	TabPanel,
	TextareaControl,
	Icon as RawSVG,
} from "@wordpress/components";

import Icon from "../Icon";

import {
	useState,
} from '@wordpress/element';

import parser from 'html-react-parser';

const gridIcons = ( icons, iconType, props ) => {
	const {
		attributes,
		setAttributes,
		setOpen,
	} = props;

	return (
		<Grid
			columns={ 8 }
			gap={ 6 }
		>
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
							<Icon component={ icon.component } method={ iconType } />
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
	const {
		attributes,
		isOpen,
		setOpen,
	} = props;

	if ( ! isOpen ) {
		return null;
	}

	const [ iconType, setIconType ] = useState( attributes.iconType );
	const [ searchInput, setSearchInput ] = useState( '' );

	let icons = heroicons;

	if ( searchInput ) {
		icons = icons.filter( ( icon ) => icon.name.includes( searchInput.toLowerCase() ) );
	}

	const libraryTab = (
		<Flex style={{ height: "100%", alignItems: "unset" }}>
			<FlexItem style={{ width: "200px" }}>
				<SearchControl
					value={ searchInput }
					onChange={ setSearchInput }
				/>
				<div style={{ marginTop: "1rem" }}>
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
						<ToggleGroupControlOption
							value="solid"
							label="Solid"
						/>
					</ToggleGroupControl>
				</div>
				<div style={{ marginTop: "1rem" }}>
					<p>{ __( 'Icons powered by', 'callout-box' ) } <a href="https://heroicons.com" target="_blank">Heroicons</a>.</p>
				</div>
			</FlexItem>
			<FlexBlock style={{ overflowY: "scroll" }}>
				{ gridIcons( icons, iconType, props ) }
			</FlexBlock>
		</Flex>
	);

	const [ customIcon, setCustomIcon ] = useState( '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50" height="50"><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>' );

	const customSVGTab = (
		<>
			<TextareaControl
				label={ __( 'Custom Icon', 'callout-box' ) }
				hideLabelFromVision={ true }
				placeholder={ __( 'Insert your SVG content here', 'callout-box' ) }
				value={ customIcon }
				onChange={ setCustomIcon }
			/>
			<div>
				<RawSVG icon={ parser( customIcon ) } size={ 150 } />
			</div>
			<Button variant="primary">Insert</Button>
		</>
	);

	return (
		<Modal
			title={ __( 'Callout Icon', 'callout-box' ) }
			className="wp-callout-box-modal"
			onRequestClose={ () => setOpen( false ) }
			isFullScreen={ true }
		>
			<TabPanel
				className="wp-callout-box-tab-panel"
				activeClass="active-tab"
				tabs={ [
					{
						name: 'library',
						title: 'Library'
					},
					{
						name: 'custom-svg',
						title: 'Custom SVG'
					}
				] }
			>
				{
					( tab ) => {
						return tab.name === 'library' ? libraryTab : customSVGTab
					}
				}
			</TabPanel>
		</Modal>
	);
}
