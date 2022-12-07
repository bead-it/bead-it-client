import cheerio from 'cheerio';

const replaceRefs = (originalHtml, originalDomain, protocol) => {
  const $ = cheerio.load(originalHtml);

  $('link').each((index, element) => {
    if (element.attribs.href?.search('https*://') === 0) {
      return;
    }

    $(element).attr(
      'href',
      `${protocol}://${originalDomain}/${element.attribs.href}`,
    );
  });

  $('script').each((index, element) => {
    if (element.attribs.src?.search('https*://') === 0) {
      return;
    }
    $(element).attr(
      'src',
      `${protocol}://${originalDomain}/${element.attribs.src}`,
    );
  });

  $('a').each((index, element) => {
    if (element.attribs.href?.search('https*://') === 0) {
      return;
    }
    $(element).attr(
      'href',
      `${protocol}://${originalDomain}/${element.attribs.href}`,
    );
  });

  $('img').each((index, element) => {
    if (element.attribs.src?.search('https*://') === 0) return;

    if (element.attribs.src?.startsWith('//')) {
      $(element).attr('src', `${protocol}:${element.attribs.src}`);

      return;
    }

    $(element).attr(
      'src',
      `${protocol}://${originalDomain}/${element.attribs.src}`,
    );
    $(element).removeAttr('srcset');
  });

  return $.html();
};

export default replaceRefs;
