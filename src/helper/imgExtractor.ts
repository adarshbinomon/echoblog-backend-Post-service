export const imgExtractor = (
  htmlString: string 
): string | undefined => {
  if (!htmlString) console.log("no img tag");
  const imgSrcRegex = /<img.*?src="(.*?)".*?>/;

  const match = imgSrcRegex.exec(htmlString);

  if (match && match.length > 1) {
    return match[1];
  } else {
    console.log("no img tag");
  }
};
