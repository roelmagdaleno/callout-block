import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import Save from './save';

registerBlockType( 'roelmagdaleno/callout-box', {
	edit: Edit,
	save: Save,
} );
