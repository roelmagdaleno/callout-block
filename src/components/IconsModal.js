import { heroicons } from "../icons";
import { __ } from "@wordpress/i18n";
import {
	__experimentalGrid as Grid, Button,
	Flex,
	FlexBlock,
	FlexItem,
	Modal,
	SearchControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

import Icon from "../Icon";

import {
	useState,
} from '@wordpress/element';

const gridIcons = ( icons, iconType, props ) => {
	const {
		setOpen,
		setAttributes,
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
						title={ icon.name }
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
		isOpen,
		setOpen,
		attributes,
		setAttributes,
	} = props;

	if ( ! isOpen ) {
		return null;
	}

	const [ iconType, setIconType ] = useState( 'outline' );
	const [ searchInput, setSearchInput ] = useState( '' );

	let icons = heroicons;

	if ( searchInput ) {
		icons = icons.filter( ( icon ) => icon.name.includes( searchInput.toLowerCase() ) );
	}

	return (
		<Modal
			title={ __( 'Callout Icon', 'callout-box' ) }
			onRequestClose={ () => setOpen( false ) }
			isFullScreen={ true }
		>
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
							<ToggleGroupControlOption value="outline" label="Outline" />
							<ToggleGroupControlOption value="solid" label="Solid" />
						</ToggleGroupControl>
					</div>
				</FlexItem>
				<FlexBlock style={{ overflowY: "scroll" }}>
					{ gridIcons( icons, iconType, props ) }
				</FlexBlock>
			</Flex>
		</Modal>
	);
}
