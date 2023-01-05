import * as SolidIcons from '@heroicons/react/24/solid';
import * as OutlineIcons from '@heroicons/react/24/outline';

export default function Icon( props ) {
    const methods = {
        solid: SolidIcons,
        outline: OutlineIcons
    };

    const Icon = methods[ props.method ][ props.component ];

	if ( ! Icon ) {
		return null;
	}

    return (
        <Icon
			className="wp-callout-box-icon"
			width={ props.width || 30 }
			height={ props.height || 30 }
		/>
    );
}
