import * as SolidIcons from '@heroicons/react/24/solid';
import * as OutlineIcons from '@heroicons/react/24/outline';
import upperCamelCase from 'uppercamelcase';

export default function Icon( props ) {
    const methods = {
        solid: SolidIcons,
        outline: OutlineIcons
    };

	const icon = props.icon;
	const iconName = icon.component ? icon.component : upperCamelCase( icon.name );
    const Component = `${ iconName }Icon`;
    const Icon = methods[ props.method ][ Component ];

    return (
        <Icon
			className="wp-callout-box-icon"
			width={ props.width || 30 }
			height={ props.height || 30 }
		/>
    );
}
