/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import {__} from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaPlaceholder,
	BlockIcon,
	BlockControls,
	AlignmentControl
} from '@wordpress/block-editor';

import {useState} from 'react';
import {Fragment} from '@wordpress/element'

// Components
import {TextControl, ColorPalette, PanelBody, Card, CardBody, Button} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, className, setAttributes}) {

	const blockProps = useBlockProps;

	const [color, setColor] = useState('#f00')
	const colors = [
		{name: 'red', color: '#f00'},
		{name: 'white', color: '#fff'},
		{name: 'blue', color: '#00f'},
	];

	const hasImages = attributes.images !== undefined;

	// const onChangeContent = ( newContent ) => {
	// 	setAttributes( { content: newContent } )
	// }
	const onChangeAlign = ( newAlign ) => {
		setAttributes( {
			align: newAlign === undefined ? 'none' : newAlign,
		} )
	}

	return (
		<div {...blockProps }>
			{hasImages && (
				<MediaUpload
					allowedTypes={['image']}
					multiple={false}
					value={attributes.images ? attributes.images.id : ''}
					onSelect={(newImages) => setAttributes({images: newImages})}
					render={({open}) => (
						<div className="mpt-team-image">
							{attributes.images.url && (
								<figure>
									<img src={attributes.images.url} alt={attributes.images.alt}/>
								</figure>
							)}
							<div>
								<Button onClick={() => setAttributes({images: ''})} className="button">Remove</Button>
								<Button onClick={open} className="button">Replace</Button>
							</div>
						</div>
					)}
				/>
			)}
			{!hasImages && (
				<MediaPlaceholder
					icon={<BlockIcon icon="format-gallery"/>}
					labels={{
						title: "Placeholder Title",
						instructions: "Add a most excellent image.",
					}}
					onSelect={(newImages) => setAttributes({images: newImages})}
				/>
			)}

			<div className="mpt-team-info">
				<BlockControls>
					<AlignmentControl
						value={ attributes.align }
						onChange={ onChangeAlign }
					/>
				</BlockControls>
				<RichText
					tagName="h3"
					value={attributes.name}
					allowedFormats={['core/bold', 'core/italic']}
					onChange={(name) => setAttributes({name: name})}
					placeholder={__('Name...')}
					className="mpt-team-name"
					style={ { textAlign: attributes.align } }
				/>
				<RichText
					tagName="span"
					value={attributes.designation}
					allowedFormats={['core/bold', 'core/italic']}
					onChange={(designation) => setAttributes({designation: designation})}
					placeholder={__('Designation...')}
					style={ { textAlign: attributes.align } }
				/>
			</div>

		</div>
	);
}
