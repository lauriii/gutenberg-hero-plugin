const { useInnerBlocksProps, useBlockProps } = wp.blockEditor;

export default function save({ attributes }) {
  const blockStyle = {
    backgroundImage: attributes.mediaUrl != 0 ? 'url("' + attributes.mediaUrl + '")' : 'none',
    minHeight: attributes.minHeight + 'px',
  };
  return (
    <div { ...useBlockProps.save({className: 'hero', style: blockStyle}) }>
      <div { ...useInnerBlocksProps.save({className: 'hero__content'}) } />
    </div>
  );
};