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
export default function save( { attributes, className } ) {
	const blockProps = useBlockProps.save();

	return (
		<figure { ...blockProps }>

			<div class="mpt-team-image">
				<img src={attributes.images.url} alt={attributes.images.alt} />
			</div>

			<div { ...blockProps }>
				<RichText.Content
					tagName="h3"
					value={ attributes.name }
					className="mpt-team-name"
				/>

				<RichText.Content
					tagName="span"
					value={ attributes.designation }
					className="mpt-team-designation"
				/>
			</div>
		</figure>
	);
}
