import { registerBlockType } from '@wordpress/blocks';
import { postList as icon } from '@wordpress/icons';
import './style.scss';
import Edit from './edit';
import Save from './save';
import { __ } from '@wordpress/i18n';

registerBlockType( 'roelmagdaleno/callout-box', {
	icon,
	example: {
		attributes: {
			icon: 'FaceSmileIcon',
			iconType: 'solid',
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'callout-block' ),
				}
			}
		]
	},
	edit: Edit,
	save: Save,
} );
