/**
 * External dependencies
 */
import classnames from 'classnames';

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
import {useState} from 'react';
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


import {Fragment} from '@wordpress/element'

// Components
import {
	TextControl,
	ColorPalette,
	PanelBody,
	PanelRow,
	PanelHeader,
	FontSizePicker,
	Placeholder,
	Button
} from '@wordpress/components';

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



export default function Edit({attributes, setAttributes}) {

	const blockProps = useBlockProps();

	const {images, name, designation, alignment, nameFontSize, nameColor, desiColor, align} = attributes;

	const fontSizes = [
		{
			name: __('Small'),
			slug: 'small',
			size: 16,
		},
		{
			name: __('Normal'),
			slug: 'normal',
			size: 20,
		},
		{
			name: __('Big'),
			slug: 'big',
			size: 26,
		},
		{
			name: __('Huge'),
			slug: 'huge',
			size: 32,
		},
	];

	const fallbackFontSize = 24;

	// const [TitleColor, setTitleColor] = useState('#000');
	// // const [DesiColor, setDesiColor] = useState('#000');
	const [fontSize, setFontSize] = useState(20);

	const Colors = [
		{name: 'black', color: '#000'},
		{name: 'white', color: '#fff'},
		{name: 'blue', color: '#00f'},
		{name: 'red', color: '#f00'},
	];

	const hasImages = images !== undefined;

	const textAlignment = (textAlign) => {
		setAttributes({alignment: textAlign});
	}

	console.log(alignment);

	return (
		<div {...useBlockProps({
			className: `mpt-team-align-${alignment}`
		})}>


			<InspectorControls>
				<PanelBody title={__('Name Style')} initialOpen={false}>

					<ColorPalette
						colors={Colors}
						value={nameColor}
						onChange={(newColor) => setAttributes( { nameColor: newColor } )}
					/>

					<FontSizePicker
						__nextHasNoMarginBottom
						fontSizes={fontSizes}
						value={nameFontSize}
						fallbackFontSize={fallbackFontSize}
						onChange={(newFontSize) => {
							setAttributes({nameFontSize: newFontSize});
						}}
					/>
				</PanelBody>

				<PanelBody title={__('Designation Style')} initialOpen={false}>
					<ColorPalette
						colors={Colors}
						value={desiColor}
						onChange={(newColor) => setAttributes( { desiColor: newColor } )}
					/>
				</PanelBody>
			</InspectorControls>

			{hasImages && (
				<MediaUpload
					allowedTypes={['image']}
					multiple={false}
					value={images ? images.id : ''}
					onSelect={(newImages) => setAttributes({images: newImages})}
					render={({open}) => (
						<div className="mpt-team-image">
							{images.url && (
								<figure>
									<img src={images.url} alt={images.alt}/>
								</figure>
							)}
							<div>
								<button onClick={() => setAttributes({images: ''})} className="button">Remove</button>
								{images.url && (
									<button onClick={open} className="button">Replace</button>
								)}
								{!images.url && (
									<button onClick={open} className="button">Upload</button>
								)}
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

				<BlockControls title={__('Alignment')}>
					<AlignmentControl
						value={alignment}
						onChange={textAlignment}

					/>
				</BlockControls>

				<RichText
					tagName="h3"
					value={name}
					allowedFormats={['core/bold', 'core/italic']}
					onChange={(name) => setAttributes({name: name})}
					placeholder={__('Name...')}
					className="mpt-team-name"
					style={{color: nameColor, fontSize: fontSize}}
				/>
				<RichText
					tagName="span"
					value={designation}
					allowedFormats={['core/bold', 'core/italic']}
					onChange={(designation) => setAttributes({designation: designation})}
					placeholder={__('Designation...')}
					style={{textAlign: align, color: desiColor}}
				/>
			</div>



		</div>
	);
}
