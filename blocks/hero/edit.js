/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __, _x } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';
import { RangeControl } from '@wordpress/components';
const { MediaUpload, MediaUploadCheck, useInnerBlocksProps, useBlockProps } = wp.blockEditor;
const { PanelBody, Button, ResponsiveWrapper } = wp.components;
const { Fragment } = wp.element;
const { withSelect } = wp.data;

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const template = [
	[
		'core/paragraph',
		{
			placeholder: _x( 'Content…', 'content placeholder' ),
		},
	],
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
const Edit = (props) => {
	const { attributes, setAttributes } = props;

	const onSelectMedia = (media) => {
		setAttributes({
			mediaId: media.id,
			mediaUrl: media.url
		});
	}
	const removeMedia = () => {
		setAttributes({
			mediaId: 0,
			mediaUrl: ''
		});
	}

	const onSetMinHeight = (value) => {
		setAttributes({
			minHeight: value,
		})
	}

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'hero__content' },
		{ template: template, allowedBlocks: ['core/paragraph'], templateLock: 'all' }
	);

	const blockStyle = {
		backgroundImage: attributes.mediaUrl != 0 ? 'url("' + attributes.mediaUrl + '")' : 'none',
		minHeight: attributes.minHeight + 'px',
	};

	const blockProps = useBlockProps({
		className: 'hero',
		style: blockStyle,
	});


	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={__('Select block background image', 'awp')}
					initialOpen={ true }
				>
					<div className="editor-post-featured-image">
						<div className="editor-post-featured-image">
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={ ['image'] }
									onSelect={onSelectMedia}
									value={attributes.mediaId}
									render={({open}) => (
										<Button
											className={attributes.mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
											onClick={open}
										>
											{attributes.mediaId == 0 && __('Choose an image', 'awp')}
											{props.media != undefined &&
												<ResponsiveWrapper
													naturalWidth={ props.media.media_details.width }
													naturalHeight={ props.media.media_details.height }
												>
													<img src={props.media.source_url} />
												</ResponsiveWrapper>
											}
										</Button>
									)}
								/>
							</MediaUploadCheck>
							{attributes.mediaId != 0 &&
								<MediaUploadCheck>
									<MediaUpload
										title={__('Replace image', 'awp')}
										value={attributes.mediaId}
										onSelect={onSelectMedia}
										allowedTypes={['image']}
										render={({open}) => (
											<Button onClick={open} isDefault isLarge>{__('Replace image', 'awp')}</Button>
										)}
									/>
								</MediaUploadCheck>
							}
							{attributes.mediaId != 0 &&
								<MediaUploadCheck>
									<Button onClick={removeMedia} isLink isDestructive>{__('Remove image', 'awp')}</Button>
								</MediaUploadCheck>
							}
						</div>
					</div>
				</PanelBody>
				<PanelBody
					title={__('Styles', 'awp')}
					initialOpen={ true }
				>
					<RangeControl
						label="Min-height"
						value={attributes.minHeight}
						onChange={(value) => onSetMinHeight(value)}
						min={50}
						max={2000}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div { ...innerBlocksProps } />
			</div>
		</Fragment>
	);
}

export default withSelect((select, props) => {
	return { media: props.attributes.mediaId ? select('core').getMedia(props.attributes.mediaId) : undefined };
})(Edit);