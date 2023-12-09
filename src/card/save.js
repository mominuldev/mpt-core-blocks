/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save( { attributes } ) {
	const blockProps = useBlockProps.save();

	const { images, name, designation, nameFontSize, nameColor, desiColor } = attributes;

	const hasImages = images !== undefined;

	return (
		<figure { ...blockProps }>

			{hasImages && (
				<div className="mpt-team-image">
					<img src={images.url} alt={images.alt}/>
				</div>
			)}

			<div { ...blockProps }>
				<RichText.Content
					tagName="h3"
					value={ name }
					className="mpt-team-name"
					style={{color: nameColor, fontSize: nameFontSize}}
				/>

				<RichText.Content
					tagName="span"
					value={ designation }
					className="mpt-team-designation"
					style={{ color: desiColor }}
				/>
			</div>
		</figure>
	);
}
