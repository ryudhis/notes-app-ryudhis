const truncateText = (htmlContent: string, maxLength: number): string => {
  const plainText = htmlContent.replace(/<[^>]*>/g, "");
  if (plainText.length > maxLength) {
    let truncationPoint = maxLength;
    while (
      truncationPoint < htmlContent.length &&
      htmlContent[truncationPoint] !== ">" &&
      htmlContent[truncationPoint] !== "<"
    ) {
      truncationPoint++;
    }

    let truncatedHTML = htmlContent.substring(0, truncationPoint) + "...";

    const openTags = [];
    const tagPattern = /<\/?([a-zA-Z0-9]+)[^>]*>/g;
    let match;

    while ((match = tagPattern.exec(truncatedHTML)) !== null) {
      if (match[0].startsWith("</")) {
        openTags.pop();
      } else if (!match[0].endsWith("/>")) {
        openTags.push(match[1]);
      }
    }

    for (let i = openTags.length - 1; i >= 0; i--) {
      truncatedHTML += `</${openTags[i]}>`;
    }

    return truncatedHTML;
  }

  return htmlContent;
};

export default truncateText;
