import React from 'react';

interface HighlightedTextProps {
    text: string;
    highlight: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, highlight }) => {
    if (!highlight || !text.toLowerCase().includes(highlight.toLowerCase())) {
        return <span>{text}</span>;
    }

    const startIndex = text.toLowerCase().indexOf(highlight.toLowerCase());
    const beforeHighlight = text.slice(0, startIndex);
    const highlighted = text.slice(startIndex, startIndex + highlight.length);
    const afterHighlight = text.slice(startIndex + highlight.length);

    return (
        <span>
            {beforeHighlight}
            <span className="text-gray-400 font-bold">{highlighted}</span>
            {afterHighlight}
        </span>
    );
};

export default HighlightedText;
